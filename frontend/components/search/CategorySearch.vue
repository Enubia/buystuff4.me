<template>
  <div
    v-if="categories.length > 0"
    :class="showFilter ? 'category-container' : 'max-h-16'"
    class="w-full lg:flex lg:justify-end"
  >
    <div class="border rounded-md shadow-md border-base-200 px-4">
      <div class="w-full flex justify-center mt-3 mb-3">
        <div class="flex items-center">
          <div class="form-control mr-6">
            <label
              class="cursor-pointer label"
              @click="showFilter = !showFilter"
            >
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
          <button
            v-if="showFilter"
            class="btn btn-sm mr-4"
            @click="applyFilter"
          >
            {{
              filter.length > 0
                ? $t('search.category.apply')
                : $t('search.category.reset')
            }}
          </button>
        </div>
      </div>
      <div
        :class="!showFilter ? 'hidden' : 'lg:flex'"
        class="lg:w-full lg:justify-center"
      >
        <div
          class="
            px-4
            lg:max-h-96 lg:overflow-y-auto
            overflow-x-hidden
            mt-2
            mb-2
          "
        >
          <Checkbox
            v-for="category in categories"
            :id="category._id"
            :key="category._id"
            :name="category.name"
            :label="category.name"
            :value="category._id"
            class="w-full"
            :alt="category.name"
          />
        </div>
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

  showFilter = true;

  get filter() {
    return (this.$store.state.search as SearchRootState).searchFilter;
  }

  async mounted() {
    if (this.categories.length > 0) {
      return;
    }

    try {
      await this.$store.dispatch('search/fetchCategories');
    } catch (error) {
      console.error(error);
      this.$toast.open({
        message: 'Network Error, please try again later.',
        type: 'error',
        position: 'top-right',
      });
    }

    this.categories = (this.$store.state.search as SearchRootState).categories;
  }

  applyFilter() {
    this.$emit('search');
  }
}
</script>

<style scoped lang="scss">
.category-container {
  @media (min-width: 1024px) {
    max-height: 480px;
  }
}
</style>
