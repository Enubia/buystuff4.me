<template>
  <footer class="p-10 footer bg-base-200 text-base-content footer-center">
    <div>
      <nuxt-link :to="localePath('about')" class="link link-hover">
        {{ $t('about.link') }}
      </nuxt-link>
      <nuxt-link :to="localePath('faq')" class="link link-hover">
        {{ $t('faq.link') }}
      </nuxt-link>
      <nuxt-link :to="localePath('privacy-policy')" class="link link-hover">
        {{ $t('privacyPolicy.link') }}
      </nuxt-link>
    </div>
    <div>
      <div class="grid grid-flow-col gap-4">
        <a
          href="https://github.com/enubia/buystuff4.me"
          rel="canonical"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path
              d="M 12 0 C 5.375 0 0 5.375 0 12 C 0 17.304688 3.4375 21.800781 8.207031 23.386719 C 8.804688 23.496094 9.027344 23.125 9.027344 22.808594 C 9.027344 22.523438 9.015625 21.578125 9.007812 20.574219 C 5.671875 21.300781 4.964844 19.160156 4.964844 19.160156 C 4.421875 17.773438 3.632812 17.40625 3.632812 17.40625 C 2.542969 16.660156 3.71875 16.675781 3.71875 16.675781 C 4.921875 16.757812 5.554688 17.914062 5.554688 17.914062 C 6.625 19.746094 8.367188 19.214844 9.046875 18.90625 C 9.15625 18.132812 9.46875 17.605469 9.808594 17.304688 C 7.144531 17.003906 4.34375 15.972656 4.34375 11.375 C 4.34375 10.0625 4.8125 8.992188 5.578125 8.152344 C 5.457031 7.847656 5.042969 6.628906 5.695312 4.976562 C 5.695312 4.976562 6.703125 4.65625 8.996094 6.207031 C 9.953125 5.941406 10.980469 5.808594 12 5.804688 C 13.019531 5.808594 14.046875 5.941406 15.003906 6.207031 C 17.292969 4.65625 18.300781 4.976562 18.300781 4.976562 C 18.957031 6.632812 18.546875 7.851562 18.421875 8.152344 C 19.191406 8.992188 19.65625 10.0625 19.65625 11.375 C 19.65625 15.984375 16.847656 17 14.175781 17.296875 C 14.609375 17.667969 14.988281 18.398438 14.988281 19.515625 C 14.988281 21.121094 14.972656 22.414062 14.972656 22.8125 C 14.972656 23.128906 15.191406 23.503906 15.800781 23.386719 C 20.566406 21.796875 24 17.300781 24 12 C 24 5.375 18.625 0 12 0 Z M 12 0 "
            />
          </svg>
        </a>
      </div>
    </div>
    <div>
      <p>
        © Copyright {{ new Date().getFullYear() }} Marco Schuster.
        {{ $t('footer.copyright') }}
      </p>
    </div>
  </footer>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'Footer',
})
export default class Footer extends Vue {}
</script>
