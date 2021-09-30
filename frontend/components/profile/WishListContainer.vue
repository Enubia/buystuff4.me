<template>
  <div class="w-full">
    <div
      v-for="list of wishLists"
      :key="list._id"
      class="card border rounded border-base-300 bg-base-100 my-3"
    >
      <div class="card-body">
        <Input
          label="Wishlist link"
          input-type="url"
          :default-value="list.link"
          :disabled="true"
          class="w-full lg:w-2/3"
        />
        <div class="flex flex-wrap">
          <div
            v-for="(category, category_index) of list.categories"
            :key="category_index"
            class="badge badge-primary mt-4 mx-1 capitalize"
          >
            {{ category.name }}
          </div>
        </div>
        <div class="flex justify-end">
          <button class="btn btn-md btn-ghost" @click="deleteList(list._id)">
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

@Component({
  name: 'WishListContainer',
  components: {
    Input,
  },
})
export default class WishListContainer extends Vue {
  @Prop({ type: Array, default: [] }) wishLists!: {
    _id: string;
    link: string;
    description: string;
    categoryIds: string[];
    categories: {
      name: string;
    }[];
  }[];

  async deleteList(id: string) {
    try {
      await this.$store.dispatch('profile/deleteList', id);
      this.$toast.open({
        message: 'List deleted!',
        position: 'top-right',
        type: 'success',
      });
    } catch (error) {
      console.error(error);
      this.$toast.open({
        message: 'Failed to delete list!',
        position: 'top-right',
        type: 'error',
      });
    }
  }
}
</script>
