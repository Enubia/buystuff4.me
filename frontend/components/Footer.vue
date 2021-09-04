<template>
  <div class="flex bg-accent-800 grid text-gray-300">
    <div class="w-full flex inline p-3">
      <div class="w-2/3 flex">
        <div class="md:flex w-full md:text-center">
          <div class="md:w-2/5 py-1 grid content-center">
            <span class="text-sm">
              &#169; {{ new Date().getFullYear() }} Marco Schuster
            </span>
          </div>
          <div class="link-wrapper">
            <NuxtLink class="link" to="/about">About</NuxtLink>
          </div>
          <div class="link-wrapper">
            <NuxtLink class="link" to="/how-to">How to</NuxtLink>
          </div>
          <div class="link-wrapper">
            <NuxtLink class="link" to="/faq">FAQ</NuxtLink>
          </div>
          <div class="link-wrapper">
            <NuxtLink class="link" to="/privacy-policy">
              Privacy Policy
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
      </div>
    </div>
  </div>
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
