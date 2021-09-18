/* eslint-disable @typescript-eslint/no-shadow */
import gql from 'graphql-tag';
import { GetterTree, ActionTree, MutationTree } from 'vuex';

interface ICategory {
  _id: string;
  name: string;
}

export const state = () => ({
  categories: [] as ICategory[],
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {};

export const mutations: MutationTree<RootState> = {
  ADD_CATEGORY: (state, category: ICategory) => {
    state.categories.push(category);
  },

  REMOVE_CATEGORY: (state, categoryId: string) => {
    const category = state.categories.find((item) => item._id === categoryId);
    if (category) {
      state.categories.splice(state.categories.indexOf(category), 1);
    }
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async fetchCategories({ commit }) {
    const client = this.app.apolloProvider?.defaultClient;

    const result = await client?.query({
      query: gql`
        query allCategories {
          categoryManyLean {
            _id
            name
          }
        }
      `,
    });

    result?.data.categoryManyLean.forEach((item: ICategory) =>
      commit('ADD_CATEGORY', item),
    );
  },
};
