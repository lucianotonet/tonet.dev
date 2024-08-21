<template v-cloak>
  <div class="container h-full w-full flex flex-row gap-12 mx-auto py-24 px-6 lg:px-4 relative">
    <div class="flex flex-col w-full max-w-80">
      <div class="sticky top-20">
        <NuxtLink to="/" class="dark:text-white/60 text-black/60 hover:underline">&larr; Voltar</NuxtLink>
        <h2 class="text-5xl font-black mt-4 mb-8" :style="{ viewTransitionName: 'title' }">Groq-Laravel</h2>
        <label for="version-select" class="text-xl font-bold mb-4">Versão</label>
        <div class="flex items-center mt-2">
          <select v-model="selectedVersion" @change="loadVersion" id="version-select"
            class="form-select mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-black/60 focus:border-black/60 dark:focus:ring-white/60 dark:focus:border-white/60 sm:text-sm">
            <option value="main">main</option>
            <option v-for="version in releases" :key="version" :value="version">{{ version }}</option>
          </select>
          <a :href="`https://github.com/lucianotonet/groq-laravel/releases/${selectedVersion}`" target="_blank"
            class="ml-4 text-gray-500 hover:text-gray-700" title="Ver no GitHub">
            <GithubLogoIcon class="h-8 w-8" />
          </a>
        </div>
        <div v-if="isOldVersion" class="mt-2 flex items-center">
          <span class="text-red-500 text-xs">⚠️ Versão antiga</span>
        </div>
        <div v-if="isNotReleasedVersion" class="mt-2 flex items-center">
          <span class="text-yellow-700 text-xs">⚠️ Ainda não lançada</span>
        </div>
        <nav v-if="anchors.length" class="sidebar mt-8">
          <h3 class="text-xl font-bold mb-4">Conteúdo</h3>
          <ul class="flex flex-col gap-2">
            <li v-for="anchor in anchors" :key="anchor.id" :style="{ marginLeft: (anchor.level - 1) * 15 + 'px' }"
              class="leading-tight">
              <a :href="`#${anchor.id}`" class="dark:text-white/60 text-black/60 hover:underline"
                :style="{ fontSize: `${18 - anchor.level}px` }">{{ anchor.text }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="flex flex-col flex-grow">
      <ReadmeViewer @update-anchors="setAnchors" :username="'lucianotonet'" :repo="'groq-laravel'"
        :version="selectedVersion" @update-active-anchor="setActiveAnchor" @loading="isLoading = true"
        @loaded="isLoading = false" />
      <p v-if="isLoading" class="text-gray-500">Carregando...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { GithubLogoIcon } from '@radix-icons/vue'

const route = useRoute()
const anchors = ref([])
const activeAnchor = ref('')
const releases = ref([])
const selectedVersion = ref('')
const isOldVersion = ref(false)
const isNotReleasedVersion = ref(false)
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
  try {
    const response = await $fetch('api/github/tags/lucianotonet/groq-laravel.json');
    releases.value = response.map(release => release.name);

    const versionFromUrl = route.query.version;
    if (versionFromUrl && (releases.value.includes(versionFromUrl) || versionFromUrl === 'main')) {
      selectedVersion.value = versionFromUrl; // Carrega a versão passada por query string, incluindo 'main'
    } else {
      selectedVersion.value = releases.value[0]; // Define a última versão como padrão
    }
  } catch (error) {
    apiError.value = true; // Define erro de API
    console.error('Erro ao buscar versões', error);
  }
}

const loadVersion = () => {
  isOldVersion.value = selectedVersion.value !== releases.value[0] && selectedVersion.value !== 'main'
  isNotReleasedVersion.value = selectedVersion.value === 'main';

  route.meta.title = `Groq Laravel`; // Atualiza o título da meta
  route.meta.description = `${selectedVersion.value}`; // Atualiza a descrição da meta

  // Atualiza o query string sem usar route.push
  const url = new URL(window.location);
  url.searchParams.set('version', selectedVersion.value);
  window.history.replaceState({}, '', url);

  nextTick(() => {
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
  });
}

onMounted(() => {
  fetchVersions()

  const versionFromUrl = route.query.version; // Obtém a versão do query string ao iniciar
  if (versionFromUrl) {
    selectedVersion.value = versionFromUrl; // Carrega a versão passada por query string
  }

  route.meta.title = `Groq Laravel`
  route.meta.description = `${selectedVersion.value}`

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