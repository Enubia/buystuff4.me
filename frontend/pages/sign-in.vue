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
      lg:px-8 lg:py-36
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
      <!-- <div class="flex items-center w-full mb-5">
        <hr class="flex-1 border-gray-300" />
        <div class="px-3 text-xs sm:text-sm">or</div>
        <hr class="flex-1 border-gray-300" />
      </div> -->
      <!-- <div
        class="fb-login-button"
        data-width="240"
        data-size="medium"
        data-button-type="login_with"
        data-layout="rounded"
        data-auto-logout-link="false"
        data-use-continue-as="false"
      ></div> -->
      <p class="max-w-md px-5 mt-3 text-2xs sm:text-sm md:mb-5">
        Signing in with google will only grant us access to your email and
        profile.
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
  mounted() {
    const { gapi } = window as any;
    gapi.signin2.render('google-signin-button', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: localStorage.getItem('data-theme') === 'dark' ? 'dark' : 'light',
      onsuccess: this.onSignIn,
    });
  }

  async onSignIn(user: any) {
    const { id_token } = user.getAuthResponse();

    await this.$store.dispatch('profile/signIn', id_token);
    this.$router.push('/profile');
  }
}
</script>
