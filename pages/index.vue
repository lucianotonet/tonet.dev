<template>
  <div>

    <div
      class="w-full max-w-7xl gap-4 flex flex-col md:flex-row h-full items-start justify-between bg-blend-multiply pt-24 pb-48">
      <div class="flex md:sticky top-0 flex-col">

        <UserProfile />

      </div>
      <div class="flex flex-col px-4 md:px-0 pt-4 md:pt-12 gap-6 w-full">
        <h3 class="text-3xl font-black mb-8">Projetos recentes:</h3>

        <NuxtLink to="/groq-php" class="card hover:-translate-x-1 dark:bg-white/5 p-5 group rounded-lg shadow-md w-full"
          active-class="bg-gray-200 font-bold" exact-active-class="bg-green-200 font-medium"
          :style="{ viewTransitionName: 'card' }">
          <div class="border p-10 w-full mx-auto">
            <h2 class="text-4xl font-black mb-4" :style="{ viewTransitionName: 'title' }">Groq-PHP</h2>
            <p class="text-2xl text-gray-600 dark:text-gray-400" v-if="groqPhpData">{{ groqPhpData.description }}</p>
            <p class="text-gray-600 dark:text-gray-400" v-if="groqPhpData">versão {{ groqPhpData.version }} • {{
              groqPhpData.downloads.total }} downloads</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/groq-laravel"
          class="card hover:-translate-x-1 dark:bg-white/5 p-5 group rounded-lg shadow-md w-full transform transition duration-300"
          active-class="bg-gray-200 font-bold" exact-active-class="bg-green-200 font-medium">
          <div class="border p-10 w-full mx-auto">
            <h2 class="text-4xl font-black mb-4">Groq-Laravel</h2>
            <p class="text-2xl text-gray-600 dark:text-gray-400" v-if="groqLaravelData">{{ groqLaravelData.description
              }}</p>
            <p class="text-gray-600 dark:text-gray-400" v-if="groqLaravelData">versão {{ groqLaravelData.version }} •
              {{ groqLaravelData.downloads.total }} downloads</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/cartesia-php"
          class="card hover:-translate-x-1 dark:bg-white/5 p-5 group rounded-lg shadow-md w-full transform transition duration-300"
          active-class="bg-gray-200 font-bold" exact-active-class="bg-green-200 font-medium">
          <div class="border p-10 w-full mx-auto">
            <h2 class="text-4xl font-black mb-4">{{ cartesiaPhpData?.title || 'Cartesia-PHP' }}</h2>
            <p class="text-2xl text-gray-600 dark:text-gray-400" v-if="cartesiaPhpData">{{ cartesiaPhpData.description
              }}</p>
            <p class="text-gray-600 dark:text-gray-400" v-if="cartesiaPhpData">versão {{ cartesiaPhpData.version }} •
              {{ cartesiaPhpData.downloads.total }} downloads</p>
          </div>
        </NuxtLink>

        <!-- <NuxtLink to="/works"
          class="card hover:-translate-x-1 dark:bg-white/5 p-5 group rounded-lg shadow-md w-full transform transition duration-300"
          active-class="bg-gray-200 font-bold" exact-active-class="bg-green-200 font-medium">
          <div class="border p-10 w-full mx-auto flex justify-end">
            Outros
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="ml-4 size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </NuxtLink> -->

        <!-- <NuxtLink to="/dev-assistant"
          class="card hover:-translate-x-1 dark:bg-white/5 p-5 group rounded-lg shadow-md w-full transform transition duration-300"
          active-class="bg-gray-200 font-bold" exact-active-class="bg-green-200 font-medium">
          <div class="border p-10 w-full mx-auto">
            <h2 class="text-4xl font-black mb-4">Dev Assistant</h2>
            <p class="text-2xl text-gray-600 dark:text-gray-400">Experimental AI tool</p>
          </div>
        </NuxtLink> -->

      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const groqPhpData = ref(null);
const groqLaravelData = ref(null);
const cartesiaPhpData = ref(null);

const fetchData = async () => {
  try {
    const phpResponse = await fetch('https://packagist.org/packages/lucianotonet/groq-php.json?v=' + Date.now());
    const laravelResponse = await fetch('https://packagist.org/packages/lucianotonet/groq-laravel.json?v=' + Date.now());
    const cartesiaPhpResponse = await fetch('https://packagist.org/packages/lucianotonet/cartesia-php.json?v=' + Date.now());

    if (phpResponse.ok) {
      const data = await phpResponse.json();
      groqPhpData.value = data.package; // Acessa o objeto com chave "package"
      const versions = Object.keys(data.package.versions);
      versions.shift(); // Remove o primeiro item (dev-main)
      groqPhpData.value.version = versions[0]; // Acessa a próxima versão
    }

    if (laravelResponse.ok) {
      const data = await laravelResponse.json();
      groqLaravelData.value = data.package; // Acessa o objeto com chave "package"
      const versions = Object.keys(data.package.versions);
      versions.shift(); // Remove o primeiro item (dev-main)
      groqLaravelData.value.version = versions[0]; // Acessa a próxima versão
    }

    if (cartesiaPhpResponse.ok) {
      const data = await cartesiaPhpResponse.json();
      cartesiaPhpData.value = data.package; // Acessa o objeto com chave "package"
      const versions = Object.keys(data.package.versions);
      versions.shift(); // Remove o primeiro item (dev-main)
      cartesiaPhpData.value.version = versions[0]; // Acessa a próxima versão
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