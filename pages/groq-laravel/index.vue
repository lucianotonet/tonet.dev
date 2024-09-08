<template>
  <div class="h-full w-full flex flex-row gap-12 mx-auto py-24 px-6 lg:px-4 relative">
    <div class="flex flex-col min-h-full w-3/12">
      <div class="sticky top-20">
        <NuxtLink to="/" class="dark:text-white/60 text-black/60 hover:underline">&larr; Voltar</NuxtLink>

        <DocsNavigation :username="'lucianotonet'" :repo="'groq-laravel'" dir="docs" :version="selectedVersion" />
      </div>
    </div>
    <div class="flex flex-col w-full">
      <ReadmeViewer @update-anchors="setAnchors" :username="'lucianotonet'" :repo="'groq-laravel'"
        :version="selectedVersion" @update-active-anchor="setActiveAnchor" @loading="isLoading = true"
        @loaded="isLoading = false" />

      <p v-if="isLoading" class="text-primary-500">Carregando...</p>
    </div>
    <div class="flex flex-col min-h-full w-3/12">
      <DocAnchors />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug?.join('/');
const anchors = ref([]);

const setAnchors = (newAnchors) => {
  anchors.value = newAnchors;
};

onMounted(() => {
  route.meta.title = `Groq Laravel`;
  route.meta.description = `Documentação da última versão.`;
});
</script>