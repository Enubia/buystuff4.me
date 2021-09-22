<template>
  <div class="w-full flex justify-center mt-8 mb-8 md:mt-36 md:mb-36">
    <div class="flex flex-col lg:flex-row lg:max-w-6xl">
      <div
        class="
          lg:w-1/3
          p-4
          text-sm
          lg:relative lg:sticky lg:top-28 lg:left-0 lg:h-1/4
        "
      >
        <div class="text-3xl" v-html="$t('faq.title')" />
      </div>
      <div class="lg:w-2/3">
        <div class="p-4">
          <div
            v-for="(item, index) of $t('faq.questions')"
            :key="index"
            class="my-8 collapse border-b border-base-300 collapse-arrow"
          >
            <input type="checkbox" />
            <div
              class="collapse-title text-xl font-medium"
              v-html="item.title"
            />
            <div class="collapse-content" v-html="item.body" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'Faq',
})
export default class Faq extends Vue {
  head() {
    return {
      title: 'buystuff4.me | FAQ',
    };
  }
}
</script>
