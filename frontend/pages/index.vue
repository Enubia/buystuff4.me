<template>
  <div
    class="flex justify-center min-h-full bg-gray-100 sm:items-center sm:pt-0"
  >
    <div class="m-1">
      <button class="btn-accent">Button</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({
  name: 'Index',
  components: {},
})
export default class extends Vue {}
</script>
