<template>
  <div
    v-if="isOpen"
    class="
      fixed
      bottom-0
      left-0
      sm:flex-wrap
      md:flex
      items-center
      p-4
      bg-gray-100
      shadow-sm
      justify-center
      w-full
    "
  >
    <div class="flex items-center justify-center">
      <img
        class="h-10 w-10 leading-none max-w-min"
        src="../assets/svg/cookie.svg"
        alt="Cookie banner icon"
      />
      <div class="md:mr-8 ml-3 text-center">
        <p>
          {{ $t('cookieBanner.start') }}
          <nuxt-link
            class="text-highlight-700 underline"
            :to="localePath('privacy-policy')"
          >
            {{ $t('cookieBanner.link') }}
          </nuxt-link>
          {{ $t('cookieBanner.end') }}
        </p>
      </div>
    </div>
    <div class="flex justify-center mt-4 md:mt-0">
      <div class="btn-highlight ml-2" @click="accept">
        {{ $t('cookieBanner.yes') }}
      </div>
      <div class="btn-secondary ml-2" @click="deny">
        {{ $t('cookieBanner.no') }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { bootstrap } from 'vue-gtag';

@Component({
  name: 'CookieBanner',
})
export default class CookieBanner extends Vue {
  isOpen = false;

  created() {
    if (!this.getGDPR()) {
      this.isOpen = true;
    }
  }

  async accept() {
    if (process.browser) {
      await bootstrap();
      this.isOpen = false;
      localStorage.setItem('GDPR:accepted', 'true');
    }
  }

  deny() {
    if (process.browser) {
      this.isOpen = false;
      localStorage.setItem('GDPR:accepted', 'false');
    }
  }

  getGDPR() {
    if (!process.browser) {
      return false;
    }
    return localStorage.getItem('GDPR:accepted');
  }
}
</script>
