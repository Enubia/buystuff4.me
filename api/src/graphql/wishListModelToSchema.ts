import { composeMongoose } from 'graphql-compose-mongoose';
import { WishList } from '../db/models/wishlist';
import { addToSchema } from './addToSchema';

export function applyWishListToSchema(): any {
  const customizationOptions = {};
  return addToSchema(
    'WishList',
    composeMongoose(WishList, customizationOptions),
  );
}

export function resolveWishListRelations({
  WishListTC,
  UserTC,
  CategoryTC,
}): void {
  WishListTC.addRelation('user', {
    resolver: () => UserTC.mongooseResolvers.findById(),
    prepareArgs: {
      _id: (source) => source.user || null,
    },
    projection: { user: true },
  });

  WishListTC.addRelation('category', {
    resolver: () => CategoryTC.mongooseResolvers.findById(),
    prepareArgs: {
      _id: (source) => source.category || null,
    },
    projection: { category: true },
  });
}
