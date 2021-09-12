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
              (user && user.image) ||
              'anime-away-face-no-nobody-spirited_113254.svg'
            }`)
          "
          alt="A cat"
        />
      </div>
      <div class="p-8">
        <div
          class="uppercase tracking-wide text-sm text-purple-500 font-semibold"
        >
          {{ (user && user.firstName) || 'John' }}
          {{ (user && user.lastName.charAt(0)) || 'D' }}.
        </div>
        <a class="block mt-1 text-lg leading-tight font-medium text-black">
          {{
            (user && user.wishLists[0].description) ||
            'Some wishlist description'
          }}
        </a>
        <p class="mt-2 text-orange-200 hover:underline">
          <a :href="(user && user.wishLists[0].link) || '#'">
            {{ (user && user.wishLists[0].link) || 'Some wishlist link' }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { IPreparedUser } from '../../types/IUser';

@Component({
  name: 'Card',
})
export default class Card extends Vue {
  @Prop({
    type: Object,
    default: () => {},
  })
  user!: IPreparedUser;
}
</script>
