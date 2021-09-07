<template>
  <label class="block">
    <span v-if="label" class="text-gray-700">{{ label }}</span>
    <input
      v-if="inputType === 'url'"
      ref="urlLink"
      :type="inputType"
      :pattern="urlPattern"
      placeholder="https://www.amazon.de/hz/wishlist/ls/A0HIAAQDEIOV?ref_=wl_share"
      @focusout="verifyUrl"
    />
    <input v-else :type="inputType" @change="dataChange($event.target.value)" />
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

  dataChange(value: string) {
    this.$emit('input-data-change', value.trim());
  }

  verifyUrl() {
    const { value }: any = this.urlLink;

    if (value !== '') {
      if (!String(value.trim()).match(this.urlPattern)) {
        this.urlLink.classList.add('error');
      } else {
        this.urlLink.classList.remove('error');
        this.dataChange(value);
      }
    } else {
      this.urlLink.classList.remove('error');
    }
  }
}
</script>

<style scoped lang="scss">
input {
  @apply rounded
  focus:ring focus:ring-accent-500 focus:ring-opacity-50
  border-gray-300
  shadow-sm
  focus:border-accent-200
  w-full;
}

.error {
  @apply rounded
  ring ring-red-400 focus:ring-opacity-50
  shadow-sm
  border-red-400;
}
</style>
