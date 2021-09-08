<template>
  <div class="min-w-full h-screen">
    <header>
      <NavBar />
    </header>
    <main>
      <Nuxt />
    </main>
    <footer class="fixed bottom-0 w-full bg-gray-700 grid text-gray-300">
      <Footer />
    </footer>
    <client-only>
      <CookieBanner />
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import CookieBanner from '../components/CookieBanner.vue';

@Component({
  name: 'Layout',
  components: { Footer, NavBar, CookieBanner },
})
export default class extends Vue {}
</script>
