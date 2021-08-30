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
import { applyCustomMutations } from './applyCustomMutations';

function createSchema(): GraphQLSchema {
  const UserTC = applyUserToSchema();
  const WishListTC = applyWishListToSchema();
  const CategoryTC = applyCategoryToSchema();

  applyCustomUserResolver({ UserTC, WishListTC });
  applyCustomWishListResolver({ UserTC, WishListTC, CategoryTC });

  applyCustomQueries({ UserTC, WishListTC, CategoryTC });
  applyCustomMutations({ UserTC, WishListTC, CategoryTC });

  return schemaComposer.buildSchema();
}

export const schema = createSchema();
