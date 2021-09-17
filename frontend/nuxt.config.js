export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });

    return {
      title: 'buystuff4.me',
      htmlAttrs: {
        lang: 'en',
        'data-theme': 'garden',
        ...i18nHead.htmlAttrs,
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
        ...i18nHead.meta,
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        },
        ...i18nHead.link,
      ],
    };
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['./node_modules/flag-icon-css/css/flag-icon.css', '~/assets/scss/main'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/i18n.js',
    {
      src: './plugins/gtag.js',
      mode: 'client',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/eslint-module',
      {
        fix: true,
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
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

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint:
          process.env.NODE_ENV === 'production'
            ? 'https://buystuff4.me/graphql'
            : 'http://localhost:3001/graphql',
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
