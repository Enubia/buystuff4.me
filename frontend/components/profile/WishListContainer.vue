<template>
  <div class="w-full">
    <div
      v-for="(list, index) of wishLists"
      :key="index"
      class="card border rounded border-base-300 bg-base-100 my-2"
    >
      <div class="card-body flex justify-center">
        <Input
          label="Wishlist link"
          input-type="url"
          :default-value="list.link"
          class="lg:w-2/3"
        />
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
    link: string;
    description: string;
    categoryIds: string[];
    categories: {
      name: string;
    };
  }[];
}
</script>
