<template>
  <div class="max-w-3xl mx-auto h-full flex flex-col items-center py-12 px-4 lg:px-6">
    <h1 class="text-5xl md:text-center font-bold mb-8">Entre em Contato!</h1>
    <p class="text-xl md:text-center mb-12">Estou aqui para ajudar você. Preencha o formulário abaixo e entrarei em
      contato o mais rápido possível!</p>

    <form class="w-full max-w-lg rounded px-8 pt-6 pb-8 mb-4 dark:bg-white/5 bg-black/5 "
      @submit.prevent="validateForm">
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2" for="name">Nome</label>
        <input
          class="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="name" type="text" placeholder="Seu nome" required>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2" for="contact">Email ou Telefone</label>
        <input v-model="contact"
          class="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="contact" type="text" placeholder="Seu email ou telefone" required>
        <p v-if="errorMessage" class="text-red-500 text-xs italic">{{ errorMessage }}</p>
      </div>
      <div class="mb-6">
        <label class="block text-sm font-bold mb-2" for="message">Mensagem</label>
        <textarea
          class="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="message" placeholder="Sua mensagem" required></textarea>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
          Enviar
        </button>
      </div>
    </form>

    <div class="mt-12 text-center">
      <h2 class="text-3xl font-semibold mb-4">Onde me encontrar</h2>
      <p class="text-lg">Você também pode me achar pelas redes sociais:</p>
      <div class="flex flex-col md:flex-row justify-center space-x-0 md:space-x-4 mt-4">
        <a href="https://github.com/lucianotonet/" target="_blank" class="text-blue-600 hover:underline">GitHub</a>
        <a href="https://www.linkedin.com/in/lucianotonet/" target="_blank"
          class="text-blue-600 hover:underline">LinkedIn</a>
        <a href="https://twitter.com/lucianotonet" target="_blank" class="text-blue-400 hover:underline">Twitter</a>
        <a href="https://instagram.com/lucianotonet" target="_blank" class="text-pink-600 hover:underline">Instagram</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const route = useRoute()
const contact = ref('')
const errorMessage = ref('')

const validateForm = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\+?[1-9]\d{1,14}$/; // Exemplo de padrão para telefone

  if (!emailPattern.test(contact.value) && !phonePattern.test(contact.value)) {
    errorMessage.value = 'Por favor, insira um email válido ou um telefone.';
  } else {
    errorMessage.value = '';
    // Aqui você pode adicionar a lógica para enviar o formulário
  }
}

onMounted(() => {
  route.meta.title = 'Contato'
  route.meta.description = 'Orçamentos e Informações.'
})
</script>
