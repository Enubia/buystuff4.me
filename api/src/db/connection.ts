import {
  connect,
  connection,
  disconnect,
  ConnectOptions,
  Connection,
} from 'mongoose';
import { environment } from '../config';
import { logger } from '../helper/logger';

async function createConnection(): Promise<Connection> {
  const options: ConnectOptions = {};

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
