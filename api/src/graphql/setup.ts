import { GraphQLSchema } from 'graphql';
import { schemaComposer } from 'graphql-compose';
import { applyUserToSchema, customUserResolver } from './userModelToSchema';
import {
  applyWishListToSchema,
  customWishListResolver,
} from './wishListModelToSchema';
import { applyCategoryToSchema } from './categoryModelToSchema';
import { customQueries } from './customQueries';

export function createSchema(): GraphQLSchema {
  const UserTC = applyUserToSchema();
  const WishListTC = applyWishListToSchema();
  const CategoryTC = applyCategoryToSchema();

  customUserResolver({ UserTC, WishListTC });
  customWishListResolver({ WishListTC, UserTC, CategoryTC });

  customQueries({ UserTC, WishListTC, CategoryTC });

  return schemaComposer.buildSchema();
}
