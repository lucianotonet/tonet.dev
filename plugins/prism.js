import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css' // ou outro tema de sua escolha
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
// Importe outros componentes de linguagem conforme necessário

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('SyntaxHighlighter', {
    props: ['content'],
    mounted() {
      Prism.highlightAllUnder(this.$el)
    },
    updated() {
      Prism.highlightAllUnder(this.$el)
    },
    template: '<div v-html="content"></div>'
  })

  return {
    provide: {
      prism: Prism,
      highlightAll: () => {
        Prism.highlightAll()
      }
    }
  }
})