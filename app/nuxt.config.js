require('dotenv').config(); // eslint-disable-line

const build = {
  extractCSS: true,
  // publicPath: '.vinci/',
  /*
  ** Run ESLint on save
  */
  extend(config, ctx) {
    if (ctx.isDev) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        options : {
                fix : true
            },
      });
    }
  },
};

export default {
  mode: 'spa',
  env: {
    baseUrl: process.env.IS_ROOT === 'production' ? './' : '/',
    asyncUri: process.env.IS_ROOT === 'production' ? './' : '/',
  },
  router: {
    base: process.env.IS_ROOT === 'production' ? './' : '/',
    mode: 'hash',
  },
  // hooks: hooks(this),
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no,maximum-scale = 1.0' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color or set a custom components
  */
  loading: '~/components/loading.vue',
  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/template.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/i18n.js'],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/dotenv',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-svg',
    'nuxt-webfontloader',
  ],
  axios: {
    https: '' || false,
    host: '' || '',
    port: '' || 80,
    baseURL: process.env.IS_ROOT === 'production' ? './' : '/',
    debug: 'false',
  },
  generate: {
    subFolders: false
  },
  /*
  ** Build configuration
  */
  build,
  webfontloader: {
    google: {
      families: ['Raleway:300,400,600,700,900','Lato:300'],
    },
  },
}
