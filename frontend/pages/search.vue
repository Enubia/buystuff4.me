<template>
  <div>
    <div class="flex w-full justify-center mt-4">
      <button
        class="
          inline-flex
          items-center
          justify-center
          h-8
          px-6
          text-teal-900
          transition
          duration-200
          rounded
          shadow-md
          hover:text-deep-purple-900
          bg-teal-accent-400
          hover:bg-deep-purple-accent-100
        "
        @click="showFilter = !showFilter"
      >
        Filter
      </button>
      <button
        class="
          inline-flex
          items-center
          justify-center
          h-8
          px-6
          text-teal-900
          transition
          duration-200
          rounded
          shadow-md
          hover:text-deep-purple-900
          bg-teal-accent-400
          hover:bg-deep-purple-accent-100
        "
        @click="getWishLists(false, true)"
      >
        Search
      </button>
    </div>
    <div v-if="wishLists.length > 0" class="md:flex md:flex-wrap w-full">
      <div v-if="showFilter" class="flex flex-wrap w-full mx-4">
        <Checkbox
          v-for="category in categories"
          :id="category._id"
          :key="category._id"
          :name="category.name"
          :label="category.name"
          :value="category._id"
          class="w-1/5"
          :alt="category.name"
          @checkbox-ticked="addToFilter"
        />
      </div>
      <div
        v-for="list in wishLists"
        :key="list._id"
        class="px-6 w-full lg:w-1/2 xl:w-1/3"
      >
        <Card :list="list" />
      </div>
      <div v-if="showLoaderButton" class="flex w-full justify-center my-2">
        <button
          type="button"
          class="
            inline-flex
            items-center
            justify-center
            h-12
            px-6
            font-semibold
            tracking-wide
            text-teal-900
            transition
            duration-200
            rounded
            shadow-md
            hover:text-deep-purple-900
            bg-teal-accent-400
            hover:bg-deep-purple-accent-100
            focus:shadow-outline focus:outline-none
          "
          :disabled="!loaderDisabled"
          @click="getWishLists(true)"
        >
          <svg
            v-if="!loaderDisabled"
            :class="loaderDisabled ? '' : 'animate-spin'"
            class="h-5 w-5 mr-3"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ loaderDisabled ? 'Load More' : 'Processing' }}
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
            bg-white
            shadow-xl
            border
            rounded-xl
            border-gray-100
            md:max-w-2xl
            transition transition-colors
            hover:border-deep-purple-accent-200
            shadow
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
  </div>
</template>

<script lang="ts">
// TODO: split up filter and standard query into separate components
// issue is due to apollo caching
import { Component, Vue } from 'nuxt-property-decorator';
import gql from 'graphql-tag';
import Card from '../components/search/Card.vue';
import CategoryFilter from '../components/search/CategoryFilter.vue';
import { IWishList } from '../types/IWishList';
import Checkbox from '../components/form-elements/Checkbox.vue';

interface IWishListManyResult {
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
  name: 'Search',
  components: { Checkbox, CategoryFilter, Card },
})
export default class Search extends Vue {
  sampleCards = new Array(9);

  client = this.$apollo.getClient();

  showFilter = false;

  wishLists: IWishList[] = [];

  categoryFilter: string[] = [];

  offset = 0;

  loaderDisabled = true;

  showLoaderButton = true;

  selectedCategories = new Set<string>();

  categories: { _id: string; name: string }[] = [];

  async mounted() {
    if (this.wishLists.length === 0) {
      await this.getWishLists(false);
    }
    if (this.categories.length === 0) {
      await this.getCategories();
    }
  }

  async getCategories() {
    try {
      const result = await this.client.query({
        query: gql`
          query allCategories {
            categoryManyLean {
              _id
              name
            }
          }
        `,
      });

      this.categories = result.data.categoryManyLean;
    } catch (error) {
      console.error(error);
    }
  }

  addToFilter({ value }: { value: string }) {
    if (this.selectedCategories.has(value)) {
      this.selectedCategories.delete(value);
    } else {
      this.selectedCategories.add(value);
    }
  }

  async getWishLists(useOffset: boolean, clearList = false) {
    if (clearList) {
      this.wishLists = [];
    }
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

      if (this.categoryFilter.length > 0) {
        variables.wishListManyLeanFilter.categoryIds = this.categoryFilter;
      }

      const result = await this.client.query({
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
