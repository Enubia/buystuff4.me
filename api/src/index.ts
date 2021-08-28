import { createServer } from 'http';
import { config } from 'dotenv';
import { GraphQLError, execute, subscribe } from 'graphql';
import { ApolloError, ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import cors = require('cors');
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { logger } from './helper/logger';
import { schema } from './graphql/setup';
import { pubsub } from './helper/pubsub';
import { environment, PORT } from './config';
import { Mongoose } from './db/connection';
import { Context } from './types/context';
import { WishList } from './db/models/wishlist';
import { Category } from './db/models/category';
import { User } from './db/models/user';

// load env file
config();

export const boot = async (): Promise<void> => {
  await Mongoose.connect();
  const server = new ApolloServer({
    schema,
    context: {
      mongo: { User, WishList, Category },
    },
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
    formatResponse: (response) => {
      // prevent introspection for prod
      if (process.env.NODE_ENV === 'production') {
        delete response.data.__schema;
        delete response.data.__type;
      }

      return response;
    },
  });

  await server.start();

  const app = express();

  app.use(
    cors({
      origin(origin, callback) {
        if (
          environment[process.env.NODE_ENV || 'development'].origin.includes(
            origin,
          )
        ) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      optionsSuccessStatus: 200,
    }),
  );

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
      onConnect: (connectionParams, _webSocket, context: Context) => {
        return {
          ...context,
          // revisit pubsub since it's not recommended for production
          // maybe Redis or RabbitMQ?
          // https://www.apollographql.com/docs/apollo-server/data/subscriptions/#production-pubsub-libraries
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
    if (process.env.NODE_ENV !== 'production') {
      logger.info(
        'Navigate to https://studio.apollographql.com/sandbox/schema/reference to use the introspection stuff',
      );
    }
  });
};

process.on('unhandledRejection', (reason) => logger.error(reason));

(async () => {
  await boot();
})();
