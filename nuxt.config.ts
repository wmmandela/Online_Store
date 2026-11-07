// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  telemetry: false,

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'AURELIA | Haute Joaillerie & Fine Jewelry',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Artisanal fine jewelry crafted with recycled 18k solid gold, conflict-free diamonds, and rare gemstones. Certified sustainability and timeless craftsmanship.',
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#18181b' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://online-store-peach-three.vercel.app',
      siteName: 'AURELIA Fine Jewelry',
      siteDescription: 'Modern luxury fine jewelry handcrafted with ethical diamonds and recycled 18k solid gold.',
    },
  },
})
