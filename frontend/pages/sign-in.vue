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
      lg:px-8 lg:my-36
      grid
      place-content-center
    "
  >
    <div
      class="
        px-5
        pt-6
        pb-5
        md:mb-10
        text-center
        border border-gray-300
        shadow-xl
        rounded
      "
    >
      <div class="flex justify-center w-full mt-2 mb-5">
        <div id="google-signin-button"></div>
      </div>
      <p class="max-w-md px-5 mt-3 text-2xs sm:text-sm md:mb-5">
        {{ $t('signIn.infoText') }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'SignIn',
})
export default class SignIn extends Vue {
  head() {
    return {
      title: 'buystuff4.me | Sign In',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('signIn.meta.content'),
        },
      ],
    };
  }

  mounted() {
    const { gapi } = window;
    gapi.signin2.render('google-signin-button', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: localStorage.getItem('data-theme') === 'dark' ? 'dark' : 'light',
      onsuccess: this.onSignIn,
    });
  }

  async onSignIn(user: { getAuthResponse: () => { id_token: string } }) {
    const { id_token } = user.getAuthResponse();

    try {
      await this.$store.dispatch('profile/signIn', id_token);
    } catch (error) {
      console.error(error);
      this.$toast.open({
        message: 'Network Error, please try again later.',
        type: 'error',
        position: 'top-right',
      });
    }

    await this.$router.push('/profile');
  }
}
</script>
