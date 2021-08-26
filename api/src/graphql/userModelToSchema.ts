import { composeMongoose } from 'graphql-compose-mongoose';
import { User } from '../db/models/user';
import { addToSchema } from './addToSchema';

export function applyUserToSchema(): any {
  const customizationOptions = {};
  return addToSchema('User', composeMongoose(User, customizationOptions));
}

export function resolveUserRelations({ UserTC, WishListTC }): void {
  UserTC.addRelation('wishList', {
    resolver: () => WishListTC.mongooseResolvers.findByIds(),
    prepareArgs: {
      _ids: (source) => source.wishLists || [],
    },
    projection: { wishLists: true },
  });
}
