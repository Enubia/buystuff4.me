<template>
  <div v-if="wishLists.length > 0" class="md:flex md:flex-wrap w-full">
    <div
      v-for="list of wishLists"
      :key="list._id"
      class="px-6 w-full lg:w-1/2 xl:w-1/3"
    >
      <Card :list="list" />
    </div>
    <div v-if="showLoaderButton" class="flex w-full justify-center my-2">
      <button
        type="button"
        class="btn btn-outline btn-primary"
        :class="!loaderDisabled && 'loading'"
        :disabled="!loaderDisabled"
        @click="getWishLists(true)"
      >
        Load More
      </button>
    </div>
  </div>
  <div v-else class="md:flex md:flex-wrap w-full">
    <div
      v-for="item of sampleCards"
      :key="item"
      class="px-6 w-full lg:w-1/2 xl:w-1/3"
    >
      <div
        class="
          max-w-md
          mx-auto
          shadow-xl
          border
          rounded-xl
          border-base-200
          md:max-w-2xl
          transition-colors
          h-48
          m-2
          p-8
          w-full
        "
      >
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-gray-400 h-12 w-12"></div>
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-gray-400 rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-400 rounded"></div>
              <div class="h-4 bg-gray-400 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import gql from 'graphql-tag';
import Checkbox from '../form-elements/Checkbox.vue';
import Card from './Card.vue';
import { IWishList } from '../../types/IWishList';

export interface IWishListManyResult {
  link: string;
  description: string;
  _id: string;
  categoryIds: string[];
  categories: {
    _id: string;
    name: string;
  }[];

  userByWishListId: {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
  };
}

@Component({
  name: 'SearchResult',
  components: {
    Checkbox,
    Card,
  },
})
export default class SearchResult extends Vue {
  sampleCards = new Array(9);

  wishLists: IWishList[] = [];

  offset = 0;

  loaderDisabled = true;

  showLoaderButton = true;

  async mounted() {
    if (this.wishLists.length > 0) {
      return;
    }

    await this.getWishLists();
  }

  async getWishLists(useOffset = false) {
    try {
      this.loaderDisabled = false;

      const variables: {
        limit: number;
        skip: number;
        wishListManyLeanFilter: {
          categoryIds?: string[];
          isPublished: boolean;
        };
      } = {
        limit: 9,
        skip: useOffset ? this.offset : 0,
        wishListManyLeanFilter: {
          isPublished: true,
        },
      };

      const result = await this.$apollo.query({
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

      const wishListResult = result.data.wishListManyLean;

      this.offset += 9;

      const preparedResult: IWishList[] = [];
      const wishLists: IWishListManyResult[] = wishListResult;

      for (const list of wishLists) {
        const found = this.wishLists.find((item) => item._id === list._id);

        if (!found) {
          preparedResult.push({
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
      }

      this.loaderDisabled = true;

      this.wishLists.push(...preparedResult);

      if (wishListResult.length < 9) {
        // we are done loading users if the result is smaller than the limit
        this.loaderDisabled = true;
        this.showLoaderButton = false;
      }
    } catch (error) {
      console.error(error);
      this.loaderDisabled = true;
    }
  }
}
</script>
