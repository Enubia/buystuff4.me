/* eslint-disable @typescript-eslint/no-shadow */
import gql from 'graphql-tag';
import { IUser } from 'types/IUser';
import { MutationTree, ActionTree } from 'vuex';

export const state = () => ({
  user: {} as IUser,
});

export type ProfileRootState = ReturnType<typeof state>;

export const mutations: MutationTree<ProfileRootState> = {
  reset(state) {
    state.user = {} as IUser;
  },
  updateUser(state, user: IUser) {
    state.user = user;
  },
};

// TODO: handle errors properly
export const actions: ActionTree<ProfileRootState, ProfileRootState> = {
  async signIn(context, token: string) {
    const client = this.app.apolloProvider?.defaultClient;

    const result = await client?.mutate({
      mutation: gql`
        mutation GoogleMutation($googleToken: String!) {
          google(token: $googleToken) {
            _id
            firstName
            lastName
            image
            wishListIds
            wishLists {
              link
              description
              categoryIds
              categories {
                name
              }
            }
          }
        }
      `,
      variables: {
        googleToken: token,
      },
    });

    context.commit('updateUser', result?.data.google);
  },
};
