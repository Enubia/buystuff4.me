<template>
  <div class="w-full">
    <div
      v-for="(list, index) of wishLists"
      :key="index"
      class="card border rounded border-base-300 bg-base-100 my-2"
    >
      <div class="card-body">
        <div class="flex">
          <Input
            label="Wishlist link"
            input-type="url"
            :default-value="list.link"
            :disabled="true"
            class="w-full lg:w-2/3"
          />
        </div>
        <div class="flex flex-wrap">
          <div
            v-for="(cat, cat_index) of list.categories"
            :key="cat_index"
            class="badge badge-primary mt-4 mx-1 capitalize"
          >
            {{ cat.name }}
          </div>
        </div>
        <div class="flex justify-end">
          <button class="btn btn-ghost">
            <img
              class="h-8 w-8 cursor-pointer"
              src="../../assets/svg/trash.svg"
              alt="Trash can"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import Input from '../form-elements/Input.vue';

// TODO: add delete wishlist to trash can

@Component({
  name: 'WishListContainer',
  components: {
    Input,
  },
})
export default class WishListContainer extends Vue {
  @Prop({ type: Array, default: [] }) wishLists!: {
    link: string;
    description: string;
    categoryIds: string[];
    categories: {
      name: string;
    }[];
  }[];
}
</script>
