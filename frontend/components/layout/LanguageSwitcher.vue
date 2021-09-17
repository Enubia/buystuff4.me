<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" class="btn btn-ghost">
      <span :class="`mr-2 ml-2 flag-icon flag-icon-${currentLocale.ico}`" />
    </div>
    <ul
      tabindex="0"
      class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
    >
      <li v-for="locale in $availableLocales" :key="locale.code">
        <nuxt-link
          :to="switchLocalePath(locale.code)"
          :alt="locale.name"
          @click.native="updateLocale(locale)"
        >
          <span :class="`flag-icon flag-icon-${locale.ico}`"></span>
          <span class="ml-2">{{ locale.name }}</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

interface ILocale {
  code: string;
  file: string;
  iso: string;
  name: string;
  ico: string;
}

@Component({
  components: {},
})
export default class LanguageSwitcher extends Vue {
  currentLocale: ILocale = {
    code: '',
    file: '',
    iso: '',
    name: '',
    ico: '',
  };

  mounted() {
    const { locale } = this.$i18n;
    [this.currentLocale] = (this.$i18n.locales as ILocale[]).filter(
      (item) => item.code === locale,
    );
  }

  updateLocale(locale: ILocale) {
    this.currentLocale = locale;
  }
}
</script>
