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
          sm:text-4xl
          md:mx-auto
        "
      >
        {{ $t('index.stats.title') }}
      </h2>
      <p class="text-base md:text-lg">
        {{ $t('index.stats.description') }}
      </p>
    </div>
    <div class="card border border-secondary-content shadow-2xl">
      <div class="card-body">
        <div class="flex w-full">
          <div class="w-1/2 px-12 py-8 text-center">
            <div class="flex justify-end">
              <div>
                <h6 class="text-4xl font-bold text-primary-focus sm:text-5xl">
                  {{ registeredUsers }}
                </h6>
                <p class="text-center md:text-base">
                  {{ $t('index.stats.users') }}
                </p>
              </div>
            </div>
          </div>
          <div class="w-1/2 px-12 py-8 text-center">
            <div class="flex justif-start">
              <div>
                <h6 class="text-4xl font-bold text-primary-focus sm:text-5xl">
                  {{ listedWishlists }}
                </h6>
                <p class="text-center md:text-base">
                  {{ $t('index.stats.wishlists') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import gql from 'graphql-tag';

@Component({
  name: 'StatsSection',
})
export default class StatsSection extends Vue {
  registeredUsers = 0;

  listedWishlists = 0;

  async mounted() {
    try {
      const users = await this.$apollo.query({
        query: gql`
          query getUsersTotal {
            userCount {
              count
            }
          }
        `,
      });

      const wishLists = await this.$apollo.query({
        query: gql`
          query getWishlistsTotal {
            wishListCount {
              count
            }
          }
        `,
      });

      if (!users.errors && !wishLists.errors) {
        this.registeredUsers = users.data.userCount.count;
        this.listedWishlists = wishLists.data.wishListCount.count;
      } else if (process.env.NODE_ENV !== 'production') {
        // TODO: only log in dev, ignore in production for now
        console.error({
          user: users.errors,
          wishLists: wishLists.errors,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
