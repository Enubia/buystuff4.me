import { NuxtAxiosInstance } from '@nuxtjs/axios';

declare module '*.vue' {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import Vue from 'vue';

  export default Vue;
}

declare module '@nuxt/types' {
  interface Context {
    $axios: NuxtAxiosInstance;
  }
}
