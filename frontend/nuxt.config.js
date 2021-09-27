export default {
  target: 'static',

  head() {
    let i18nHead;
    if (this.$nuxtI18nHead) {
      i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });
    }

    const headObject = {
      title: 'buystuff4.me',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'google-signin-client_id',
          content:
            '623656119704-d7ovmjp6gtbgdseuchf6884sgi62v2ug.apps.googleusercontent.com',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        },
      ],
      script: [
        {
          src: 'https://apis.google.com/js/platform.js?onload=renderButton',
        },
      ],
    };

    if (i18nHead) {
      headObject.htmlAttrs = {
        ...headObject.htmlAttrs,
        ...i18nHead.htmlAttrs,
      };

      headObject.meta.push(...i18nHead.meta);
      headObject.link.push(...i18nHead?.link);
    }

    return headObject;
  },

  css: ['./node_modules/flag-icon-css/css/flag-icon.css', '~/assets/scss/main'],

  plugins: [
    '~/plugins/i18n.js',
    {
      src: './plugins/gtag.js',
      mode: 'client',
    },
    {
      src: '~/plugins/vue-toast-notification.js',
      mode: 'client',
    },
  ],

  components: false,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/eslint-module',
      {
        fix: true,
      },
    ],
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    [
      '@nuxtjs/i18n',
      {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        redirectOn: 'root',
        locales: [
          {
            code: 'en',
            name: 'English',
            ico: 'us',
            iso: 'en-US',
            file: 'en-US.js',
          },
          {
            code: 'de',
            name: 'Deutsch',
            ico: 'de',
            iso: 'de-DE',
            file: 'de-DE.js',
          },
        ],
        baseUrl: 'https://buystuff4.me',
        lazy: true,
        langDir: 'i18n/',
        defaultLocale: 'en',
      },
    ],
  ],

  axios: {},

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint:
          process.env.NODE_ENV === 'production'
            ? process.env.API_ENDPOINT
            : 'http://localhost:3001/graphql',
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
