import { config } from 'dotenv';
import { Mongoose } from './db/connection';
import { logger } from './helper/logger';

const boot = async (): Promise<void> => {
  config();
  Mongoose.connect();
  Mongoose.disconnect();
};

process.on('unhandledRejection', (error) => logger.error(error));

boot().catch((err) => {
  logger.error(err);
  process.exit(0);
});
