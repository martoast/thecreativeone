// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  plugins: [
    '~/plugins/formatCurrency'
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  router: {
    options: {
      strict: true,
    },
  },
  nitro: {
    preset: 'netlify-edge'
  },
  vue: {  
    compilerOptions: {
      isCustomElement: (tag) => ['mapbox-search-box'].includes(tag),
    },
  },
  runtimeConfig: {
    ZILLOW_API_KEY: process.env.ZILLOW_API_KEY,
    REAL_ESTATE_API_KEY: process.env.REAL_ESTATE_API_KEY,
    public: {
        MAPBOX_API_TOKEN: process.env.MAPBOX_API_TOKEN,
        GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
        GOOGLE_SHEETS_API_CREDENTIALS: process.env.GOOGLE_SHEETS_API_CREDENTIALS
    }
}
})
