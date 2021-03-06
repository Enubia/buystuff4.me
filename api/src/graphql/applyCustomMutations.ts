import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { schemaComposer } from 'graphql-compose';
import { OAuth2Client } from 'google-auth-library';
import { ObjectTypeComposerWithMongooseResolvers } from 'graphql-compose-mongoose';
import { LeanDocument, Types } from 'mongoose';
import { IContext } from '../types/IContext';
import { logger } from '../helper/logger';
import { ICategory } from '../db/models/category';
import { IUser } from '../db/models/user';
import { IWishList } from '../db/models/wishList';
import { ErrorMessages } from '../helper/errorMessages';

export function applyCustomMutations({
  UserTC,
}: {
  UserTC: ObjectTypeComposerWithMongooseResolvers<IUser>;
  WishListTC: ObjectTypeComposerWithMongooseResolvers<IWishList>;
  CategoryTC: ObjectTypeComposerWithMongooseResolvers<ICategory>;
}): void {
  // --------------------- user ---------------------
  schemaComposer.Mutation.setField('google', {
    type: UserTC,
    description: 'Endpoint for the google sign-in token verification',
    args: {
      token: GraphQLNonNull(GraphQLString),
    },
    resolve: async (
      _source,
      args: { token: string },
      context: IContext,
      _info,
    ) => {
      const client = new OAuth2Client();
      const { token } = args;

      try {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience:
            '623656119704-d7ovmjp6gtbgdseuchf6884sgi62v2ug.apps.googleusercontent.com',
        });
        const payload = ticket.getPayload();
        const { given_name, family_name, email } = payload;

        const user = await context.mongo.User.countDocuments({ email }).exec();

        if (user > 0) {
          return await context.mongo.User.findOne({ email }).lean().exec();
        } else {
          return await context.mongo.User.create({
            email,
            firstName: given_name,
            lastName: family_name,
            wishListIds: [],
          });
        }
      } catch (error) {
        logger.error(error);
        return null;
      }
    },
  });

  schemaComposer.Mutation.setField('deleteAccount', {
    type: new GraphQLObjectType({
      name: 'result',
      fields: {
        success: {
          type: GraphQLNonNull(GraphQLBoolean),
        },
        message: { type: GraphQLString },
      },
    }),
    args: {
      email: GraphQLNonNull(GraphQLString),
    },
    resolve: async (
      _source,
      args: { email: string },
      context: IContext,
      _info,
    ) => {
      const { email } = args;

      let result: LeanDocument<IUser>;
      try {
        result = await context.mongo.User.findOneAndRemove({ email })
          .lean()
          .exec();

        if (!result) {
          return { success: false, message: ErrorMessages.NO_USER_FOUND };
        }
      } catch (error) {
        logger.error(error);
        return { success: false, message: ErrorMessages.DELETE_USER };
      }

      try {
        await context.mongo.WishList.deleteMany({
          _id: {
            $in: result.wishListIds.map((id) => new Types.ObjectId(String(id))),
          },
        }).exec();

        await context.mongo.WishListQueue.deleteMany({
          wishListIds: {
            $in: result.wishListIds.map((id) => new Types.ObjectId(String(id))),
          },
        }).exec();
      } catch (error) {
        logger.error(error);
        return { success: false, message: ErrorMessages.DELETE_WISHLISTS };
      }

      return { ok: true };
    },
  });

  // --------------------- wishlist ---------------------
  schemaComposer.Mutation.setField('wishListCreateOne', {
    type: schemaComposer.createObjectTC({
      name: 'WishListCreateResult',
      fields: {
        wishListId: { type: GraphQLString },
        isPublished: { type: GraphQLNonNull(GraphQLBoolean) },
        message: { type: GraphQLString },
      },
    }),
    args: {
      link: GraphQLNonNull(GraphQLString),
      userId: GraphQLNonNull(GraphQLString),
      categoryIds: [GraphQLNonNull(GraphQLString)],
      description: GraphQLNonNull(GraphQLString),
      priority: GraphQLInt,
    },
    resolve: async (
      _source,
      args: {
        link: string;
        userId: string;
        categoryIds: string[];
        description: string;
        priority: number;
      },
      context: IContext,
      _info,
    ) => {
      const { link, userId, categoryIds, priority, description } = args;

      const wishListCount = await context.mongo.User.find(
        { _id: new Types.ObjectId(userId) },
        ['select'],
      )
        .lean()
        .exec();

      if (wishListCount.length === 3) {
        return {
          isPublished: false,
          message: ErrorMessages.WISHLIST_LIMIT_REACHED,
        };
      }

      let result: IWishList;

      try {
        // const documentCount = await context.mongo.WishList.countDocuments({
        //   isPublished: true,
        // })
        //   .lean()
        //   .exec();

        const data: Pick<
          IWishList,
          | 'link'
          | 'categoryIds'
          | 'priority'
          | 'isPublished'
          | 'lastPublishedAt'
          | 'description'
        > = {
          link,
          categoryIds: categoryIds.map((id) => new Types.ObjectId(String(id))),
          priority,
          isPublished: true,
          description,
          lastPublishedAt: new Date(),
        };

        result = await context.mongo.WishList.create(data);
      } catch (error) {
        logger.error(error);
        return { isPublished: false, message: ErrorMessages.CREATE_WISHLIST };
      }

      try {
        await context.mongo.User.updateOne(
          { _id: new Types.ObjectId(userId) },
          {
            $addToSet: { wishListIds: new Types.ObjectId(String(result._id)) },
          },
        ).exec();
      } catch (error) {
        logger.error(error);
        return {
          isPublished: false,
          message: ErrorMessages.ADD_WISHLIST_TO_USER,
        };
      }

      try {
        if (!result.isPublished) {
          await context.mongo.WishListQueue.create({
            wishListId: new Types.ObjectId(String(result._id)),
          });
        }
      } catch (error) {
        logger.error(error);
        return {
          isPublished: result.isPublished,
          message: ErrorMessages.ADD_TO_QUEUE,
        };
      }

      return {
        wishListId: result._id,
        isPublished: result.isPublished,
      };
    },
  });

  schemaComposer.Mutation.setField('deleteListFromUser', {
    type: schemaComposer.createObjectTC({
      name: 'DeleteListFromUserResult',
      fields: {
        success: { type: GraphQLString },
        message: { type: GraphQLString },
      },
    }),
    args: {
      userId: GraphQLNonNull(GraphQLString),
      wishListId: GraphQLNonNull(GraphQLString),
    },
    resolve: async (
      _source,
      args: { wishListId: string; userId: string },
      context: IContext,
      _info,
    ) => {
      try {
        await context.mongo.WishList.deleteOne({
          _id: new Types.ObjectId(args.wishListId),
        }).exec();
      } catch (error) {
        logger.error(error);
        return {
          success: false,
          message: ErrorMessages.REMOVE_LIST_FROM_WISHLISTS,
        };
      }

      try {
        await context.mongo.WishListQueue.deleteOne({
          wishListId: new Types.ObjectId(args.wishListId),
        }).exec();
      } catch (error) {
        logger.error(error);
        return {
          success: false,
          message: ErrorMessages.REMOVE_LIST_FROM_QUEUE,
        };
      }

      try {
        await context.mongo.User.updateOne(
          { _id: new Types.ObjectId(args.userId) },
          { $pull: { wishListIds: args.wishListId } },
        )
          .lean()
          .exec();
      } catch (error) {
        logger.error(error);
        return {
          success: false,
          message: ErrorMessages.REMOVE_LIST_FROM_USER,
        };
      }

      return {
        success: true,
      };
    },
  });
}
