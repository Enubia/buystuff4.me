<template>
  <div v-if="categories.length > 0">
    <div class="w-full flex justify-end mt-3 mb-3">
      <div class="flex items-center">
        <button class="btn btn-sm mr-4" @click="applyFilter">
          {{
            filter.length > 0
              ? $t('search.category.apply')
              : $t('search.category.reset')
          }}
        </button>
        <div class="form-control mr-6">
          <label class="cursor-pointer label" @click="showFilter = !showFilter">
            <span class="label-text mr-2">
              {{ $t('search.category.filter') }}
            </span>
            <input
              type="checkbox"
              class="toggle toggle-primary"
              :checked="showFilter"
            />
          </label>
        </div>
      </div>
    </div>
    <div :class="!showFilter ? 'hidden' : ''" class="mx-4 mb-4">
      <div class="flex flex-wrap justify-evenly mt-2">
        <Checkbox
          v-for="category in categories"
          :id="category._id"
          :key="category._id"
          :name="category.name"
          :label="category.name"
          :value="category._id"
          class="w-full md:w-1/3 lg:w-1/5"
          :alt="category.name"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Checkbox from '../form-elements/Checkbox.vue';
import { SearchRootState } from '../../store/search';

@Component({
  name: 'CategorySearch',
  components: {
    Checkbox,
  },
})
export default class CategorySearch extends Vue {
  categories: { _id: string; name: string }[] = [];

  showFilter = false;

  get filter() {
    return (this.$store.state.search as SearchRootState).searchFilter;
  }

  async mounted() {
    if (this.categories.length > 0) {
      return;
    }

    await this.$store.dispatch('search/fetchCategories');
    this.categories = (this.$store.state.search as SearchRootState).categories;
  }

  applyFilter() {
    this.$emit('search');
  }
}
</script>
