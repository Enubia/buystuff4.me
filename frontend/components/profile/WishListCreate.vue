<template>
  <div class="card border rounded border-base-300 bg-base-100 my-3">
    <div class="card-title pl-6 pt-6">
      {{ $t('profile.wishList.create.header') }}
    </div>
    <div class="card-body">
      <Input
        :label="$t('profile.wishList.label')"
        input-type="url"
        class="w-full lg:w-2/3"
        :parent-validate-error="showError"
        @reset-error="showError = false"
        @input-data-change="applyLink"
      />
      <div class="flex flex-wrap">
        <div
          v-for="category of payload.categories"
          :key="category._id"
          class="flex mt-4 mx-1 capitalize"
        >
          <div class="badge badge-primary">
            {{ category.name }}
          </div>
          <img
            src="../../assets/svg/trash.svg"
            alt="Trashcan"
            class="h-4 w-4 mt-0.5 ml-0.5 cursor-pointer"
            @mousedown="removeCategory(category)"
          />
        </div>
      </div>
      <div class="flex">
        <Input
          :label="$t('profile.wishList.create.descriptionLabel')"
          class="w-full lg:w-2/3"
          @input-data-change="applyDescription"
        />
      </div>
      <div class="flex">
        <Input
          :label="$t('profile.wishList.create.categoryLabel')"
          class="w-full lg:w-2/3"
          @input-data-change="filterCategories"
          @focusin.native="showCategoryDropdown = true"
          @focusout.native="showCategoryDropdown = false"
        />
      </div>
      <div
        v-if="showCategoryDropdown"
        class="
          block
          lg:w-2/3
          border border-base-200
          py-1
          px-2
          bg-base-300
          capitalize
          max-h-32
          overflow-y-auto
        "
      >
        <div
          v-for="cat of filteredCategories"
          :key="cat._id"
          class="w-full cursor-pointer hover:bg-base-200"
          @mousedown="applyCategory(cat)"
        >
          {{ cat.name }}
        </div>
      </div>
    </div>
    <div class="flex justify-end pr-6 pb-6">
      <button type="button" class="btn btn-primary" @click="saveList">
        {{ $t('profile.wishList.create.saveButton') }}
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Input from '../form-elements/Input.vue';
import { ICategory, SearchRootState } from '../../store/search';

@Component({
  name: 'WishListCreate',
  components: { Input },
})
export default class WishListCreate extends Vue {
  categories = this.storeCategories;

  showCategoryDropdown = false;

  filteredCategories = this.storeCategories;

  payload: {
    link: string;
    categories: ICategory[];
    description: string;
  } = { link: '', categories: [], description: '' };

  showError = false;

  async mounted() {
    if ((<SearchRootState>this.$store.state.search).categories.length === 0) {
      await this.$store.dispatch('search/fetchCategories');
    }

    this.categories = this.storeCategories;
    this.filteredCategories = this.storeCategories;
  }

  get storeCategories() {
    return (<SearchRootState>this.$store.state.search).categories;
  }

  filterCategories(value: string) {
    if (value.length > 3) {
      this.filteredCategories = this.categories.filter((item) =>
        item.name.includes(value),
      );

      if (this.filteredCategories.length === 0) {
        this.filteredCategories = [
          { _id: 'asdf1234qwer', name: 'No category found' },
        ];
      }
    } else {
      this.filteredCategories = this.categories;
    }
  }

  applyCategory(category: ICategory) {
    if (!this.payload.categories.includes(category)) {
      this.payload.categories.push(category);
    }
  }

  applyLink(value: string) {
    this.payload.link = value;
  }

  removeCategory(category: ICategory) {
    this.payload.categories.splice(
      this.payload.categories.findIndex((item) => item._id === category._id),
      1,
    );
  }

  applyDescription(value: string) {
    this.payload.description = value;
  }

  async saveList() {
    if (this.payload.link === '') {
      this.showError = true;
      return;
    }

    if (this.payload.categories.length === 0) {
      this.$toast.open({
        message: 'No category selected',
        position: 'top-right',
        type: 'error',
      });

      return;
    }

    try {
      await this.$store.dispatch('profile/saveList', this.payload);

      this.$toast.open({
        message: 'Successfully saved list',
        type: 'success',
        position: 'top-right',
      });
    } catch (error: any) {
      console.error(error);
      this.$toast.open({
        message: 'Failed to save list!',
        position: 'top-right',
        type: 'error',
      });
    }
  }
}
</script>
