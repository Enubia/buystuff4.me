/* eslint-disable @typescript-eslint/no-shadow */
import { IWishListManyResult, IWishList } from 'types/IWishList';
import { MutationTree, ActionTree } from 'vuex';
import gql from 'graphql-tag';

export interface ICategory {
  _id: string;
  name: string;
}

export const state = () => ({
  categories: [] as ICategory[],
  searchFilter: [] as ICategory[],
  wishLists: [] as IWishList[],
});

export type SearchRootState = ReturnType<typeof state>;

export const mutations: MutationTree<SearchRootState> = {
  reset: (state) => {
    state.searchFilter = [];
    state.wishLists = [];
  },
  updateWishListSate: (
    state,
    {
      wishLists,
      pushToState,
    }: { wishLists: IWishList[]; pushToState: boolean },
  ) => {
    if (pushToState) {
      state.wishLists.push(...wishLists);
    } else {
      state.wishLists = wishLists;
    }
  },
  applyCategories: (state, categories: ICategory[]) => {
    state.categories = categories;
  },

  addCategoryToFilter: (state, category: ICategory) => {
    state.searchFilter.push(category);
  },

  removeCategoryFromFilter: (state, categoryId: string) => {
    const category = state.searchFilter.find((item) => item._id === categoryId);
    if (category) {
      state.searchFilter.splice(state.searchFilter.indexOf(category), 1);
    }
  },
};

// TODO: handle errors properly
export const actions: ActionTree<SearchRootState, SearchRootState> = {
  async fetchCategories(context) {
    if (context.state.categories.length === 0) {
      const client = this.app.apolloProvider?.defaultClient;

      try {
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

        context.commit('applyCategories', result?.data.categoryManyLean);
      } catch (error) {
        console.error(error);
      }
    }
  },
  async fetchWishLists(
    context,
    filterValues: {
      useOffset?: boolean;
      offset: number;
    },
  ) {
    const client = this.app.apolloProvider?.defaultClient;

    const variables: {
      limit: number;
      skip: number;
      wishListManyLeanFilter: {
        categoryIds?: string[];
        isPublished: boolean;
      };
    } = {
      limit: 9,
      skip: filterValues.useOffset ? filterValues.offset : 0,
      wishListManyLeanFilter: {
        isPublished: true,
      },
    };

    if (context.state.searchFilter.length > 0) {
      variables.wishListManyLeanFilter.categoryIds =
        context.state.searchFilter.map((item) => item._id);
      variables.limit = 50;
    }

    const result = await client?.query({
      query: gql`
        query wishListManyLean(
          $limit: Int
          $skip: Int
          $wishListManyLeanFilter: FilterFindManyWishListInput
        ) {
          wishListManyLean(
            limit: $limit
            skip: $skip
            filter: $wishListManyLeanFilter
          ) {
            link
            description
            _id
            categoryIds
            categories {
              _id
              name
            }
            userByWishListId {
              _id
              firstName
              lastName
              image
            }
          }
        }
      `,
      variables,
    });

    const wishListResult = result?.data
      .wishListManyLean as IWishListManyResult[];

    const wishLists: IWishList[] = [];

    for (const list of wishListResult) {
      wishLists.push({
        _id: list._id,
        link: list.link,
        description: list.description,
        categories: list.categories,
        user: {
          _id: list.userByWishListId._id,
          firstName: list.userByWishListId.firstName,
          lastName: list.userByWishListId.lastName,
          image:
            list.userByWishListId.image ||
            'anime-away-face-no-nobody-spirited_113254.svg',
        },
      });
    }

    context.commit('updateWishListSate', {
      wishLists,
      pushToState: context.state.searchFilter.length === 0,
    });
  },
  async fetchWishlistsWithCategoryFilter(context) {
    const client = this.app.apolloProvider?.defaultClient;

    const variables: {
      limit: number;
      skip: number;
      wishListsByCategoryIdsCategoryIds: string[];
    } = {
      limit: 100,
      skip: 0,
      wishListsByCategoryIdsCategoryIds: context.state.searchFilter.map(
        (item) => item._id,
      ),
    };

    const result = await client?.query({
      query: gql`
        query wishListsByCategoryIds(
          $wishListsByCategoryIdsCategoryIds: [String]
        ) {
          wishListsByCategoryIds(
            categoryIds: $wishListsByCategoryIdsCategoryIds
          ) {
            link
            description
            _id
            categoryIds
            categories {
              _id
              name
            }
            userByWishListId {
              _id
              firstName
              lastName
              image
            }
          }
        }
      `,
      variables,
    });

    const wishListResult = result?.data
      .wishListsByCategoryIds as IWishListManyResult[];

    const wishLists: IWishList[] = [];

    for (const list of wishListResult) {
      wishLists.push({
        _id: list._id,
        link: list.link,
        description: list.description,
        categories: list.categories,
        user: {
          _id: list.userByWishListId._id,
          firstName: list.userByWishListId.firstName,
          lastName: list.userByWishListId.lastName,
          image:
            list.userByWishListId.image ||
            'anime-away-face-no-nobody-spirited_113254.svg',
        },
      });
    }

    context.commit('updateWishListSate', {
      wishLists,
      pushToState: false,
    });
  },
};
