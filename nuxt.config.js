export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '%s | Darklight',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'google-site-verification', content: 'or2_prO52rKPCJ1oxoOMy7Dn3ys2TvA521FItUkvGD4' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  ssr: false,

  target: "static",

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/fonts/road-radio.sass',
    '@/assets/fonts/frizon.sass',
    '@/assets/styles/helpers/_reset.sass',
    '@/assets/styles/base.sass',
    './node_modules/vue-slick-carousel/dist/vue-slick-carousel.css'
  ],

  styleResources: {
    sass: [
      '@/assets/styles/helpers/_variables.sass'
    ],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-slick-carousel.js', mode: 'client' },
    { src: '~/plugins/vue-marquee.js', mode: 'client'}
  ],

  loading: { color: "#008593" },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: "~/components",
      pathPrefix: false
    }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    [
      "@nuxtjs/i18n", {
        locales: [
          {
            code: "en",
            iso: "en-US",
            file: "en-US.json"
          },
          {
            code: "ru",
            iso: "ru-RU",
            file: "ru-RU.json"
          }
        ],
        defaultLocale: "ru",
        noPrefixDefaultLocale: true,
        vueI18n: {
          fallbackLocale: "ru"
        },
        lazy: true,
        langDir: "locales/"
      }
    ],
    ['nuxt-facebook-pixel-module', {
      /* module options */
      track: 'PageView',
      pixelId: process.env.FB_PIXEL_ID,
      autoPageView: true,
      disabled: false,
      debug: process.env.IS_LOCAL === "true",
      pixels: [{
        pixelId: "161829275753620",
        routes: [
          "/success-order"
        ]
      }]
    }],
    ['@nuxtjs/google-gtag', {
      id: process.env.GOOGLE_TAG_ID
    }],
    ['@naumstory/nuxtjs-yandex-metrika', {
      id: process.env.YANDEX_METRIKA_ID,
      webvisor: true,
      clickmap:true,
      // useCDN:false,
      trackLinks:true,
      accurateTrackBounce:true,
    }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  /*
  ** Environment variables config
  */
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL || "https://apiworkshop.darklight.by/v1/",
      workshopApiKey: process.env.WORKSHOP_API_KEY,
      workshopCompanyId: process.env.COMPANY_ID
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    },
    loaders: {
      sass: {
        implementation: require('sass'),
      }
    }
  }
}
