<template>
  <div class="bg-primary-focus">
    <div
      class="
        px-4
        py-6
        mx-auto
        lg:py-8
        sm:max-w-xl
        md:max-w-full
        lg:max-w-screen-xl
        md:px-24
        lg:px-8
      "
    >
      <div
        class="
          relative
          flex
          items-center
          justify-between
          lg:justify-center lg:space-x-16
        "
      >
        <div class="flex w-1/3 justify-end">
          <nuxt-link
            :to="localePath('search')"
            aria-label="Browse Lists"
            title="Browse Lists"
            class="hidden lg:block text-gray-100 link link-hover"
          >
            {{ $t('search.link') }}
          </nuxt-link>
        </div>
        <div class="flex w-1/3 justify-center">
          <nuxt-link
            :to="localePath('index')"
            aria-label="buystuff4.me"
            title="buystuff4.me"
            class="inline-flex items-center"
          >
            <span
              class="
                ml-2
                text-xl
                font-bold
                tracking-wide
                text-gray-100
                uppercase
              "
            >
              buystuff4.me
            </span>
          </nuxt-link>
        </div>
        <div class="flex w-1/3 justify-start">
          <div v-if="Object.keys(user).length" class="flex w-1/2">
            <span
              class="hidden w-1/2 lg:block text-gray-100 link link-hover"
              @click="signOut"
            >
              Logout
            </span>
            <nuxt-link
              :to="localePath('/profile')"
              class="hidden w-1/2 lg:block text-gray-100 link link-hover"
            >
              Profile
            </nuxt-link>
          </div>
          <nuxt-link
            v-else
            :to="localePath('sign-in')"
            aria-label="Sign in"
            title="Sign in"
            class="hidden lg:block text-gray-100 link link-hover"
          >
            {{ $t('signIn.link') }}
          </nuxt-link>
        </div>
        <div class="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            class="
              p-2
              -mr-1
              transition
              duration-200
              rounded
              focus:outline-none focus:boxShadow-outline
            "
            @click="isMenuOpen = true"
          >
            <svg class="w-5 text-base-200" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              ></path>
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              ></path>
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              ></path>
            </svg>
          </button>
          <div v-if="isMenuOpen" class="absolute top-0 left-0 w-full">
            <div class="p-5 bg-white border rounded boxShadow-sm">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <nuxt-link
                    :to="localePath('index')"
                    aria-label="Company"
                    title="Company"
                    class="inline-flex items-center"
                  >
                    <svg
                      class="w-8 text-deep-purple-accent-400"
                      viewBox="0 0 24 24"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke="currentColor"
                      fill="none"
                    >
                      <rect x="3" y="1" width="7" height="12"></rect>
                      <rect x="3" y="17" width="7" height="6"></rect>
                      <rect x="14" y="1" width="7" height="6"></rect>
                      <rect x="14" y="11" width="7" height="12"></rect>
                    </svg>
                    <span
                      class="
                        ml-2
                        text-xl
                        font-bold
                        tracking-wide
                        text-gray-800
                        uppercase
                      "
                    >
                      buystuff4.me
                    </span>
                  </nuxt-link>
                </div>
                <div>
                  <button
                    aria-label="Close Menu"
                    title="Close Menu"
                    class="
                      p-2
                      -mt-2
                      -mr-2
                      transition
                      duration-200
                      rounded
                      hover:bg-gray-200
                      focus:bg-gray-200
                      focus:outline-none
                      focus:boxShadow-outline
                    "
                    @click="isMenuOpen = false"
                  >
                    <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <nav class="text-right">
                <ul class="space-y-4">
                  <li>
                    <nuxt-link
                      :to="localePath('search')"
                      aria-label="Browse Lists"
                      title="Browse Lists"
                      class="font-medium tracking-wide text-gray-700"
                    >
                      {{ $t('search.link') }}
                    </nuxt-link>
                  </li>
                  <li v-if="Object.keys(user).length">
                    <span
                      class="
                        font-medium
                        tracking-wide
                        text-gray-700
                        cursor-pointer
                      "
                      @click="signOut"
                    >
                      Logout
                    </span>
                  </li>
                  <li v-if="Object.keys(user).length">
                    <nuxt-link
                      :to="localePath('/profile')"
                      class="font-medium tracking-wide text-gray-700"
                    >
                      Profile
                    </nuxt-link>
                  </li>
                  <li v-if="!Object.keys(user).length">
                    <nuxt-link
                      :to="localePath('sign-in')"
                      aria-label="Sign in"
                      title="Sign in"
                      class="font-medium tracking-wide text-gray-700"
                    >
                      {{ $t('signIn.link') }}
                    </nuxt-link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden lg:block lg:absolute lg:top-5 lg:right-28">
        <LanguageSwitcher />
      </div>
      <div class="hidden lg:block lg:absolute lg:top-5 lg:right-8">
        <div class="btn btn-ghost" @click="switchTheme(!darkMode)">
          <img
            v-if="darkMode"
            src="../../../assets/svg/sun.svg"
            alt="sun"
            class="w-8"
          />
          <img
            v-else
            src="../../../assets/svg/moon.svg"
            alt="moon"
            class="w-8"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import LanguageSwitcher from '../LanguageSwitcher.vue';
import { ProfileRootState } from '../../../store/profile';

@Component({
  name: 'NavBar',
  components: { LanguageSwitcher },
})
export default class NavBar extends Vue {
  isMenuOpen = false;

  darkMode = false;

  get user() {
    return (<ProfileRootState>this.$store.state.profile).user;
  }

  mounted() {
    this.darkMode = localStorage.getItem('data-theme') === ('dark' || 'garden');
  }

  switchTheme(dark = false) {
    if (dark) {
      document.querySelector('html')?.setAttribute('data-theme', 'dark');
      localStorage.setItem('data-theme', 'dark');
    } else {
      document.querySelector('html')?.setAttribute('data-theme', 'garden');
      localStorage.setItem('data-theme', 'garden');
    }
    this.darkMode = dark;
  }

  async signOut() {
    const { gapi } = window;

    const auth2 = gapi.auth2.getAuthInstance();
    await auth2.signOut();

    this.$store.commit('profile/reset');
    await this.$router.push('/');
    this.$toast.success('Logged out, see you soon.');
  }
}
</script>
