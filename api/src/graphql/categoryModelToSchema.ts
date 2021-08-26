import {
  composeMongoose,
  ObjectTypeComposerWithMongooseResolvers,
} from 'graphql-compose-mongoose';
import { Category, ICategory } from '../db/models/category';
import { addToSchema } from './addToSchema';

export function applyCategoryToSchema(): ObjectTypeComposerWithMongooseResolvers<ICategory> {
  const customizationOptions = {};
  return addToSchema<ICategory>(
    'category',
    composeMongoose(Category, customizationOptions),
  );
}
