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
              <span class="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  class="
                    absolute
                    top-1
                    left-0
                    z-0
                    hidden
                    w-32
                    -mt-8
                    -ml-20
                    lg:w-32 lg:-ml-28 lg:-mt-10
                    sm:block
                  "
                >
                  <defs>
                    <pattern
                      id="700c93bf-0068-4e32-aafe-ef5b6a647708"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7"></circle>
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#700c93bf-0068-4e32-aafe-ef5b6a647708)"
                    width="52"
                    height="24"
                  ></rect>
                </svg>
                <span class="relative">{{ $t('index.header.titleOne') }}</span>
              </span>
              {{ $t('index.header.titleTwo') }}
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
