import tailwindTypography from '@tailwindcss/typography'

export default {
  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: '123',
    // Public keys that are exposed to the client
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      apiUrl: process.env.NUXT_PUBLIC_BASE_URL + "" + process.env.NUXT_PUBLIC_API_URL,
    }
  },
  link: [
    { rel: 'stylesheet', href: '//unpkg.com/@highlightjs/cdn-assets@11.7.0/styles/default.min.css' }
  ],
  script: [
    { src: '//unpkg.com/@highlightjs/cdn-assets@11.7.0/highlight.min.js', body: true }
  ],
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    preset: 'vercel-edge',
  }
};

