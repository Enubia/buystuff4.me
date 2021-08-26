import { composeMongoose } from 'graphql-compose-mongoose';
import { Category } from '../db/models/category';
import { addToSchema } from './addToSchema';

export function applyCategoryToSchema(): any {
  const customizationOptions = {};
  return addToSchema(
    'Category',
    composeMongoose(Category, customizationOptions),
  );
}
