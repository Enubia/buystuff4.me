<template>
  <div
    class="justify-center min-h-full bg-gray-100 sm:items-center sm:pt-0"
  ></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';
import Checkbox from '../components/Checkbox.vue';
import Input from '../components/Input.vue';
import Alert from '../components/Alert.vue';

@Component({
  name: 'Index',
  components: { Alert, Input, Checkbox, LanguageSwitcher },
})
export default class extends Vue {
  processCheckbox(value: { name: string; value: string }) {
    console.log(value);
  }
}
</script>
