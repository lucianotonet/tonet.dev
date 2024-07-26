<template v-cloak>
  <div class="container h-full w-full flex flex-row gap-12 mx-auto py-24 px-6 lg:px-4 relative">
    <div class="flex flex-col min-w-64">
      <div class="sticky top-20">
        <NuxtLink to="/" class="dark:text-white/60 text-black/60 hover:underline">&larr; Voltar</NuxtLink>
        <h2 class="text-5xl font-black mt-4 mb-8">Groq-PHP</h2>

        <label for="version-select" class="text-xl font-bold mb-4">Versão</label>
        <div class="flex items-center">
          <select v-model="selectedVersion" @change="loadVersion" id="version-select"
            class="form-select mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-black/60 focus:border-black/60 dark:focus:ring-white/60 dark:focus:border-white/60 sm:text-sm">
            <option v-for="version in releases" :key="version" :value="version">{{ version }}</option>
          </select>
          <a :href="`https://github.com/lucianotonet/groq-php/releases/${selectedVersion}`" target="_blank"
            class="ml-4 text-gray-500 hover:text-gray-700" title="Ver no GitHub">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 0C5.37 0 0 5.37 0 12C0 17.303 3.438 21.8 8.207 23.385C8.805 23.492 9.019 23.139 9.019 22.829C9.019 22.548 9.009 21.785 9.003 20.726C5.672 21.473 4.968 19.508 4.968 19.508C4.433 18.177 3.663 17.88 3.663 17.88C2.584 17.233 3.746 17.248 3.746 17.248C4.94 17.334 5.537 18.484 5.537 18.484C6.591 20.211 8.229 19.763 8.838 19.514C8.926 18.736 9.212 18.213 9.528 17.925C6.947 17.636 4.266 16.554 4.266 11.799C4.266 10.445 4.703 9.334 5.457 8.462C5.342 8.171 4.955 6.904 5.553 5.177C5.553 5.177 6.542 4.872 8.997 6.491C9.987 6.228 11.048 6.096 12.096 6.091C13.144 6.096 14.205 6.228 15.195 6.491C17.65 4.872 18.639 5.177 18.639 5.177C19.237 6.904 18.85 8.171 18.735 8.462C19.489 9.334 19.926 10.445 19.926 11.799C19.926 16.569 17.237 17.632 14.646 17.916C15.075 18.29 15.465 19.014 15.465 20.082C15.465 21.573 15.451 22.657 15.451 22.829C15.451 23.139 15.665 23.492 16.263 23.385C21.032 21.8 24.47 17.303 24.47 12C24.47 5.37 19.1 0 12 0Z">
              </path>
            </svg>
          </a>
        </div>
        <div v-if="isOldVersion" class="mt-2 flex items-center">
          <span class="text-red-500 text-xs">⚠️ Versão antiga</span>
        </div>
        <nav v-if="anchors.length" class="sidebar mt-8">
          <h3 class="text-xl font-bold mb-4">Conteúdo</h3>
          <ul>
            <li v-for="anchor in anchors" :key="anchor.id" :style="{ marginLeft: (anchor.level - 1) * 15 + 'px' }"
              class=" leading-tight">
              <a :href="`#${anchor.id}`" class="dark:text-white/60 text-black/60 hover:underline text-sm leading-none"
                :class="{ 'font-bold': isActive(anchor.id) }">{{ anchor.text }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="flex flex-col flex-grow">
      <ReadmeViewer @update-anchors="setAnchors" :username="'lucianotonet'" :repo="'groq-php'"
        :version="selectedVersion" @update-active-anchor="setActiveAnchor" @loading="isLoading = true"
        @loaded="isLoading = false" />
      <p v-if="isLoading" class="text-gray-500">Carregando...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const anchors = ref([])
const activeAnchor = ref('')
const releases = ref([])
const selectedVersion = ref('')
const isOldVersion = ref(false)
const isLoading = ref(false)
const apiError = ref(false)

const setAnchors = newAnchors => {
  anchors.value = newAnchors
}

const setActiveAnchor = id => {
  activeAnchor.value = id
}

const isActive = id => {
  return activeAnchor.value === id
}

const fetchVersions = async () => {
  const { public: { githubToken } } = useRuntimeConfig(); // Obtém o token de autenticação da configuração em tempo de execução

  try {
    const response = await fetch('https://api.github.com/repos/lucianotonet/groq-php/tags', {
      headers: {
        'Authorization': `Bearer ${githubToken}`, // Adiciona o token de autenticação
        'Accept': 'application/vnd.github+json', // Adiciona o cabeçalho Accept
        'X-GitHub-Api-Version': '2022-11-28' // Adiciona a versão da API do GitHub
      }
    });
    if (!response.ok) {
      if (response.status === 403) {
        apiError.value = true; // Define erro de API
        console.error('Limite de requisições da API excedido. Consulte a documentação para mais detalhes sobre limites de requisições: https://docs.github.com/pt/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28'); // Log adicional para depuração
      }
      throw new Error('Erro ao buscar versões');
    }
    const data = await response.json()
    releases.value = data.map(release => release.name)

    const versionFromUrl = route.query.version
    if (versionFromUrl && releases.value.includes(versionFromUrl)) {
      selectedVersion.value = versionFromUrl; // Carrega a versão passada por query string
    } else {
      selectedVersion.value = releases.value[0]; // Define a última versão como padrão
      if (versionFromUrl) {
        router.push({ query: { ...route.query, version: releases.value[0] } }); // Remove versão inválida da URL
      }
    }
  } catch (error) {
    console.error(error);
  }
}

const loadVersion = () => {
  isOldVersion.value = selectedVersion.value !== releases.value[0] // Verifica se a versão selecionada é antiga

  // Atualiza o título da página sem piscar
  route.meta.title = `Groq PHP ${selectedVersion.value}`
  // useHead({
  //   title: route.meta.title + ' - LucianoTonet.dev'
  // })
}

onMounted(() => {
  fetchVersions()
  loadVersion() // Define o título inicial da página

  route.meta.title = `Groq PHP ${selectedVersion.value}`

  // Obtém o hash da URL e posiciona o scroll
  const hash = window.location.hash.substring(1);
  if (hash) {
    const targetElement = document.getElementById(hash);
    if (targetElement) {
      const offset = 75;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }
})

watch(selectedVersion, (newVersion) => {
  if (newVersion) {
    loadVersion()
  }
})
</script>
