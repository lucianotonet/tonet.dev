<template>
    <div v-if="loading" class="text-center">
        <p>Carregando o post...</p>
    </div>
    <div v-else-if="error" class="text-red-500 text-center">
        <p>{{ error }}</p>
    </div>
    <div v-else class="max-w-3xl mx-auto p-6">
        <h1 class="text-3xl font-bold mb-4">{{ title }}</h1>
        <p class="text-gray-500 mb-2">Por {{ author }} em {{ date }}</p>
        <article class="prose lg:prose-xl">
            <p>{{ content }}</p>
        </article>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const title = ref('');
const content = ref('');
const loading = ref(true);
const error = ref(null);
const date = ref(''); // Adicionando data
const author = ref(''); // Adicionando autor

definePageMeta({
    layout: 'blogPost'
})
const fetchPost = async (slug) => {
  // Mock de busca no backend
  const mockPosts = {
    'post-1': { title: 'Título do Post 1', content: 'Conteúdo do post 1.', date: '2023-01-01', author: 'Autor 1' },
    'post-2': { title: 'Título do Post 2', content: 'Conteúdo do post 2.', date: '2023-01-02', author: 'Autor 2' }
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockPosts[slug]) {
        resolve(mockPosts[slug]);
      } else {
        reject(new Error('Post não encontrado'));
      }
    }, 1000);
  });
};

onMounted(async () => {
  const route = useRoute();
  const slug = route.params.slug;
  try {
    const post = await fetchPost(slug);
    title.value = post.title;
    content.value = post.content;
    date.value = post.date; // Definindo data
    author.value = post.author; // Definindo autor
    console.log('Post de blog carregado com sucesso!');
  } catch (err) {
    error.value = 'Erro ao carregar o post.';
    console.error(err);
  } finally {
    loading.value = false;
  }
});</script>
