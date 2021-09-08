<template>
  <div
    class="
      px-4
      py-16
      mx-auto
      md:my-11
      sm:max-w-xl
      md:max-w-full
      lg:max-w-screen-xl
      md:px-24
      lg:px-8 lg:py-20
      grid
      place-content-center
    "
  >
    <div class="mb-12 lg:max-w-lg lg:mb-0">
      <div class="max-w-xl mb-6">
        <h2
          class="
            max-w-lg
            mb-6
            font-sans
            text-3xl
            font-bold
            tracking-tight
            text-gray-900
            sm:text-4xl sm:leading-none
          "
        >
          The quick, brown fox<br class="hidden md:block" />
          jumps over
          <span class="inline-block text-deep-purple-accent-400">
            a lazy dog
          </span>
        </h2>
        <p class="text-base text-gray-700 md:text-lg">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
          explicabo.
        </p>
      </div>
      <hr class="mb-12 border-gray-300" />
    </div>
    <div
      class="px-5 pt-6 pb-5 md:mb-10 text-center border border-gray-300 rounded"
    >
      <div class="mb-5 font-semibold">Create an account</div>
      <div class="flex justify-center w-full mb-3">
        <a
          href="/"
          class="
            inline-flex
            items-center
            justify-center
            w-full
            h-12
            px-6
            font-medium
            tracking-wide
            text-white
            transition
            duration-200
            rounded
            shadow-md
            md:w-auto
            bg-deep-purple-accent-400
            hover:bg-deep-purple-accent-700
            focus:shadow-outline focus:outline-none
          "
        >
          <div class="flex items-center">
            <div class="mr-3 font-semibold text-white">Login with Facebook</div>
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
              <path
                d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z"
              ></path>
            </svg>
          </div>
        </a>
      </div>
      <p class="max-w-md px-5 mb-3 text-xs text-gray-600 sm:text-sm md:mb-5">
        Sed ut unde omnis iste natus accusantium doloremque laudantium omnis
        iste.
      </p>
      <div class="flex items-center w-full mb-5">
        <hr class="flex-1 border-gray-300" />
        <div class="px-3 text-xs text-gray-500 sm:text-sm">or</div>
        <hr class="flex-1 border-gray-300" />
      </div>
      <a
        href="/"
        class="
          inline-flex
          items-center
          justify-center
          w-full
          h-12
          px-6
          font-semibold
          transition
          duration-200
          bg-white
          border border-gray-300
          rounded
          md:w-auto
          hover:bg-gray-100
          focus:shadow-outline focus:outline-none
        "
      >
        Sign Up with Email
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'SignIn',
  layout: 'kitwind',
})
export default class SignIn extends Vue {}
</script>
