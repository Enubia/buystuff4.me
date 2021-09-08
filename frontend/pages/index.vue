<template>
  <div>
    <KitWindHeader />
    <KitWindSteps />
    <KitWindStats />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';
import Checkbox from '../components/Checkbox.vue';
import Input from '../components/Input.vue';
import Alert from '../components/Alert.vue';
import KitWindStats from '../components/kitwind/index/KitWindStats.vue';
import KitWindSteps from '../components/kitwind/index/KitWindSteps.vue';
import KitWindHeader from '../components/kitwind/index/KitWindHeader.vue';

@Component({
  name: 'Index',
  layout: 'kitwind',
  components: {
    KitWindHeader,
    KitWindSteps,
    KitWindStats,
    Alert,
    Input,
    Checkbox,
    LanguageSwitcher,
  },
})
export default class extends Vue {}
</script>
