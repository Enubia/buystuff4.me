<template>
  <div
    class="flex justify-center min-h-full bg-gray-100 sm:items-center sm:pt-0"
  >
    <div class="m-1">
      <img
        class="w-64 h-64"
        src="../assets/svg/Complete_RisaruDesign_Logo_BK_transparent.svg"
        alt="risaru"
      />
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
