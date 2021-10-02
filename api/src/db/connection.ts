import {
  connect,
  connection,
  disconnect,
  ConnectOptions,
  Connection,
} from 'mongoose';
import { logger } from '../helper/logger';

async function createConnection(): Promise<Connection> {
  const options: ConnectOptions = {};

  let dbString = '';
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'production') {
    dbString = process.env.MONGO_URL;
  } else if (NODE_ENV === 'testing') {
    dbString = process.env.MONGO_URL_TESTING;
  } else {
    dbString = process.env.MONGO_URL_LOCAL;
  }

  await connect(dbString, options);

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
