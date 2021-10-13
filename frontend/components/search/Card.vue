<template>
  <div
    class="
      card
      sm:card-side
      bordered
      transform
      transition
      duration-300
      hover:shadow-md hover:scale-105
      mb-3
    "
  >
    <figure>
      <div class="avatar">
        <div
          class="
            rounded-full
            w-24
            h-24
            mt-5
            ml-5
            ring ring-accent-focus ring-offset-base-100 ring-offset-2
          "
        >
          <img
            :src="
              require(`../../assets/svg/avatar/${
                (list && list.user && list.user.image) ||
                'anime-away-face-no-nobody-spirited_113254.svg'
              }`)
            "
            class="h-48 w-full object-cover md:w-48"
            alt="A User Avatar"
          />
        </div>
      </div>
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        {{ (list.user && list.user.firstName) || 'John' }}
        {{ (list.user && list.user.lastName.charAt(0)) || 'D' }}.
      </h2>
      <p>
        {{ (list && list.description) || 'Some wishlist description' }}
      </p>
      <p class="truncate max-w-xs 2xl:max-w-sm">
        <span
          v-for="(item, index) of list.categories"
          :key="index"
          class="badge mt-4 mx-1 capitalize ml-0"
        >
          {{ item.name }}
        </span>
      </p>
      <div class="card-actions">
        <a
          :href="(list && list.link) || '#'"
          target="_blank"
          class="btn btn-primary"
        >
          {{ $t('search.card.link') }}
        </a>
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
