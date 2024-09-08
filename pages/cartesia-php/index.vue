<template v-cloak>
    <div class="h-full w-full flex flex-row gap-12 mx-auto py-24 px-6 lg:px-4 relative">
        <div class="flex flex-col min-h-full w-3/12">
            <div class="sticky top-20">
                <NuxtLink to="/" class="dark:text-white/60 text-black/60 hover:underline">&larr; Voltar</NuxtLink>

                <DocsNavigation :username="'lucianotonet'" :repo="'cartesia-php'" dir="docs"
                    :version="selectedVersion" />

            </div>
        </div>
        <div class="flex flex-col w-full">
            <ReadmeViewer @update-anchors="setAnchors" :username="'lucianotonet'" :repo="'cartesia-php'"
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
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

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
    anchors.value = newAnchors.map(anchor => ({ ...anchor, isOpen: false }));
}

const setActiveAnchor = id => {
    activeAnchor.value = id
}

const loadVersion = (version = null) => {
    route.meta.title = `Cartesia PHP`; // Atualiza o título da meta
    route.meta.description = `${version}`; // Atualiza a descrição da meta

    selectedVersion.value = version

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
    const versionFromUrl = route.query.version; // Obtém a versão do query string ao iniciar
    if (versionFromUrl) {
        selectedVersion.value = versionFromUrl; // Carrega a versão passada por query string
    }

    route.meta.title = `Cartesia PHP`
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
</script>

<style>
.expand-collapse-enter-active,
.expand-collapse-leave-active {
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.expand-collapse-enter,
.expand-collapse-leave-to {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
}

.expand-collapse-enter-to,
.expand-collapse-leave {
    max-height: 1000px;
    /* valor alto para permitir a expansão */
    opacity: 1;
}
</style>
