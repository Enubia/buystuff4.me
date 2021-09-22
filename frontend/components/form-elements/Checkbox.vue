<template>
  <div class="my-1 mx-0.5 px-5 py-1 card bg-accent-focus">
    <div class="form-control">
      <label class="cursor-pointer label text-center" @mouseup="checkboxTicked">
        <span class="label-text capitalize">{{ label }}</span>
        <input
          :id="id"
          ref="checkbox"
          type="checkbox"
          :name="name"
          :value="value"
          class="checkbox checkbox-primary"
        />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'Checkbox',
})
export default class Checkbox extends Vue {
  @Prop({ type: String, required: true }) id!: string;

  @Prop({ type: String, required: true }) name!: string;

  @Prop({ type: String, required: true }) value!: string;

  @Prop({ type: String, required: true }) label!: string;

  checkboxTicked() {
    const checkbox = <HTMLInputElement>this.$refs.checkbox;

    if (!checkbox.checked) {
      this.$store.commit('search/addCategoryToFilter', {
        name: this.name,
        _id: this.value,
      });
    } else {
      this.$store.commit('search/removeCategoryFromFilter', this.value);
    }
  }
}
</script>
