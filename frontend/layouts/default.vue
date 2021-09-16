<template>
  <div class="min-w-full h-full">
    <header class="sticky top-0 z-20">
      <NavBar />
    </header>
    <main>
      <Nuxt />
    </main>
    <Footer />
    <client-only>
      <CookieBanner />
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import NavBar from '../components/layout/default/NavBar.vue';
import Footer from '../components/layout/default/Footer.vue';
import CookieBanner from '../components/layout/CookieBanner.vue';

@Component({
  name: 'Layout',
  components: { Footer, NavBar, CookieBanner },
})
export default class extends Vue {}
</script>
