import { Connection } from 'mongoose';

export interface Context {
  mongoose: Connection;
}
