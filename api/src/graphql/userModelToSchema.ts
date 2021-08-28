import {
  composeMongoose,
  ObjectTypeComposerWithMongooseResolvers,
} from 'graphql-compose-mongoose';
import { IUser, User } from '../db/models/user';
import { IWishList } from '../db/models/wishlist';
import { addToSchema } from './addToSchema';

export function applyUserToSchema(): ObjectTypeComposerWithMongooseResolvers<IUser> {
  const customizationOptions = {};
  return addToSchema<IUser>(
    'user',
    composeMongoose(User, customizationOptions),
  );
}

export function applyCustomUserResolver({
  UserTC,
  WishListTC,
}: {
  UserTC: ObjectTypeComposerWithMongooseResolvers<IUser>;
  WishListTC: ObjectTypeComposerWithMongooseResolvers<IWishList>;
}): void {
  UserTC.addRelation('wishLists', {
    resolver: () => WishListTC.mongooseResolvers.findByIds(),
    prepareArgs: {
      _ids: (source) => source.wishListIds || [],
    },
    projection: { wishLists: true },
  });
}
