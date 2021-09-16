<template>
  <div
    class="
      max-w-md
      my-3
      mx-auto
      bg-white
      shadow-xl
      border
      rounded-xl
      border-gray-100
      md:max-w-2xl
      transition transition-colors
      hover:border-deep-purple-accent-200
    "
  >
    <div class="md:flex">
      <div class="md:flex-shrink-0">
        <img
          class="h-48 w-full object-cover md:w-48"
          :src="
            require(`../../assets/svg/avatar/${
              (list && list.user && list.user.image) ||
              'anime-away-face-no-nobody-spirited_113254.svg'
            }`)
          "
          alt="A cat"
        />
      </div>
      <div class="p-8 text-center md:text-left">
        <div
          class="uppercase tracking-wide text-lg text-purple-500 font-semibold"
        >
          {{ (list.user && list.user.firstName) || 'John' }}
          {{ (list.user && list.user.lastName.charAt(0)) || 'D' }}.
        </div>
        <p class="block mt-1 leading-tight font-medium text-black break-words">
          {{ (list && list.description) || 'Some wishlist description' }}
        </p>
        <p class="mt-2">
          <a
            :href="(list && list.link) || '#'"
            target="_blank"
            class="
              inline-flex
              items-center
              h-12
              px-6
              font-semibold
              tracking-wide
              transition
              duration-200
              rounded
              hover:shadow-md
              text-teal-200
              break-words
              hover:text-deep-purple-900 hover:bg-deep-purple-accent-100
            "
          >
            {{ $t('search.card.link') }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { IWishList } from '../../types/IWishList';

@Component({
  name: 'Card',
})
export default class Card extends Vue {
  @Prop({ type: Object }) list!: IWishList;
}
</script>
