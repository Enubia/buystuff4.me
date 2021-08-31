import { ObjectTypeComposerWithMongooseResolvers } from 'graphql-compose-mongoose';
import { ICategory } from '../db/models/category';
import { IUser } from '../db/models/user';
import { IWishList } from '../db/models/wishlist';

export function applyCustomQueries({
  UserTC,
  WishListTC,
  CategoryTC,
}: {
  UserTC: ObjectTypeComposerWithMongooseResolvers<IUser>;
  WishListTC: ObjectTypeComposerWithMongooseResolvers<IWishList>;
  CategoryTC: ObjectTypeComposerWithMongooseResolvers<ICategory>;
}): void {}
