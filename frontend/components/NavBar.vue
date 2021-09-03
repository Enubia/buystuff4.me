<template>
  <div class="flex justify-center text-black"><p>Navbar Component</p></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'NavBar',
})
export default class NavBar extends Vue {}
</script>
