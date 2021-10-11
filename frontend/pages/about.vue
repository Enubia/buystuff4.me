<template>
  <div class="container mx-auto my-6">
    <h2 class="text-4xl font-medium text-center my-8 uppercase">
      {{ $t('about.project.header') }}
    </h2>
    <div class="flex justify-center">
      <div class="w-1/2">
        <p
          v-for="(item, index) of $t('about.project.items')"
          :key="index"
          class="my-3"
          v-html="item"
        ></p>
      </div>
    </div>
    <h2 class="text-4xl font-medium text-center my-8 uppercase">
      {{ $t('about.teamHeader') }}
    </h2>
    <div class="border border-base-200 shadow-md">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="max-h-96">
          <img
            class="w-full h-full object-cover"
            src="../assets/images/code.png"
            alt="Photo by Walkato on Unsplash"
          />
        </div>
        <div class="flex bg-base-200 p-10">
          <div class="mb-auto mt-auto max-w-lg">
            <h1 class="text-3xl uppercase">{{ $t('about.marco.name') }}</h1>
            <p class="font-semibold mb-5">{{ $t('about.marco.position') }}</p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="min-h-[384px] bg-neutral-content order-1 md:order-2">
          <div
            class="
              flex
              justify-center
              items-center
              h-full
              w-full
              object-cover object-top
            "
          >
            <img
              class="h-80"
              src="../assets/svg/team-logos/Complete_RisaruDesign_Logo_BK_transparent.svg"
            />
          </div>
        </div>
        <div
          class="
            flex
            bg-base-200
            p-10
            md:text-right md:justify-end
            order-2
            md:order-1
          "
        >
          <div class="mb-auto mt-auto max-w-lg">
            <h1 class="text-3xl uppercase">{{ $t('about.damjan.name') }}</h1>
            <p class="font-semibold mb-5">{{ $t('about.damjan.position') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
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
      meta: [{ hid: '', name: '', content: '' }],
    };
  }
}
</script>
