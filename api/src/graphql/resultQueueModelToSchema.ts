import {
  composeMongoose,
  ObjectTypeComposerWithMongooseResolvers,
} from 'graphql-compose-mongoose';
import { IResultQueue, ResultQueue } from '../db/models/resultQueue';
import { addToSchema } from './addToSchema';

export function applyResultQueueToSchema(): ObjectTypeComposerWithMongooseResolvers<IResultQueue> {
  const customizationOptions = {};
  return addToSchema<IResultQueue>(
    'category',
    composeMongoose(ResultQueue, customizationOptions),
  );
}
