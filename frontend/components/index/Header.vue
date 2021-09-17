<template>
  <div class="bg-neutral-focus">
    <div
      class="
        px-4
        py-16
        mx-auto
        sm:max-w-xl
        md:max-w-full
        lg:max-w-screen-xl
        md:px-24
        lg:px-8 lg:py-20
      "
    >
      <div class="max-w-xl sm:mx-auto lg:max-w-2xl">
        <div class="flex flex-col mb-16 sm:text-center sm:mb-0">
          <div
            class="
              max-w-xl
              mb-10
              md:mx-auto
              sm:text-center
              lg:max-w-2xl
              md:mb-12
            "
          >
            <h2
              class="
                flex
                items-center
                max-w-lg
                mb-6
                font-sans
                text-3xl
                font-bold
                leading-none
                tracking-tight
                text-white
                sm:text-4xl
                md:mx-auto
              "
            >
              <img src="../../assets/svg/logo.svg" alt="logo" class="w-36" />
              <span>
                {{ $t('index.header.title') }}
              </span>
            </h2>
            <p class="text-base text-white md:text-lg">
              {{ $t('index.header.description') }}
            </p>
          </div>
          <div>
            <nuxt-link :to="localePath('sign-in')" class="btn btn-primary">
              {{ $t('index.header.button') }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'Header',
})
export default class Header extends Vue {}
</script>
