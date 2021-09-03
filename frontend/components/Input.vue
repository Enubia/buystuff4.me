<template>
  <label class="block">
    <span v-if="label" class="text-gray-700">{{ label }}</span>
    <input :type="inputType" @change="dataChange($event.target.value)" />
  </label>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'Input',
})
export default class Input extends Vue {
  @Prop({ type: String || undefined }) label?: string;

  @Prop({ type: String, default: 'text' }) inputType!: string;

  dataChange(value: string) {
    this.$emit('input-data-change', value.trim());
  }
}
</script>

<style scoped>
input {
  @apply rounded
    focus:ring focus:ring-accent-500 focus:ring-opacity-50
    border-gray-300
    shadow-sm
    focus:border-accent-200
    w-full;
}
</style>
