// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-09-08',
  ssr: true,
  devtools: { enabled: false },
  runtimeConfig: {
    // Chaves privadas estão disponíveis apenas no servidor
    // apiSecret: '123',
    githubToken: process.env.NUXT_GITHUB_TOKEN,

    // Chaves públicas que são expostas ao cliente
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || '',
      apiUrl: process.env.NUXT_PUBLIC_API_URL || ''
    }
  },  
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Luciano Tonet - Desenvolvimento Web',
      meta: [
        { name: 'description', content: 'Site pessoal de Luciano Tonet, desenvolvedor web e entusiasta de tecnologia.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://avatars.githubusercontent.com/u/2693019?v=4' },
      ]
    }
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/transitions.css',
    '~/assets/js/prism.css',
    '~/assets/js/prism-custom.css',
  ],  
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
})