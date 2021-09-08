<template>
  <div class="min-w-full h-screen">
    <header>
      <KitWindNav />
    </header>
    <main>
      <Nuxt />
    </main>
    <footer>
      <KitWindFooter />
    </footer>
    <client-only>
      <CookieBanner />
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import KitWindNav from '../components/kitwind/KitWindNav.vue';
import KitWindFooter from '../components/kitwind/KitWindFooter.vue';
import CookieBanner from '../components/CookieBanner.vue';

@Component({
  name: 'Layout',
  components: { KitWindFooter, KitWindNav, CookieBanner },
})
export default class extends Vue {}
</script>
