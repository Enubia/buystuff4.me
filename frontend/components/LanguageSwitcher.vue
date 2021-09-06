<template>
  <VDropDown placement="left">
    <!-- Button content -->
    <template #button>
      <span
        class="
          px-1
          py-2
          border border-gray-200
          rounded
          inline-flex
          items-center
          text-sm
          bg-gray-200
        "
      >
        <span
          :class="`mr-2 ml-2 flag-icon flag-icon-${currentLocale.ico}`"
        ></span>
        <!-- <span class="mr-2 ml-2">{{ currentLocale.name }}</span> -->
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z"
          />
        </svg>
      </span>
    </template>
    <!-- Opened dropdown content -->
    <template #content>
      <nuxt-link
        v-for="locale in $availableLocales"
        :key="locale.code"
        class="drop-down-item"
        :to="switchLocalePath(locale.code)"
        @click.native="updateLocale(locale)"
      >
        <span :class="`flag-icon flag-icon-${locale.ico}`"></span>
        <span>{{ locale.name }}</span>
      </nuxt-link>
    </template>
  </VDropDown>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import VDropDown from './V-DropDown.vue';

interface ILocale {
  code: string;
  file: string;
  iso: string;
  name: string;
  ico: string;
}

@Component({
  components: { VDropDown },
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

<style scoped lang="scss">
.drop-down-item {
  @apply flex
  w-full
  justify-between
  items-center
  rounded
  px-2
  py-1
  my-1
  hover:bg-accent-600 hover:text-white;
}
</style>
