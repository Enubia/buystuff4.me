// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLRequestContext } from 'apollo-server-types';
import { Model } from 'mongoose';
import { IUser } from '../db/models/user';
import { IWishList } from '../db/models/wishlist';
import { ICategory } from '../db/models/category';

export interface Context extends GraphQLRequestContext {
  mongo: {
    User: Model<IUser>;
    WishList: Model<IWishList>;
    Category: Model<ICategory>;
  };
}
