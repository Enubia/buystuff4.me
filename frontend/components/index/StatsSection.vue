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
        {{ $t('index.stats.title') }}
      </h2>
      <p class="text-base text-gray-700 md:text-lg">
        {{ $t('index.stats.description') }}
      </p>
    </div>
    <div
      class="
        relative
        w-full
        p-px
        mx-auto
        mb-4
        transition-shadow
        duration-300
        border
        rounded
        lg:mb-8 lg:max-w-4xl
        group
        hover:shadow-xl
      "
    >
      <div
        class="
          absolute
          bottom-0
          left-0
          w-full
          h-1
          duration-300
          origin-left
          transform
          scale-x-0
          bg-deep-purple-accent-400
          group-hover:scale-x-100
        "
      ></div>
      <div
        class="
          absolute
          bottom-0
          left-0
          w-1
          h-full
          duration-300
          origin-bottom
          transform
          scale-y-0
          bg-deep-purple-accent-400
          group-hover:scale-y-100
        "
      ></div>
      <div
        class="
          absolute
          top-0
          left-0
          w-full
          h-1
          duration-300
          origin-right
          transform
          scale-x-0
          bg-deep-purple-accent-400
          group-hover:scale-x-100
        "
      ></div>
      <div
        class="
          absolute
          bottom-0
          right-0
          w-1
          h-full
          duration-300
          origin-top
          transform
          scale-y-0
          bg-deep-purple-accent-400
          group-hover:scale-y-100
        "
      ></div>
      <div
        class="
          relative
          flex flex-col
          items-center
          justify-center
          h-full
          py-10
          duration-300
          bg-white
          rounded-sm
          transition-color
          sm:items-stretch sm:flex-row
        "
      >
        <div class="px-12 py-8 text-center">
          <h6
            class="text-4xl font-bold text-deep-purple-accent-400 sm:text-5xl"
          >
            {{ registeredUsers }}
          </h6>
          <p class="text-center md:text-base">
            {{ $t('index.stats.users') }}
          </p>
        </div>
        <div
          class="
            w-56
            h-1
            transition
            duration-300
            transform
            bg-gray-300
            rounded-full
            group-hover:bg-deep-purple-accent-400 group-hover:scale-110
            sm:h-auto sm:w-1
          "
        ></div>
        <div class="px-12 py-8 text-center">
          <h6
            class="text-4xl font-bold text-deep-purple-accent-400 sm:text-5xl"
          >
            {{ listedWishlists }}
          </h6>
          <p class="text-center md:text-base">
            {{ $t('index.stats.wishlists') }}
          </p>
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
  client = this.$apollo.getClient();

  registeredUsers = 0;

  listedWishlists = 0;

  async mounted() {
    try {
      const users = await this.client.query({
        query: gql`
          query getUsersTotal {
            userCount {
              count
            }
          }
        `,
      });

      const wishLists = await this.client.query({
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
