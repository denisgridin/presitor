export default {
  env: {
    BACKEND_HOST: 'https://presitor-backend.herokuapp.com/',
    GOOGLE_API_KEY: 'AIzaSyCbd1oz5O7vNQfOD9N-KwRLkKC2Xgmj2WA',
    IMGBB_HOST: 'https://api.imgbb.com/1/upload',
    IMGBB_API_KEY: 'd3d3e75a30d992f104498bdfaccbb34a'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'presitor',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vuesax/dist/vuesax.css',
    'animate.css/animate.css',
    '@/assets/css/fonts.css',
    '@/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vuesax',
    '@/plugins/authorization',
    '@/plugins/current'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt'
  ],

  styleResources: {
    scss: [
      '@/assets/css/variables.scss'
    ]
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
