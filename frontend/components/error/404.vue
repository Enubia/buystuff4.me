<template>
  <div class="gradient text-white min-h-screen flex items-center">
    <div class="container mx-auto p-4 flex flex-wrap items-center">
      <div class="w-full text-center p-4">
        <div class="text-6xl font-medium">404</div>
        <div class="text-xl md:text-3xl font-medium mb-4">
          {{ $t('404.headline') }}
        </div>
        <div class="text-lg mb-8">
          {{ $t('404.info') }}
        </div>
        <nuxt-link
          :to="localePath('index')"
          class="border border-white rounded p-4 hover:bg-primary"
        >
          {{ $t('404.button') }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'Error404',
})
export default class Error404 extends Vue {
  @Prop({ type: Object, default: () => {} }) error;
}
</script>

<style scoped lang="scss">
.gradient {
  background-image: linear-gradient(
    135deg,
    theme('colors.primary') 35%,
    theme('colors.secondary') 100%
  );
}
</style>
