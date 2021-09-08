<template>
  <div class="bg-deep-purple-accent-700">
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
          <a href="/" class="mb-6 sm:mx-auto">
            <div
              class="
                flex
                items-center
                justify-center
                w-12
                h-12
                rounded-full
                bg-teal-accent-400
              "
            >
              <svg
                class="w-10 h-10 text-deep-purple-900"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                ></polygon>
              </svg>
            </div>
          </a>
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
                    top-0
                    left-0
                    z-0
                    hidden
                    w-32
                    -mt-8
                    -ml-20
                    text-deep-purple-accent-100
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
            <p class="text-base text-indigo-100 md:text-lg">
              {{ $t('index.header.description') }}
            </p>
          </div>
          <div>
            <nuxt-link
              :to="localePath('sign-in')"
              class="
                inline-flex
                items-center
                justify-center
                h-12
                px-6
                font-semibold
                tracking-wide
                text-teal-900
                transition
                duration-200
                rounded
                shadow-md
                hover:text-deep-purple-900
                bg-teal-accent-400
                hover:bg-deep-purple-accent-100
                focus:shadow-outline focus:outline-none
              "
            >
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
  name: 'KitWindHeader',
})
export default class KitWindHeader extends Vue {}
</script>
