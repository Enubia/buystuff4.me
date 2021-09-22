<template>
  <div>
    <Header />
    <HowToSteps />
    <StatsSection />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import Header from '../components/index/Header.vue';
import HowToSteps from '../components/index/HowToSteps.vue';
import StatsSection from '../components/index/StatsSection.vue';

@Component({
  name: 'Index',
  components: {
    Header,
    HowToSteps,
    StatsSection,
  },
})
export default class extends Vue {
  head() {
    return {
      title: 'buystuff4.me | Home',
      meta: [{ hid: '', name: '', content: '' }],
    };
  }
}
</script>
