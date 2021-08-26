import { connect, connection, disconnect, ConnectOptions } from 'mongoose';
import { environment } from '../config';
import { logger } from '../helper/logger';

async function createConnection(): Promise<typeof connection> {
  const options: ConnectOptions & {
    useNewUrlParser: boolean;
    useFindAndModify: boolean;
    useCreateIndex: boolean;
    useUnifiedTopology: boolean;
  } = {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await connect(
    environment[process.env.NODE_ENV || 'development'].dbString,
    options,
  );

  logger.info(`Mongo connected on ${connection.name}`);
  logger.info(`Loaded ${connection.modelNames().length} models`);

  return connection;
}

async function disconnectMongo(): Promise<void> {
  await disconnect();
}

export const Mongoose = {
  connect: createConnection,
  disconnect: disconnectMongo,
};
