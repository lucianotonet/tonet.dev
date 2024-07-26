<template>
  <div>

    <div
      class="w-full max-w-7xl gap-4 flex flex-col md:flex-row h-full items-start justify-between bg-blend-multiply pt-24 pb-48">
      <div class="flex md:sticky top-0 flex-col">

        <UserProfile />

      </div>
      <div class="flex flex-col px-4 md:px-0 pt-4 md:pt-24 gap-6 w-full">
        <NuxtLink to="/groq-php"
          class="card hover:-translate-x-1 dark:bg-white/5 p-5 group rounded-lg shadow-md w-full transform transition duration-300"
          active-class="bg-gray-200 font-bold" exact-active-class="bg-green-200 font-medium">
          <div class="border p-10 w-full mx-auto" :style="{ viewTransitionName: 'card' }">
            <h2 class="text-4xl font-black mb-4" :style="{ viewTransitionName: 'title' }">Groq-PHP</h2>
            <p class="text-2xl text-gray-600 dark:text-gray-400">Biblioteca para acessar a API Groq com PHP.</p>
            <p class="text-gray-600 dark:text-gray-400" v-if="groqPhpData">{{ groqPhpData.github_stars }} estrelas • {{ groqPhpData.downloads.total }} downloads</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/groq-laravel"
          class="card hover:-translate-x-1 dark:bg-white/5 p-5 group rounded-lg shadow-md w-full transform transition duration-300"
          active-class="bg-gray-200 font-bold" exact-active-class="bg-green-200 font-medium">
          <div class="border p-10 w-full mx-auto" :style="{ viewTransitionName: 'card' }">
            <h2 class="text-4xl font-black mb-4" :style="{ viewTransitionName: 'title' }">Groq-Laravel</h2>
            <p class="text-2xl text-gray-600 dark:text-gray-400">Pacote Laravel para integração com a API Groq.</p>
            <p class="text-gray-600 dark:text-gray-400" v-if="groqLaravelData">{{ groqLaravelData.github_stars }} estrelas • {{ groqLaravelData.downloads.total }} downloads</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/dev-assistant"
          class="card hover:-translate-x-1 dark:bg-white/5 p-5 group rounded-lg shadow-md w-full transform transition duration-300"
          active-class="bg-gray-200 font-bold" exact-active-class="bg-green-200 font-medium">
          <div class="border p-10 w-full mx-auto" :style="{ viewTransitionName: 'card' }">
            <h2 class="text-4xl font-black mb-4" :style="{ viewTransitionName: 'title' }">Dev Assistant</h2>
            <p class="text-2xl text-gray-600 dark:text-gray-400">Apenas mais uma ferramenta de desenvolvimento AI</p>
          </div>
        </NuxtLink>        
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const groqPhpData = ref(null);
const groqLaravelData = ref(null);

const fetchData = async () => {
  try {
    const phpResponse = await fetch('https://packagist.org/packages/lucianotonet/groq-php.json');
    const laravelResponse = await fetch('https://packagist.org/packages/lucianotonet/groq-laravel.json');
    
    if (phpResponse.ok) {
      const data = await phpResponse.json();
      groqPhpData.value = data.package; // Acessa o objeto com chave "package"
    }
    
    if (laravelResponse.ok) {
      const data = await laravelResponse.json();
      groqLaravelData.value = data.package; // Acessa o objeto com chave "package"
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

onMounted(() => {
  fetchData();
});

useHead({
  title: 'LucianoTonet.dev'
});
</script>