<template>
  <div class="relative">
    <button
      class="z-10 relative flex items-center focus:outline-none select-none"
      @click="open = !open"
    >
      <slot name="button"></slot>
    </button>

    <!-- to close when clicked on space around it in desktop-->
    <button
      v-if="open"
      class="fixed inset-0 h-full w-full cursor-default focus:outline-none"
      tabindex="-1"
      @click="open = false"
    ></button>
    <!--dropdown content: desktop-->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-750 ease-in"
      enter-class="opacity-0 scale-75"
      enter-to-class="opacity-100 scale-100"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
    >
      <div
        v-if="open"
        class="drop-down-select"
        :class="placement === 'right' ? 'right-0' : 'left-0'"
      >
        <slot name="content"></slot>
      </div>
    </transition>

    <!--dropdown content: mobile-->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-750 ease-in"
      enter-class="opacity-0 scale-75"
      enter-to-class="opacity-100 scale-100"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
    >
      <div v-if="open" class="drop-down-items">
        <slot name="content"></slot>
      </div>
    </transition>
    <!-- to close when clicked on space around it in mobile-->
    <div
      v-if="open"
      class="md:hidden fixed w-full h-full inset-0 bg-gray-900 opacity-50 z-10"
      @click="open = false"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'V-DropDown',
})
export default class VDropDown extends Vue {
  @Prop({
    type: String,
    default: 'right',
    validator: (value) => ['right', 'left'].includes(value),
  })
  placement!: string;

  open = false;

  mounted() {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.open = false;
      }
    };

    document.addEventListener('keydown', onEscape);

    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', onEscape);
    });
  }
}
</script>

<style scoped lang="scss">
.drop-down {
  &-select {
    @apply hidden
    md:block
    absolute
    shadow-lg
    border
    w-48
    max-h-36
    overflow-y-auto
    rounded
    py-1
    px-2
    text-sm
    mt-2
    bg-white;
  }

  &-items {
    @apply md:hidden
    fixed
    inset-x-0
    bottom-0
    bg-white
    w-full
    z-20
    px-2
    py-2
    shadow-2xl
    leading-loose;
  }
}
</style>
