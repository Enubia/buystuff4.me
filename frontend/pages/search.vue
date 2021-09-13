<template>
  <div>
    <div v-if="users.length > 0" class="flex flex-wrap w-full">
      <div v-for="user in users" :key="user._id" class="px-2 w-1/3">
        <Card :user="user" />
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
          @click="getUsers(true)"
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
      <div v-for="item of sampleCards" :key="item" class="px-2 md:w-1/3">
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
            h-32
            m-2
            p-4
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
import { Component, Vue } from 'nuxt-property-decorator';
import gql from 'graphql-tag';
import Card from '../components/search/Card.vue';
import { IPreparedUser } from '../types/IUser';

@Component({
  name: 'Search',
  components: { Card },
})
export default class Search extends Vue {
  sampleCards = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  client = this.$apollo.getClient();

  users: IPreparedUser[] = [];

  categories: { _id: string; name: string }[] = [];

  categoryFilter = [];

  offset = 0;

  loaderDisabled = true;

  showLoaderButton = true;

  async mounted() {
    await this.getUsers(false);
  }

  async getUsers(useOffset?: boolean) {
    try {
      this.loaderDisabled = false;
      const result = await this.client.query({
        query: gql`
          query allUsers($skip: Int, $limit: Int) {
            userManyLean(skip: $skip, limit: $limit) {
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
          limit: 10,
          skip: useOffset ? this.offset : 0,
        },
      });

      if (result.data.userManyLean.length < 10) {
        // we are done loading users if the result is smaller than the limit
        this.loaderDisabled = true;
        this.showLoaderButton = false;
      }

      this.offset += 10;

      const preparedResult: IPreparedUser[] = [];
      const users = result.data.userManyLean;

      for (const user of users) {
        const categories = [];
        const wishLists = [];

        let data = {} as IPreparedUser;

        if (user.categories) {
          for (const category of user.categories) {
            categories.push({
              name: category.name,
            });
          }
        }

        for (const list of user.wishLists) {
          wishLists.push({
            link: list.link,
            description: list.description,
            categories,
          });
        }

        data = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image || 'anime-away-face-no-nobody-spirited_113254.svg',
          wishLists,
        };

        preparedResult.push(data);
      }

      this.loaderDisabled = true;

      this.users.push(...preparedResult);
    } catch (error) {
      console.error(error);
      this.loaderDisabled = true;
    }
  }
}
</script>
