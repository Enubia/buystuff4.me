import { NonNullComposer, schemaComposer } from 'graphql-compose';
import {
  GraphQLMongoID,
  ObjectTypeComposerWithMongooseResolvers,
} from 'graphql-compose-mongoose';
import { Types } from 'mongoose';
import { GraphQLNonNull } from 'graphql';
import { ICategory } from '../db/models/category';
import { IUser } from '../db/models/user';
import { IWishList } from '../db/models/wishlist';
import { Context } from '../types/context';

export function applyCustomQueries({
  WishListTC,
  UserTC,
  CategoryTC,
}: {
  WishListTC: ObjectTypeComposerWithMongooseResolvers<IWishList>;
  UserTC: ObjectTypeComposerWithMongooseResolvers<IUser>;
  CategoryTC: ObjectTypeComposerWithMongooseResolvers<ICategory>;
}): void {
  schemaComposer.Query.setField('userByWishListId', {
    type: new NonNullComposer(UserTC),
    args: {
      _id: GraphQLNonNull(GraphQLMongoID),
    },
    resolve: async (_source, args, context: Context, _info) => {
      const user = await context.mongo.User.findOne({
        wishListIds: { $in: [new Types.ObjectId(String(args._id))] },
      })
        .lean()
        .exec();

      return user || null;
    },
  });
}
