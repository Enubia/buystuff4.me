<template>
  <div>
    <CategorySearch @search="fetchWishlistsWithCategoryFilter" />
    <div v-if="wishLists.length > 0" class="md:flex md:flex-wrap w-full mb-4">
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
          {{ $t('search.loadMoreButton') }}
        </button>
      </div>
    </div>
    <div v-else class="md:flex md:flex-wrap w-full mb-4">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { SearchRootState } from 'store/search';
import CategorySearch from '../components/search/CategorySearch.vue';
import Card from '../components/search/Card.vue';

@Component({
  name: 'Search',
  components: { CategorySearch, Card },
})
export default class Search extends Vue {
  sampleCards = new Array(9);

  offset = 0;

  loaderDisabled = true;

  showLoaderButton = true;

  get wishLists() {
    return (this.$store.state.search as SearchRootState).wishLists;
  }

  get searchFilter() {
    return (this.$store.state.search as SearchRootState).searchFilter;
  }

  async mounted() {
    if (this.wishLists.length > 0) {
      return;
    }

    await this.getWishLists();
  }

  async getWishLists(useOffset = false) {
    try {
      this.loaderDisabled = false;

      await this.$store.dispatch('search/fetchWishLists', {
        useOffset,
        offset: this.offset,
      });

      this.offset += 9;

      this.loaderDisabled = true;

      if (this.wishLists.length < 9) {
        // we are done loading users if the result is smaller than the limit
        this.loaderDisabled = true;
        this.showLoaderButton = false;
      }
    } catch (error) {
      console.error(error);
      this.loaderDisabled = true;
    }
  }

  async fetchWishlistsWithCategoryFilter() {
    try {
      this.loaderDisabled = false;

      if (
        (this.$store.state.search as SearchRootState).searchFilter.length === 0
      ) {
        this.$store.commit('search/reset');
        await this.$store.dispatch('search/fetchWishLists', {
          useOffset: false,
          offset: this.wishLists.length >= 9 ? this.offset : 0,
        });
        this.showLoaderButton = true;
      } else {
        await this.$store.dispatch('search/fetchWishlistsWithCategoryFilter');
      }

      this.loaderDisabled = true;

      if (this.wishLists.length < 9) {
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
