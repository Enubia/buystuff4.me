// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLRequestContext } from 'apollo-server-types';
import { Model } from 'mongoose';
import { IUser } from '../db/models/user';
import { IWishList } from '../db/models/wishList';
import { ICategory } from '../db/models/category';
import { IWishListQueue } from '../db/models/wishListQueue';

export interface IContext extends GraphQLRequestContext {
  mongo: {
    User: Model<IUser>;
    WishList: Model<IWishList>;
    Category: Model<ICategory>;
    WishListQueue: Model<IWishListQueue>;
  };
}
