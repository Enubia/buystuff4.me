<template>
  <div class="p-4">
    <div
      class="flex items-center"
      @mouseup="$emit('checkbox-ticked', { name, value: $refs.checkbox.value })"
    >
      <input
        :id="id"
        ref="checkbox"
        type="checkbox"
        :name="name"
        :value="value"
        class="opacity-0 absolute h-8 w-8"
      />
      <div
        class="
          bg-white
          border-2
          rounded-md
          border-accent-400
          w-6
          h-6
          flex flex-shrink-0
          justify-center
          items-center
          mr-2
          focus-within:border-accent-500
        "
      >
        <svg
          class="
            fill-current
            hidden
            w-3
            h-3 h-border-accent-500
            pointer-events-none
          "
          version="1.1"
          viewBox="0 0 17 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(-9 -11)" fill="#9F71DB" fill-rule="nonzero">
              <path
                d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"
              />
            </g>
          </g>
        </svg>
      </div>
      <label :for="id" class="select-none">{{ label }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'V-Checkbox',
})
export default class VCheckbox extends Vue {
  @Prop({ type: String, required: true }) id!: string;

  @Prop({ type: String, required: true }) name!: string;

  @Prop({ type: String, required: true }) value!: string;

  @Prop({ type: String, required: true }) label!: string;
}
</script>

<style scoped lang="scss">
input {
  &:checked {
    + {
      div {
        @apply border-accent-500;
        svg {
          @apply block;
        }
      }
    }
  }
}
</style>
