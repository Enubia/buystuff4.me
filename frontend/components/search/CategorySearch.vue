<template>
  <div>
    <div class="hidden lg:w-full lg:flex lg:justify-end lg:mt-3">
      <div class="form-control mr-6">
        <label class="cursor-pointer label" @click="showFilter = !showFilter">
          <span class="label-text mr-2">Filter</span>
          <input type="checkbox" class="toggle toggle-primary" />
        </label>
      </div>
    </div>
    <div v-if="showFilter" class="mx-4">
      <div class="flex flex-wrap justify-evenly mt-2">
        <Checkbox
          v-for="category in categories"
          :id="category._id"
          :key="category._id"
          :name="category.name"
          :label="category.name"
          :value="category._id"
          class="w-1/6"
          :alt="category.name"
          @checkbox-ticked="pushCategory"
        />
      </div>
      <div class="w-full flex justify-end mt-3">
        <button class="btn btn-sm btn-secondary mr-4" @click="applyFilter">
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// TODO: use global store to save all selected categories instead of emitting them
import { Component, Vue } from 'nuxt-property-decorator';
import gql from 'graphql-tag';
import Checkbox from '../form-elements/Checkbox.vue';

@Component({
  name: 'CategorySearch',
  components: {
    Checkbox,
  },
})
export default class CategorySearch extends Vue {
  categories: { _id: string; name: string }[] = [];

  showFilter = false;

  async mounted() {
    if (this.categories.length > 0) {
      return;
    }

    try {
      const result = await this.$apollo.query({
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

  pushCategory(value: { name: string; value: string }) {
    console.log(value);
  }

  applyFilter() {
    this.showFilter = false;
    this.$emit('search');
  }
}
</script>
