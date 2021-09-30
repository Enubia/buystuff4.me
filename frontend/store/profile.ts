/* eslint-disable @typescript-eslint/no-shadow */
import gql from 'graphql-tag';
import { IUser } from 'types/IUser';
import { MutationTree, ActionTree } from 'vuex';
import { ICategory } from './search';

export const state = () => ({
  user: <IUser>{},
});

export type ProfileRootState = ReturnType<typeof state>;

export const mutations: MutationTree<ProfileRootState> = {
  reset(state) {
    state.user = <IUser>{};
  },
  updateUser(state, user: IUser) {
    state.user = user;
  },
  removeListFromUser(state, id: string) {
    state.user.wishLists?.splice(
      state.user.wishLists?.findIndex((item) => item._id === id),
      1,
    );

    state.user.wishListIds.splice(state.user.wishListIds.indexOf(id), 1);
  },
};

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
            email
            wishListIds
            wishLists {
              _id
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
  async saveList(context, payload: { link: string; categories: ICategory[] }) {
    const client = this.app.apolloProvider?.defaultClient;

    const result = await client?.mutate({
      mutation: gql`
        mutation saveList(
          $link: String!
          $categories: [String!]!
          $userId: String!
        ) {
          wishListCreateOne(
            link: $link
            categoryIds: $categories
            userId: $userId
          ) {
            isPublished
            message
          }
        }
      `,
      variables: {
        link: payload.link,
        categories: payload.categories.map((item) => item._id),
        userId: context.state.user._id,
      },
    });

    if (!result?.data?.wishListCreateOne.message) {
      const userResult = await client?.query({
        query: gql`
          query getUser($id: MongoID!) {
            userByIdLean(_id: $id) {
              _id
              firstName
              lastName
              image
              email
              wishListIds
              wishLists {
                _id
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
          id: context.state.user._id,
        },
      });

      if (userResult?.data?.userByIdLean) {
        context.commit('updateUser', userResult.data.userByIdLean);
      } else {
        throw new Error(userResult?.data.userByIdLean.message);
      }
    } else {
      throw new Error(result?.data?.wishListCreateOne.message);
    }
  },
  async deleteList(context, id: string) {
    const client = this.app.apolloProvider?.defaultClient;

    const result = await client?.mutate({
      mutation: gql`
        mutation deleteList($wishListId: String!, $userId: String!) {
          deleteListFromUser(wishListId: $wishListId, userId: $userId) {
            success
            message
          }
        }
      `,
      variables: {
        wishListId: id,
        userId: context.state.user._id,
      },
    });

    if (result?.data.deleteListFromUser.success) {
      context.commit('removeListFromUser', id);
    } else {
      throw new Error(result?.data.deleteListFromUser.message);
    }
  },
};
