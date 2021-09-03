import {
  composeMongoose,
  ObjectTypeComposerWithMongooseResolvers,
} from 'graphql-compose-mongoose';
import { NonNullComposer } from 'graphql-compose';
import { Types } from 'mongoose';
import { IWishList, WishList } from '../db/models/wishList';
import { ICategory } from '../db/models/category';
import { IUser } from '../db/models/user';
import { IContext } from '../types/IContext';
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
    resolve: async (source, args, context: IContext, _info) => {
      const { _id } = source;

      const user = await context.mongo.User.findOne({
        // TODO: types are messed up here for some reason, this is a temporarily fix
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        wishListIds: { $in: [new Types.ObjectId(String(_id))] },
      })
        .lean()
        .exec();

      return user || null;
    },
  });
}
