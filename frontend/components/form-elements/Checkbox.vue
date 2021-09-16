<template>
  <div class="my-1 mx-0.5 px-5 py-1 card shadow">
    <div class="form-control">
      <label
        class="cursor-pointer label text-center"
        @click="$emit('checkbox-ticked', { name, value: $refs.checkbox.value })"
      >
        <span class="label-text">{{ label }}</span>
        <input
          :id="id"
          ref="checkbox"
          type="checkbox"
          :name="name"
          :value="value"
          class="checkbox checkbox-secondary"
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
}
</script>
