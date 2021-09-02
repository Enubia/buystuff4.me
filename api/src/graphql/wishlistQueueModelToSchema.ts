import {
  composeMongoose,
  ObjectTypeComposerWithMongooseResolvers,
} from 'graphql-compose-mongoose';
import { IWishListQueue, WishListQueue } from '../db/models/wishListQueue';
import { ICategory } from '../db/models/category';
import { IUser } from '../db/models/user';
import { IWishList } from '../db/models/wishList';
import { addToSchema } from './addToSchema';

export function applyWishlistQueueToSchema(): ObjectTypeComposerWithMongooseResolvers<IWishListQueue> {
  const customizationOptions = {};
  return addToSchema<IWishListQueue>(
    'wishListQueue',
    composeMongoose(WishListQueue, customizationOptions),
  );
}

export function applyCustomWishListQueueResolver({
  UserTC,
  WishListTC,
  CategoryTC,
  WishListQueueTC,
}: {
  UserTC: ObjectTypeComposerWithMongooseResolvers<IUser>;
  WishListTC: ObjectTypeComposerWithMongooseResolvers<IWishList>;
  CategoryTC: ObjectTypeComposerWithMongooseResolvers<ICategory>;
  WishListQueueTC: ObjectTypeComposerWithMongooseResolvers<IWishListQueue>;
}): void {
  WishListQueueTC.addRelation('wishLists', {
    resolver: () => WishListTC.mongooseResolvers.findById(),
    prepareArgs: {
      _id: (source) => source.wishListId || [],
    },
    projection: { wishList: true },
  });
}
