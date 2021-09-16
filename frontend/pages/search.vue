<template>
  <div>
    <CategorySearch @search="applyCategories" />
    <SearchResult />
  </div>
</template>

<script lang="ts">
// TODO: split up filter and standard query into separate components
// issue is due to apollo caching
import { Component, Vue } from 'nuxt-property-decorator';
import CategorySearch from '../components/search/CategorySearch.vue';
import SearchResult from '../components/search/SearchResult.vue';

@Component({
  name: 'Search',
  components: { SearchResult, CategorySearch },
})
export default class Search extends Vue {
  async applyCategories() {
    console.log('-------------------');
  }
}
</script>
