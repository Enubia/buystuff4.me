import { join } from 'path';
import { createServer } from 'http';
import { config } from 'dotenv';
import { GraphQLError, execute, subscribe } from 'graphql';
import { ApolloError, ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import cors = require('cors');
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { logger } from './helper/logger';
import { createSchema } from './graphql/setup';
import { pubsub } from './helper/pubsub';
import { environment, PORT } from './config';
import { Mongoose } from './db/connection';

// load env file
config();

export const boot = async (): Promise<void> => {
  await Mongoose.connect();
  const schema = createSchema();

  const server = new ApolloServer({
    schema,
    formatError: (err: GraphQLError) => {
      if (err.originalError) {
        const { message } = err.originalError;

        const { locations, path } = err;

        logger.error(err.originalError);

        return {
          ...new ApolloError(message),
          message,
          locations,
          path,
        };
      }

      logger.error(err);

      return err;
    },
    formatResponse: (response, { context }: any) => {
      // prevent introspection for prod
      if (process.env.NODE_ENV === 'production') {
        delete response.data.__schema;
        delete response.data.__type;
      }

      logger.info('request.user:', context.user);

      return response;
    },
  });

  await server.start();

  const app = express();

  app.use(
    cors({
      origin: environment[process.env.NODE_ENV || 'development'].origin,
      optionsSuccessStatus: 200,
    }),
  );

  app.use('/graphiql', (_req, res) => {
    res.sendFile(join(__dirname, '../resources/graphiql.html'));
  });

  app.use(
    (
      error: Error,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      res.send({
        errors: [new ApolloError(error.message)],
      });
    },
  );

  server.applyMiddleware({ app });

  const httpServer = createServer(app);

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: (connectionParams: any, _webSocket: any, context: any) => {
        const { user } = connectionParams as any;
        if (user) {
          const userRoles = user.roles;
          return {
            ...context,
            // revisit pubsub since it's not recommended for production
            // maybe Redis or RabbitMQ?
            // https://www.apollographql.com/docs/apollo-server/data/subscriptions/#production-pubsub-libraries
            pubsub,
            userRoles,
          };
        }
        return {
          ...context,
          pubsub,
        };
      },
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    },
  );

  // Shut down in the case of interrupt and termination signals
  // We expect to handle this more cleanly in the future. See (#5074)[https://github.com/apollographql/apollo-server/issues/5074] for reference.
  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => subscriptionServer.close());
  });

  httpServer.listen(PORT, () => {
    logger.info(`Listening on port ${PORT} ... 🚀`);
    logger.info(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`,
    );
    logger.info(
      `Subscriptions ready at ws://localhost:${PORT}${server.graphqlPath}`,
    );
    logger.info(`GraphiQL ready at http://localhost:${PORT}/graphiql`);
  });
};

(async () => {
  await boot();
})();
