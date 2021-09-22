<template>
  <div>about page</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'About',
})
export default class About extends Vue {
  head() {
    return {
      title: 'buystuff4.me | About',
    };
  }
}
</script>
