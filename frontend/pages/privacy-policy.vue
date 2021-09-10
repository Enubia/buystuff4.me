<template>
  <div
    class="
      px-4
      py-16
      mx-auto
      sm:max-w-xl
      md:max-w-full
      lg:max-w-screen-xl
      md:px-24
      lg:px-14 lg:py-20
    "
  >
    <div v-for="(item, index) of $t('privacyPolicy.sections')" :key="index">
      <div v-html="item.title" />
      <div v-html="item.block" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'PrivacyPolicy',
})
export default class PrivacyPolicy extends Vue {}
</script>
