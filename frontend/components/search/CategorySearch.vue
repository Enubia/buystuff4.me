<template>
  <div>
    <div class="w-full flex justify-center mt-4">
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
    </div>
    <div v-if="showFilter" class="mx-4">
      <div class="flex flex-wrap">
        <Checkbox
          v-for="category in categories"
          :id="category._id"
          :key="category._id"
          :name="category.name"
          :label="category.name"
          :value="category._id"
          class="w-1/5"
          :alt="category.name"
          @checkbox-ticked="pushCategory"
        />
      </div>
      <div class="w-full flex justify-center">
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
          @click="$emit('search')"
        >
          Search
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
}
</script>
