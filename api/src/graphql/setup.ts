import { GraphQLSchema } from 'graphql';
import { schemaComposer } from 'graphql-compose';
import { applyUserToSchema, resolveUserRelations } from './userModelToSchema';
import {
  applyWishListToSchema,
  resolveWishListRelations,
} from './wishListModelToSchema';
import { applyCategoryToSchema } from './categoryModelToSchema';

export function createSchema(): GraphQLSchema {
  const UserTC = applyUserToSchema();
  const WishListTC = applyWishListToSchema();
  const CategoryTC = applyCategoryToSchema();

  resolveUserRelations({ UserTC, WishListTC });
  resolveWishListRelations({ WishListTC, UserTC, CategoryTC });

  return schemaComposer.buildSchema();
}
