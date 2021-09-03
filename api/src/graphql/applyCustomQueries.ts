import { schemaComposer } from 'graphql-compose';
import { ObjectTypeComposerWithMongooseResolvers } from 'graphql-compose-mongoose';
import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { ICategory } from '../db/models/category';
import { IUser } from '../db/models/user';
import { IWishList } from '../db/models/wishList';
import { IContext } from '../types/IContext';
import { logger } from '../helper/logger';
import { ErrorMessages } from '../helper/errorMessages';

export function applyCustomQueries(_: {
  UserTC: ObjectTypeComposerWithMongooseResolvers<IUser>;
  WishListTC: ObjectTypeComposerWithMongooseResolvers<IWishList>;
  CategoryTC: ObjectTypeComposerWithMongooseResolvers<ICategory>;
}): void {
  schemaComposer.Query.setField('wishListCount', {
    type: new GraphQLObjectType({
      name: 'WishListCountResult',
      fields: {
        count: { type: GraphQLNonNull(GraphQLInt) },
        message: { type: GraphQLString },
      },
    }),
    resolve: async (source, args, context: IContext, _info) => {
      try {
        const result = await context.mongo.WishList.countDocuments({
          isPublished: true,
        })
          .lean()
          .exec();

        return { count: result };
      } catch (error) {
        logger.error(error);
        return { count: 0, message: ErrorMessages.WISHLIST_COUNT };
      }
    },
  });

  schemaComposer.Query.setField('wishListQueueCount', {
    type: new GraphQLObjectType({
      name: 'WishListQueueCountResult',
      fields: {
        count: { type: GraphQLNonNull(GraphQLInt) },
        message: { type: GraphQLString },
      },
    }),
    resolve: async (source, args, context: IContext, _info) => {
      try {
        const result =
          await context.mongo.WishListQueue.estimatedDocumentCount()
            .lean()
            .exec();

        return { count: result };
      } catch (error) {
        logger.error(error);
        return { count: 0, message: ErrorMessages.WISHLIST_QUEUE_COUNT };
      }
    },
  });
}
