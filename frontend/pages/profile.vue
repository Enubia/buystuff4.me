<template>
  <div class="md:flex my-24 mx-8 md:mx-36 justify-center">
    <div
      class="
        shadow-sm
        rounded-md
        bg-base-200
        w-full
        md:w-5/6
        h-auto
        p-8
        block
        flex flex-wrap
        items-center
        justify-center
        lg:justify-start
        sm:space-x-14
      "
    >
      <div
        class="
          rounded-full
          w-48
          h-48
          ring ring-accent-focus ring-offset-base-100 ring-offset-2
        "
      >
        <img
          :src="
            require(`../assets/svg/avatar/${
              user.image || 'anime-away-face-no-nobody-spirited_113254.svg'
            }`)
          "
          alt="A User Avatar"
        />
      </div>
      <div>
        <div class="mt-4 lg:mt-0">
          <span class="font-medium text-2xl">
            {{ user.firstName + ' ' + user.lastName }}
          </span>
        </div>
        <div class="mt-4 lg:mt-0">
          <span class="text-xl">
            {{ user.email }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { ProfileRootState } from 'store/profile';

@Component({
  name: 'Profile',
  asyncData: ({ store, redirect }) => {
    if (!Object.keys(store.state.profile.user).length) {
      redirect(404, '/sign-in');
    }
  },
})
export default class Profile extends Vue {
  head() {
    return {
      title: 'buystuff4.me | Profile',
      meta: [{ hid: '', name: '', content: '' }],
    };
  }

  get user() {
    return (<ProfileRootState>this.$store.state.profile).user;
  }
}
</script>
