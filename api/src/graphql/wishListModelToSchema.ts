import {
  composeMongoose,
  ObjectTypeComposerWithMongooseResolvers,
} from 'graphql-compose-mongoose';
import { NonNullComposer } from 'graphql-compose';
import { Types } from 'mongoose';
import { IWishList, WishList } from '../db/models/wishlist';
import { ICategory } from '../db/models/category';
import { IUser } from '../db/models/user';
import { Context } from '../types/context';
import { addToSchema } from './addToSchema';

export function applyWishListToSchema(): ObjectTypeComposerWithMongooseResolvers<IWishList> {
  const customizationOptions = {};
  return addToSchema<IWishList>(
    'wishList',
    composeMongoose(WishList, customizationOptions),
  );
}

export function applyCustomWishListResolver({
  UserTC,
  WishListTC,
  CategoryTC,
}: {
  UserTC: ObjectTypeComposerWithMongooseResolvers<IUser>;
  WishListTC: ObjectTypeComposerWithMongooseResolvers<IWishList>;
  CategoryTC: ObjectTypeComposerWithMongooseResolvers<ICategory>;
}): void {
  WishListTC.addRelation('categories', {
    resolver: () => CategoryTC.mongooseResolvers.findByIds(),
    prepareArgs: {
      _ids: (source) => source.categoryIds || [],
    },
    projection: { category: true },
  });

  WishListTC.setField('userByWishListId', {
    type: new NonNullComposer(UserTC),
    resolve: async (source, args, context: Context, _info) => {
      const { _id } = source;

      const user = await context.mongo.User.findOne({
        wishListIds: { $in: [new Types.ObjectId(_id)] },
      })
        .lean()
        .exec();

      return user || null;
    },
  });
}