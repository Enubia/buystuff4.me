<template>
  <footer class="fixed bottom-0 w-full bg-gray-700 grid text-gray-300">
    <div class="w-full flex inline p-3">
      <div class="w-2/3 flex justify-end">
        <div class="md:flex w-full md:text-center">
          <div class="link-wrapper">
            <NuxtLink class="link" :to="localePath('about')">
              {{ $t('about') }}
            </NuxtLink>
          </div>
          <div class="link-wrapper">
            <NuxtLink class="link" :to="localePath('how-to')">
              {{ $t('howTo') }}
            </NuxtLink>
          </div>
          <div class="link-wrapper">
            <NuxtLink class="link" :to="localePath('faq')">
              {{ $t('faq') }}
            </NuxtLink>
          </div>
          <div class="link-wrapper">
            <NuxtLink class="link" :to="localePath('privacy-policy')">
              {{ $t('privacyPolicy') }}
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <div class="py-1 flex justify-center">
          <a
            href="https://github.com/enubia/buystuff4.me"
            target="_blank"
            class="link"
          >
            <img
              class="h-8"
              src="../assets/images/GitHub-Mark-Light-64px.png"
              alt="Github Logo"
            />
          </a>
        </div>
        <div class="md:w-full py-1 grid text-center">
          <span class="text-sm">
            &#169; {{ new Date().getFullYear() }} Marco Schuster
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'Footer',
})
export default class Footer extends Vue {}
</script>

<style scoped lang="scss">
.link-wrapper {
  @apply md:w-1/6 py-1 grid content-center;
  .link {
    @apply hover:text-highlight-700 hover:underline;
  }
}
</style>
