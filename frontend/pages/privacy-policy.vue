<template>
  <div
    class="
      px-4
      py-16
      mx-auto
      sm:max-w-xl
      md:max-w-full
      lg:max-w-screen-xl
      md:px-24
      lg:px-14 lg:py-20
    "
  >
    <div v-for="(item, index) of sections" :key="index">
      <div v-html="item.title" />
      <div v-html="item.block" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LocaleMessages } from 'vue-i18n';

@Component({
  name: 'PrivacyPolicy',
})
export default class PrivacyPolicy extends Vue {
  sections = this.$t('privacyPolicy.sections') as LocaleMessages;

  head() {
    return {
      title: 'buystuff4.me | Privacy Policy',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('privacyPolicy.meta.content'),
        },
      ],
    };
  }
}
</script>
