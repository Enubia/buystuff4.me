<template>
  <div class="form-control">
    <label class="label">
      <span v-if="label">{{ label }}</span>
    </label>
    <input
      v-if="inputType === 'url'"
      ref="urlLink"
      v-model="inputValue"
      :type="inputType"
      :pattern="urlPattern"
      :disabled="disabled"
      placeholder="https://www.amazon.de/hz/wishlist/ls/A0HIAAQDEIOV?ref_=wl_share"
      class="input input-bordered"
      @focusout="verifyUrl"
    />
    <input
      v-else
      v-model="inputValue"
      :type="inputType"
      :disabled="disabled"
      class="input input-bordered"
      @keyup="dataChange"
    />
    <label v-if="urlInputError || parentValidateError" class="label">
      <span class="text-xs text-red-500">
        {{ urlInputError ? "URL doesn't match pattern!" : 'No input given!' }}
      </span>
    </label>
  </div>
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

  @Prop({
    type: String,
    default: '',
  })
  defaultValue!: string;

  @Prop({ type: Boolean, default: false }) disabled!: boolean;

  @Prop({ type: Boolean, default: false }) parentValidateError!: boolean;

  @Ref('urlLink') urlLink!: Element & { value: string };

  // https://regex101.com/r/AISC65/1
  urlPattern =
    /(https:\/\/)([w]{3}.amazon.[a-z]{2})(\/[a-z]{2})(\/wishlist)(\/[a-z]{2})(\/[A-Z\d]+)(\?ref_=wl_share)/;

  inputValue = this.defaultValue;

  urlInputError = false;

  validateError = this.parentValidateError;

  dataChange() {
    this.$emit('input-data-change', this.inputValue.trim());
  }

  verifyUrl() {
    const { value } = this.urlLink;

    if (value !== '') {
      if (!String(value.trim()).match(this.urlPattern)) {
        this.urlLink.classList.add('input-error');
        this.urlInputError = true;
      } else {
        this.urlLink.classList.remove('input-error');
        this.urlLink.classList.add('input-success');
        this.urlInputError = false;
        this.validateError = false;
        this.$emit('reset-error');
        this.dataChange();
      }
    } else {
      this.urlLink.classList.remove('input-error');
      this.urlInputError = false;
      this.validateError = false;
      this.$emit('reset-error');
    }
  }
}
</script>
