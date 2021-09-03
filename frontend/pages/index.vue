<template>
  <div
    class="flex justify-center min-h-full bg-gray-100 sm:items-center sm:pt-0"
  >
    <Button />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';

@Component({
  name: 'Index',
  components: {
    Input,
    Button,
  },
})
export default class extends Vue {}
</script>
