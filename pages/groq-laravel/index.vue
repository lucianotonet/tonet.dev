<template v-cloak>
  <div class="container h-full w-full flex flex-row gap-12 mx-auto py-24 px-6 lg:px-4 relative">
    <div class="flex flex-col w-full max-w-80">
      <div class="sticky top-20">
        <NuxtLink to="/" class="dark:text-white/60 text-black/60 hover:underline">&larr; Voltar</NuxtLink>
        <h2 class="text-5xl font-black mt-4 mb-8" :style="{ viewTransitionName: 'title' }">Groq-Laravel</h2>
        
        <VersionSwitcher @update-version="loadVersion" :repo="'groq-laravel'"/>
        
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
              <ul v-if="anchor.children.length" class="pl-4">
                <li v-for="child in anchor.children" :key="child.id" :style="{ marginLeft: (child.level - 1) * 15 + 'px' }">
                  <a :href="`#${child.id}`" class="dark:text-white/60 text-black/60 hover:underline"
                    :style="{ fontSize: `${18 - child.level}px` }">{{ child.text }}</a>
                </li>
              </ul>
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
import VersionSwitcher from '@/components/VersionSwitcher.vue'

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
  anchors.value = newAnchors.map(anchor => ({ ...anchor, children: anchor.children || [] }));
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

const loadVersion = (version) => {
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

watch(selectedVersion.value, (version)=>{
  definePageMeta({
    title: `Groq Laravel - ${version}` // Atualiza o título da página com a versão selecionada
  });
})
</script>