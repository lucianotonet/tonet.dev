<template v-cloak>
    <div class="container h-full w-full flex flex-row gap-12 mx-auto py-24 px-6 lg:px-4 relative">
        <div class="flex flex-col min-h-full min-w-64">
            <div class="sticky mt-auto bottom-10">
                <NuxtLink to="/" class="dark:text-white/60 text-black/60 hover:underline">&larr; Voltar</NuxtLink>
                <h2 class="text-5xl font-black mt-4 mb-8" :style="{ viewTransitionName: 'title' }">Groq-PHP</h2>

                <VersionSwitcher @update-version="loadVersion" :repo="'groq-php'" />

                <!-- <nav class="sidebar mt-8">
                    <h3 class="text-xl font-bold mb-4">Documentação</h3>
                    <ul class="flex flex-col gap-2">
                        <li>
                            <NuxtLink to="/groq-php" class="dark:text-white/60 text-black/60 hover:underline">Visão
                                Geral</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/groq-php/installation"
                                class="dark:text-white/60 text-black/60 hover:underline">Instalação
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/groq-php/usage" class="dark:text-white/60 text-black/60 hover:underline">Uso
                                Básico
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/groq-php/advanced" class="dark:text-white/60 text-black/60 hover:underline">
                                Uso Avançado
                            </NuxtLink>
                        </li>
                    </ul>
                </nav> -->

                <nav v-if="anchors.length" class="sidebar mt-8">
                    <h3 class="text-xl font-bold mb-4">Conteúdo</h3>
                    <ul class="flex flex-col gap-2">
                        <li class="leading-tight" v-for="anchor in anchors.filter(a => a.level === 1)" :key="anchor.id">
                            <div>
                                <a :href="`#${anchor.id}`" @click="anchor.isOpen = !anchor.isOpen"
                                    class="dark:text-white/60 text-black/60 hover:underline"
                                    :style="{ fontSize: `${18 - anchor.level}px` }">{{ anchor.text }}</a>
                                <button v-if="anchor.children.length > 0" @click="anchor.isOpen = !anchor.isOpen"
                                    class="ml-2 text-sm">
                                    {{ anchor.isOpen ? '-' : '+' }}
                                </button>
                            </div>
                            <transition name="expand-collapse">
                                <ul v-if="anchor.isOpen" class="pl-4">
                                    <template v-for="child in anchor.children" :key="child.id">
                                        <li>
                                            <div>
                                                <a :href="`#${child.id}`" @click="child.isOpen = !child.isOpen"
                                                    class="dark:text-white/60 text-black/60 hover:underline">{{
                                                    child.text }}</a>
                                                <button v-if="child.children.length > 0"
                                                    @click="child.isOpen = !child.isOpen" class="ml-2 text-sm">
                                                    {{ child.isOpen ? '-' : '+' }}
                                                </button>
                                            </div>
                                            <transition name="expand-collapse">
                                                <ul v-if="child.isOpen" class="pl-4">
                                                    <template v-for="subChild in child.children" :key="subChild.id">
                                                        <li>
                                                            <a :href="`#${subChild.id}`"
                                                                class="dark:text-white/60 text-black/60 hover:underline">{{
                                                                subChild.text }}</a>
                                                        </li>
                                                    </template>
                                                </ul>
                                            </transition>
                                        </li>
                                    </template>
                                </ul>
                            </transition>
                        </li>
                    </ul>
                </nav>
                <nav v-if="anchors.length" class="sidebar mt-8">
                    <div class="mt-4">
                        <a href="#" @click.prevent="scrollToTop" class="text-primary-500 hover:text-primary-700">Voltar
                            ao topo</a>
                    </div>
                </nav>

            </div>
        </div>
        <div class="flex flex-col flex-grow">
            <NuxtPage />

            <ReadmeViewer @update-anchors="setAnchors" :username="'lucianotonet'" :repo="'groq-php'"
                :version="selectedVersion" @update-active-anchor="setActiveAnchor" @loading="isLoading = true"
                @loaded="isLoading = false" />

            <p v-if="isLoading" class="text-primary-500">Carregando...</p>
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
    anchors.value = newAnchors.map(anchor => ({ ...anchor, isOpen: false }));
}

const setActiveAnchor = id => {
    activeAnchor.value = id
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
const loadVersion = (version = null) => {
    route.meta.title = `Groq PHP`; // Atualiza o título da meta
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

    route.meta.title = `Groq PHP`
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
