import { GraphQLSchema } from 'graphql';
import { schemaComposer } from 'graphql-compose';
import {
  applyUserToSchema,
  applyCustomUserResolver,
} from './userModelToSchema';
import {
  applyWishListToSchema,
  applyCustomWishListResolver,
} from './wishListModelToSchema';
import { applyCategoryToSchema } from './categoryModelToSchema';
import { applyCustomQueries } from './applyCustomQueries';

function createSchema(): GraphQLSchema {
  const UserTC = applyUserToSchema();
  const WishListTC = applyWishListToSchema();
  const CategoryTC = applyCategoryToSchema();

  applyCustomUserResolver({ UserTC, WishListTC });
  applyCustomWishListResolver({ WishListTC, UserTC, CategoryTC });

  applyCustomQueries({ UserTC, WishListTC, CategoryTC });

  return schemaComposer.buildSchema();
}

export const schema = createSchema();
