<template>
  <div>
    <div>Header</div>
    <Nuxt/>
    <div>Footer</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class extends Vue {}
</script>
