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
import LanguageSwitcher from '../components/LanguageSwitcher.vue';
import Checkbox from '../components/Checkbox.vue';
import Input from '../components/Input.vue';
import Alert from '../components/Alert.vue';
import StatsSection from '../components/StatsSection.vue';
import HowToSteps from '../components/HowToSteps.vue';
import Header from '../components/Header.vue';

@Component({
  name: 'Index',
  components: {
    Header,
    HowToSteps,
    StatsSection,
    Alert,
    Input,
    Checkbox,
    LanguageSwitcher,
  },
})
export default class extends Vue {}
</script>
