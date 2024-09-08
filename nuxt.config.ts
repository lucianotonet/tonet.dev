// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-09-08',
  ssr: true,
  devtools: { enabled: false },
  generate: {
    routes: [
      '/api/github/tags/lucianotonet/groq-php.json',
      '/api/github/tags/lucianotonet/groq-laravel.json',
      '/api/github/tags/lucianotonet/cartesia-php.json',

      '/api/github/contents/lucianotonet/cartesia-php/main',
      '/api/github/contents/lucianotonet/cartesia-php/v0-0-1',

      '/api/github/contents/lucianotonet/groq-php/main',
      '/api/github/contents/lucianotonet/groq-php/v0-0-9',
      '/api/github/contents/lucianotonet/groq-php/v0-0-8',
      '/api/github/contents/lucianotonet/groq-php/v0-0-7',
      '/api/github/contents/lucianotonet/groq-php/v0-0-6',
      '/api/github/contents/lucianotonet/groq-php/v0-0-5',
      '/api/github/contents/lucianotonet/groq-php/v0-0-4',
      '/api/github/contents/lucianotonet/groq-php/v0-0-3',
      '/api/github/contents/lucianotonet/groq-php/v0-0-2',
      '/api/github/contents/lucianotonet/groq-php/v0-0-1',
      
      '/api/github/contents/lucianotonet/groq-laravel/main',
      '/api/github/contents/lucianotonet/groq-laravel/v0-0-9',
      '/api/github/contents/lucianotonet/groq-laravel/v0-0-8',
      '/api/github/contents/lucianotonet/groq-laravel/v0-0-4',
      '/api/github/contents/lucianotonet/groq-laravel/v0-0-3',
      '/api/github/contents/lucianotonet/groq-laravel/v0-0-2',
    ]
  },
  runtimeConfig: {
    // Chaves privadas estão disponíveis apenas no servidor
    // apiSecret: '123',
    githubToken: process.env.NUXT_GITHUB_TOKEN,

    // Chaves públicas que são expostas ao cliente
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      apiUrl: `${process.env.NUXT_PUBLIC_BASE_URL}${process.env.NUXT_PUBLIC_API_URL}`,
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
  modules: ['@nuxtjs/tailwindcss', "@nuxt/content"],
  plugins: [
    '~/plugins/markdown.js'
  ],
  content: {
    // Configurações específicas para o módulo @nuxt/content
    documentDriven: false, // Desativa o modo document-driven
    navigation: {
      fields: ['title', 'description', 'date']
    },
    markdown: {
      // Configurações do markdown, se necessário
    },
    sources: {
      // Define as fontes de conteúdo específicas
      content: {
        driver: 'fs',
        base: './content'
      }
    },
    ignores: [
      // Ignora arquivos ou diretórios específicos, se necessário
    ]
  }
})