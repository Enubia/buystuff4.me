import { Connection } from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLRequestContext } from 'apollo-server-types';

export interface Context extends GraphQLRequestContext {
  mongoose: Connection;
}
