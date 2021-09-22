<template>
  <div class="nuxt-error">
    <component :is="errorPage" :error="error" />
  </div>
</template>
<script>
import Error404 from '~/components/error/404.vue';
import Error500 from '~/components/error/500.vue';

export default {
  name: 'NuxtError',
  layout: 'default', // optional
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    errorPage() {
      if (this.error.statusCode === 404) {
        return Error404;
      } // catch everything else
      return Error500;
    },
  },
};
</script>
