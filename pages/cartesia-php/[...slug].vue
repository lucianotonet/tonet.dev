<template>
    <div class="h-full w-full flex flex-row gap-12 mx-auto py-24 px-6 lg:px-4 relative">
        <div class="flex flex-col min-h-full w-3/12">
            <div class="sticky top-20">
                <NuxtLink to="/cartesia-php/" class="dark:text-white/60 text-black/60 hover:underline">&larr; Voltar
                </NuxtLink>

                <DocsNavigation :username="'lucianotonet'" :repo="'cartesia-php'" dir="docs"
                    :version="selectedVersion" />
            </div>
        </div>
        <div class="flex flex-col w-full">
            <div class="card dark:bg-white/5 p-4 group rounded-lg shadow-md w-full"
                :style="{ viewTransitionName: 'card' }">
                <div class="border p-10 min-w-full">
                    <ContentDoc class="prose prose-sm dark:prose-invert" />
                </div>
            </div>
        </div>
        <div class="flex flex-col min-h-full w-3/12">
            <DocAnchors />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const { path } = useRoute();
const route = useRoute();
const anchors = ref([]);
const { data: page } = await useAsyncData(`content-${path}`, () => queryContent(path).findOne());
definePageMeta({
    layout: 'docs'
});

const setAnchors = () => {
    anchors.value = [];

    const headings = document.querySelectorAll('.prose h1, .prose h2, .prose h3');

    headings.forEach(heading => {
        anchors.value.push({
            text: heading.textContent,
            hash: `#${heading.id}` // Adicionando o '#' para o hash
        });
    });
};

const smoothScrollTo = (hash) => {
    const targetElement = document.querySelector(hash); // Usando hash diretamente para selecionar o elemento

    if (targetElement) {
        const offset = 75;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
        });
        history.pushState(null, '', hash); // Atualiza a hash na URL dinamicamente
    }
};

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

onMounted(async () => {
    const versionFromUrl = route.query.version; // Obtém a versão do query string ao iniciar
    if (versionFromUrl) {
        selectedVersion.value = versionFromUrl; // Carrega a versão passada por query string
    }

    // route.meta.title = `Cartesia PHP`; // Usando operador de encadeamento opcional
    // route.meta.description = page.value?.title ?? '';

    if (route.hash) {
        smoothScrollTo(route.hash); // Chama a função de scroll suave
    }

    setAnchors(); // Chama a função para definir as âncoras
});
</script>
