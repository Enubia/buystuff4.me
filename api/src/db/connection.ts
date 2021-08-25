import * as mongoose from 'mongoose';
import { environment } from '../config';
import { logger } from '../helper/logger';

async function connect(): Promise<void> {
  const options: mongoose.ConnectOptions & {
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

  await mongoose.connect(
    environment[process.env.NODE_ENV || 'development'],
    options,
  );

  mongoose.connection.once('open', () => {
    logger.info('Mongoose connected');
  });
}

async function disconnect(): Promise<void> {
  await mongoose.disconnect();
}

export const Mongoose = { connect, disconnect };
