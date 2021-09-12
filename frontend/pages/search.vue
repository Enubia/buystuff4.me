<template>
  <div>
    <div v-if="users.length > 0" class="flex flex-wrap w-full">
      <div v-for="user in users" :key="user._id" class="px-2 w-1/3">
        <Card :user="user" />
      </div>
    </div>
    <div v-else class="flex flex-wrap w-full">
      <div v-for="item of sampleCards" :key="item" class="px-2 w-1/3">
        <ContentLoader
          :width="476"
          :height="124"
          :speed="2"
          primary-color="#f3f3f3"
          secondary-color="#ecebeb"
          class="
            max-w-md
            my-3
            mx-auto
            bg-white
            shadow-xl
            border
            rounded-xl
            border-gray-100
            md:max-w-2xl
          "
        >
          <rect x="117" y="21" rx="3" ry="3" width="127" height="9" />
          <rect x="117" y="101" rx="3" ry="3" width="352" height="12" />
          <circle cx="57" cy="65" r="53" />
          <rect x="117" y="78" rx="3" ry="3" width="352" height="12" />
          <rect x="117" y="44" rx="3" ry="3" width="127" height="9" />
        </ContentLoader>
      </div>
    </div>
    <client-only>
      <InfiniteScroll
        v-if="users.length > 0"
        :enough="false"
        class="flex justify-center w-full h-40"
        @load-more="getUsers(true)"
      >
        <template>
          <svg
            class="w-8 h-8 mr-3 border-0 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
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
          <span class="sr-only"> Loading...</span>
        </template>
      </InfiniteScroll>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import gql from 'graphql-tag';
import Card from '../components/search/Card.vue';
import { IPreparedUser } from '../types/IUser';
import InfiniteScroll from '../components/search/InfiniteScroll.vue';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ContentLoader } = require('vue-content-loader');

@Component({
  name: 'Search',
  components: { InfiniteScroll, Card, ContentLoader },
})
export default class Search extends Vue {
  sampleCards = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  client = this.$apollo.getClient();

  users: IPreparedUser[] = [];

  categories: { _id: string; name: string }[] = [];

  categoryFilter = [];

  offset = 10;

  useOffset = true;

  loaderDisabled = false;

  async mounted() {
    await this.getUsers(false);
  }

  async getUsers(useOffset?: boolean) {
    // TODO: fix user fetching, currently it pulls the same users over and over again
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

    const preparedResult = new Set<IPreparedUser>();
    const users = result.data.userManyLean;

    console.log(users);

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

      preparedResult.add(data);
    }

    this.users.push(...preparedResult);
  }
}
</script>
