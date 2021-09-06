<template>
  <nav class="bg-primary-500 shadow-lg">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between">
        <div class="flex space-x-10">
          <!-- Website Logo -->
          <nuxt-link :to="localePath('/')" class="flex items-center py-4 px-2">
            <img
              src="../assets/svg/RisaruDesign_Logo_BK_transparent.svg"
              alt="Logo"
              class="h-20 w-20 mr-2"
            />
          </nuxt-link>
          <div class="flex items-center space-x-1">
            <h1 class="text-2xl text-gray-300">{{ $t('navbartitle') }}</h1>
          </div>
          <!-- Primary Navbar items -->
          <!-- <div class="hidden md:flex items-center space-x-1"> -->
          <!--   <nuxt-link :to="localePath('how-to')" class="main-menu-items"> -->
          <!--     {{ $t('howTo') }} -->
          <!--   </nuxt-link> -->
          <!--   <nuxt-link :to="localePath('about')" class="main-menu-items"> -->
          <!--     {{ $t('about') }} -->
          <!--   </nuxt-link> -->
          <!--   <nuxt-link :to="localePath('faq')" class="main-menu-items"> -->
          <!--     {{ $t('faq') }} -->
          <!--   </nuxt-link> -->
          <!-- </div> -->
        </div>
        <!-- Secondary Navbar items -->
        <div class="hidden md:flex items-center space-x-3">
          <nuxt-link
            class="btn-accent py-2 px-2 w-28"
            :to="localePath('sign-in')"
          >
            {{ $t('signIn') }}
          </nuxt-link>
        </div>
        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button class="outline-none mobile-menu-button" @click="toggleMenu">
            <svg
              class="w-6 h-6 text-gray-300 focus:text-highlight-800"
              x-show="!showMenu"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- mobile menu -->
    <div ref="mobile-menu" class="hidden">
      <ul>
        <li class="flex justify-center">
          <nuxt-link
            class="mb-2 text-base btn-accent py-2 px-2 w-28"
            :to="localePath('sign-in')"
          >
            {{ $t('signIn') }}
          </nuxt-link>
        </li>
        <!-- <li> -->
        <!--   <nuxt-link :to="localePath('how-to')" class="mobile-menu-items"> -->
        <!--     How To -->
        <!--   </nuxt-link> -->
        <!-- </li> -->
        <!-- <li> -->
        <!--   <nuxt-link :to="localePath('about')" class="mobile-menu-items"> -->
        <!--     About -->
        <!--   </nuxt-link> -->
        <!-- </li> -->
        <!-- <li> -->
        <!--   <nuxt-link :to="localePath('faq')" class="mobile-menu-items"> -->
        <!--     FAQ -->
        <!--   </nuxt-link> -->
        <!-- </li> -->
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'NavBar',
})
export default class NavBar extends Vue {
  toggleMenu() {
    (this.$refs['mobile-menu'] as Element).classList?.toggle('hidden');
  }
}
</script>

<style scoped lang="scss">
.main-menu-items {
  @apply py-4
  px-2
  text-gray-300
  font-semibold
  hover:text-highlight-700
  transition
  duration-300;
}

.mobile-menu-items {
  @apply block
  text-sm
  px-2
  py-4
  text-gray-300
  focus:bg-highlight-800
  transition
  duration-300;
}
</style>
