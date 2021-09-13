<template>
  <VDropDown placement="right" width="w-max">
    <!-- Button content -->
    <template #button>
      <span
        class="
          px-1
          py-2
          border border-gray-200
          rounded
          inline-flex
          items-center
          text-sm
          bg-gray-200
        "
      >
        <span class="mr-2 ml-2"> Select categories </span>
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z"
          />
        </svg>
      </span>
    </template>
    <!-- Opened dropdown content -->
    <template #content>
      <Checkbox
        v-for="category in categories"
        :id="category._id"
        :key="category._id"
        class=""
        :name="category.name"
        :label="category.name"
        :value="category._id"
        :alt="category.name"
        @checkbox-ticked="applyFilter"
      />
    </template>
  </VDropDown>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import gql from 'graphql-tag';
import VDropDown from '../form-elements/V-DropDown.vue';
import Checkbox from '../form-elements/Checkbox.vue';

@Component({
  components: { Checkbox, VDropDown },
})
export default class LanguageSwitcher extends Vue {
  @Prop({ type: Array, default: [] }) selectedCategories!: string[];

  client = this.$apollo.getClient();

  categories: { _id: string; name: string }[] = [];

  async mounted() {
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

  async applyFilter(id: string) {
    if (this.selectedCategories.includes(id)) {
      this.selectedCategories.splice(this.selectedCategories.indexOf(id), 1);
    } else {
      this.selectedCategories.push(id);
    }

    this.$emit('apply-filter', {
      useOffset: false,
      listIds: this.selectedCategories,
    });
  }
}
</script>

<style scoped lang="scss">
.drop-down-item {
  @apply flex
  w-full
  justify-between
  items-center
  rounded
  px-2
  py-1
  my-1
  hover:bg-deep-purple-accent-100 hover:text-white;
}
</style>
