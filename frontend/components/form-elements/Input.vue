<template>
  <label class="block">
    <span v-if="label" class="text-gray-700">{{ label }}</span>
    <input
      v-if="inputType === 'url'"
      ref="urlLink"
      v-model="inputValue"
      :type="inputType"
      :pattern="urlPattern"
      placeholder="https://www.amazon.de/hz/wishlist/ls/A0HIAAQDEIOV?ref_=wl_share"
      class="input-primary"
      @focusout="verifyUrl"
    />
    <input
      v-else
      v-model="inputValue"
      :type="inputType"
      class="input-primary"
      @change="dataChange"
    />
  </label>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'nuxt-property-decorator';

@Component({
  name: 'Input',
})
export default class Input extends Vue {
  @Prop({ type: String || undefined }) label?: string;

  @Prop({
    type: String,
    default: 'text',
    validator: (value) => ['text', 'date', 'url'].includes(value),
  })
  inputType!: string;

  @Ref('urlLink') urlLink!: Element;

  // https://regex101.com/r/AISC65/1
  urlPattern =
    /(https:\/\/)([w]{3}.amazon.[a-z]{2})(\/[a-z]{2})(\/wishlist)(\/[a-z]{2})(\/[A-Z\d]+)(\?ref_=wl_share)/;

  inputValue = '';

  dataChange() {
    this.$emit('input-data-change', this.inputValue.trim());
  }

  verifyUrl() {
    const { value }: any = this.urlLink;

    if (value !== '') {
      if (!String(value.trim()).match(this.urlPattern)) {
        this.urlLink.classList.remove('input-primary');
        this.urlLink.classList.add('input-error');
      } else {
        this.urlLink.classList.remove('error');
        this.urlLink.classList.add('input-primary');
        this.dataChange();
      }
    } else {
      this.urlLink.classList.remove('input-error');
    }
  }
}
</script>
