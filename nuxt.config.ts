// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolvePath } from "nuxt/kit";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  runtimeConfig: {
    // Chaves privadas estão disponíveis apenas no servidor
    apiSecret: '123',
    // Chaves públicas que são expostas ao cliente
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      apiUrl: `${process.env.NUXT_PUBLIC_BASE_URL}${process.env.NUXT_PUBLIC_API_URL}`,
      githubToken: process.env.NUXT_PUBLIC_GITHUB_TOKEN,
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
        { rel: 'icon', type: 'image/x-icon', href: 'https://avatars.githubusercontent.com/u/2693019?v=4' }
      ]
    }
  },
  css: [
    '~/assets/css/transitions.css', // Adicione seu arquivo de transições aqui
    '~/assets/js/prism.css', // Adicione seu arquivo de transições aqui
  ],
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  nitro: {
    preset: 'vercel-edge',
  },
  content: {
    
  },
})