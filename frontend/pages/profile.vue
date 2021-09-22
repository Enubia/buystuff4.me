<template>
  <div>
    {{ user }}
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
    };
  }

  get user() {
    return (this.$store.state.profile as ProfileRootState).user;
  }
}
</script>
