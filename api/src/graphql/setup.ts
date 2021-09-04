import { writeFileSync } from 'fs';
import * as path from 'path';
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
import {
  applyCustomWishListQueueResolver,
  applyWishlistQueueToSchema,
} from './wishlistQueueModelToSchema';

function createSchema(): GraphQLSchema {
  const UserTC = applyUserToSchema();
  const WishListTC = applyWishListToSchema();
  const CategoryTC = applyCategoryToSchema();
  // only apply it, we don't need the TC anywhere
  const WishListQueueTC = applyWishlistQueueToSchema();

  applyCustomUserResolver({ UserTC, WishListTC });
  applyCustomWishListResolver({ UserTC, WishListTC, CategoryTC });
  applyCustomWishListQueueResolver({
    UserTC,
    WishListTC,
    CategoryTC,
    WishListQueueTC,
  });

  applyCustomQueries({ UserTC, WishListTC, CategoryTC });
  applyCustomMutations({ UserTC, WishListTC, CategoryTC });

  if (process.env.NODE_ENV !== 'production') {
    writeFileSync(
      path.join(__dirname, 'schema.graphql'),
      schemaComposer.toSDL(),
    );
  }

  return schemaComposer.buildSchema();
}

export const schema = createSchema();
