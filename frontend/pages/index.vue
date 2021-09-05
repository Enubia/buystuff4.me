<template>
  <div
    class="flex justify-center min-h-full bg-gray-100 sm:items-center sm:pt-0"
  >
    <div class="m-1">
      <Checkbox
        id="test"
        name="test"
        label="Test checkbox to click"
        value="0"
        @checkbox-ticked="processCheckbox"
      />
      <LanguageSwitcher />
      <Input label="Text input" input-type="text" />
      <Input label="Date input" input-type="date" />
      <Input label="Url input" input-type="url" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';
import Checkbox from '../components/Checkbox.vue';
import Input from '../components/Input.vue';

@Component({
  name: 'Index',
  components: { Input, Checkbox, LanguageSwitcher },
})
export default class extends Vue {
  processCheckbox(value: { name: string; value: string }) {
    console.log(value);
  }
}
</script>
