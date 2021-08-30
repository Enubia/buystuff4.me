import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { schemaComposer } from 'graphql-compose';
import { OAuth2Client } from 'google-auth-library';
import { ObjectTypeComposerWithMongooseResolvers } from 'graphql-compose-mongoose';
import { LeanDocument, Types } from 'mongoose';
import { Context } from '../types/context';
import { logger } from '../helper/logger';
import { ICategory } from '../db/models/category';
import { IUser } from '../db/models/user';
import { IWishList } from '../db/models/wishlist';
import { ErrorMessages } from '../helper/errorMessages';

export function applyCustomMutations({
  UserTC,
  WishListTC,
  CategoryTC,
}: {
  UserTC: ObjectTypeComposerWithMongooseResolvers<IUser>;
  WishListTC: ObjectTypeComposerWithMongooseResolvers<IWishList>;
  CategoryTC: ObjectTypeComposerWithMongooseResolvers<ICategory>;
}): void {
  schemaComposer.Mutation.setField('google', {
    type: UserTC,
    description: 'Endpoint for the google sign-in token verification',
    args: {
      token: GraphQLNonNull(GraphQLString),
    },
    resolve: async (_source, args, context: Context, _info) => {
      const clientId = String(process.env.G_CLIENT_ID);
      const client = new OAuth2Client();
      const { token } = args;

      try {
        const ticket = await client.verifyIdToken({
          idToken: String(token),
          audience: clientId,
        });
        const payload = ticket.getPayload();
        const { given_name, family_name, email } = payload;

        return await context.mongo.User.findOneAndUpdate(
          { email },
          {
            email,
            firstName: given_name,
            lastName: family_name,
          },
          { new: true, upsert: true },
        )
          .lean()
          .exec();
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
    resolve: async (_source, args, context: Context, _info) => {
      const { email } = args;

      let result: LeanDocument<IUser>;
      try {
        result = await context.mongo.User.findOneAndRemove({ email })
          .lean()
          .exec();
      } catch (error) {
        logger.error(error);
        return { success: false, message: ErrorMessages.REMOVE_USER };
      }

      try {
        await context.mongo.WishList.deleteMany({
          _id: {
            $in: result.wishListIds.map((id) => new Types.ObjectId(id)),
          },
        }).exec();
      } catch (error) {
        logger.error(error);
        return { success: false, message: ErrorMessages.DELETE_WISHLISTS };
      }

      return { ok: true };
    },
  });
}
