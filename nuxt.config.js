const isDev = process.env.NODE_ENV === 'development'

export default {
  ssr: true,
  modern: isDev ? false : 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'seed',
    meta: [
      { name: 'renderer', content: 'webkit|ie-comp|ie-stand' },
      { name: 'force-rendering', content: 'webkit' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' }
    ],
    link: [
      { rel: 'dns-prefetch', href: 'https://fs.calibur.tv' },
      { rel: 'preconnect', href: 'https://fc.calibur.tv' },
      { rel: 'icon', type: 'image/x-icon', href: 'https://fs.calibur.tv/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: false,
    meta: {
      name: '',
      author: '',
      description: '',
      lang: 'zh-CN',
      ogSiteName: false,
      ogTitle: false,
      ogDescription: false,
      ogImage: false,
      ogUrl: false,
      ogType: '',
      mobileApp: false,
      mobileAppIOS: false,
      favicon: false,
      charset: 'utf-8',
      viewport: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover'
    },
    manifest: {
      name: '',
      short_name: '',
      description: ''
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    corejs: 3,
    extractCSS: true,
    publicPath: isDev ? '/_nuxt/' : 'https://fs.calibur.tv/static/'
  }
}
