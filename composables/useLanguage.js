import { ref } from 'vue'

const currentLanguage = ref('en')

export function useLanguage() {
  function setLanguage(lang) {
    currentLanguage.value = lang
  }

  return {
    currentLanguage,
    setLanguage
  }
}