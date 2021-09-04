<template>
  <div
    class="flex justify-center min-h-full bg-gray-100 sm:items-center sm:pt-0"
  >
    <div class="m-1">
      <button class="btn-accent" @click="fetchUser">Button</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { gql } from 'graphql-tag';

@Component({
  name: 'Index',
  components: {},
})
export default class extends Vue {
  client = this.$apollo.getClient();

  async mounted() {
    try {
      const data = await this.client.query({
        query: gql`
          query userOneLean {
            userOneLean {
              email
            }
          }
        `,
      });

      console.log(data.data.userOneLean.email);
    } catch (error) {
      console.error(error);
    }
  }

  async fetchUser() {
    try {
      const data = await this.client.query({
        query: gql`
          query {
            userOneLean {
              _id
              firstName
              lastName
              email
            }
          }
        `,
      });

      console.log(data.data.userOneLean);
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
