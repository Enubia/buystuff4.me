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
      lg:px-8 lg:py-20
    "
  >
    <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
      <h2
        class="
          max-w-lg
          mb-6
          font-sans
          text-3xl
          font-bold
          leading-none
          tracking-tight
          text-gray-900
          sm:text-4xl
          md:mx-auto
        "
      >
        {{ $t('index.steps.title') }}
      </h2>
      <p class="text-base text-gray-700 md:text-lg">
        {{ $t('index.steps.description') }}
      </p>
    </div>
    <div class="grid max-w-2xl mx-auto">
      <div class="flex">
        <div class="flex flex-col items-center mr-6">
          <div class="w-px h-10 opacity-0 sm:h-full"></div>
          <div>
            <div class="number-indicator">1</div>
          </div>
          <div class="w-px h-full bg-gray-300"></div>
        </div>
        <div class="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
          <div class="sm:mr-5">
            <div class="lightning-svg">
              <svg
                class="w-12 h-12 text-primary sm:w-16 sm:h-16"
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
          </div>
          <div>
            <p class="text-xl font-semibold sm:text-base">
              {{ $t('index.steps.one.title') }}
            </p>
            <p class="text-sm text-gray-700">
              {{ $t('index.steps.one.description.text') }}
              <b>
                {{ $t('index.steps.one.description.hint') }}
              </b>
            </p>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="flex flex-col items-center mr-6">
          <div class="w-px h-10 bg-gray-300 sm:h-full"></div>
          <div>
            <div class="number-indicator">2</div>
          </div>
          <div class="w-px h-full bg-gray-300"></div>
        </div>
        <div class="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
          <div class="sm:mr-5">
            <div class="lightning-svg">
              <svg
                class="w-12 h-12 text-primary sm:w-16 sm:h-16"
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
          </div>
          <div>
            <p class="text-xl font-semibold sm:text-base">
              {{ $t('index.steps.two.title') }}
            </p>
            <p class="text-sm text-gray-700">
              {{ $t('index.steps.two.description') }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="flex flex-col items-center mr-6">
          <div class="w-px h-10 bg-gray-300 sm:h-full"></div>
          <div>
            <div class="number-indicator">3</div>
          </div>
          <div class="w-px h-full bg-gray-300"></div>
        </div>
        <div class="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
          <div class="sm:mr-5">
            <div class="lightning-svg">
              <svg
                class="w-12 h-12 text-primary sm:w-16 sm:h-16"
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
          </div>
          <div>
            <p class="text-xl font-semibold sm:text-base">
              {{ $t('index.steps.three.title') }}
            </p>
            <p class="text-sm text-gray-700">
              {{ $t('index.steps.three.description') }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="flex flex-col items-center mr-6">
          <div class="w-px h-10 bg-gray-300 sm:h-full"></div>
          <div>
            <div class="number-indicator">4</div>
          </div>
          <div class="w-px h-full opacity-0"></div>
        </div>
        <div class="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
          <div class="sm:mr-5">
            <div class="lightning-svg">
              <svg
                class="w-12 h-12 text-primary sm:w-16 sm:h-16"
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
          </div>
          <div>
            <p class="text-xl font-semibold sm:text-base">
              {{ $t('index.steps.four.title') }}
            </p>
            <p class="text-sm text-gray-700">
              {{ $t('index.steps.four.description') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'HowToSteps',
})
export default class HowToSteps extends Vue {}
</script>

<style scoped lang="scss">
.number-indicator {
  @apply flex
  items-center
  justify-center
  w-8
  h-8
  text-xs
  font-medium
  border
  rounded-full;
}

.lightning-svg {
  @apply flex
  items-center
  justify-center
  w-16
  h-16
  my-3
  rounded-full
  bg-indigo-50
  sm:w-24 sm:h-24;
}
</style>
