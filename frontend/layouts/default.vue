<template>
  <div>
    <NavBar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';

@Component({
  name: 'Layout',
  components: { Footer, NavBar },
})
export default class extends Vue {}
</script>
