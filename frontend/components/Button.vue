<template>
  <div class="m-1">
    <button
      v-if="type === 'primary'"
      :class="classes"
      class="bg-primary-500 hover:bg-primary-700"
    >
      <span>{{ name }}</span>
    </button>
    <button
      v-else-if="type === 'secondary'"
      :class="classes"
      class="bg-secondary-500 hover:bg-secondary-700"
    >
      <span>{{ name }}</span>
    </button>
    <button
      v-else-if="type === 'accent'"
      :class="classes"
      class="bg-accent-500 hover:bg-accent-700"
    >
      <span>{{ name }}</span>
    </button>
    <button
      v-else
      :class="classes"
      class="bg-highlight-500 hover:bg-highlight-700"
    >
      <span>{{ name }}</span>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'Button',
})
export default class Button extends Vue {
  @Prop({ type: String, default: 'Button without name' }) name?: string;

  @Prop({ type: String, default: '' }) classes?: string;

  @Prop({ type: String, default: 'secondary' }) type!: string;
}
</script>
<style scoped>
button {
  @apply p-2 rounded text-white;
}
</style>
