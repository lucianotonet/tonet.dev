<template>
    <div
        class="bg-gradient-to-b from-white via-white dark:from-black dark:via-black to-transparent backdrop-blur-xs fixed top-0 z-10 w-full">
        <div class="flex items-center justify-between p-4">
            <div class="header flex items-center justify-center relative" id="header"
                :style="{ viewTransitionName: 'header' }">
                <NuxtLink to="/" :class="[$route.path !== '/' ? 'group' : '']" class="flex items-center relative">

                    <img src="https://avatars.githubusercontent.com/u/2693019?v=4" alt="Logo"
                        class="h-12 group-hover:opacity-20 transition-all" />
                    <span title="voltar"
                        class="opacity-0 group-hover:opacity-100 absolute top-2 left-4 text-2xl transition-all">&larr;</span>

                    <span v-if="$route.path === '/'" class="ml-4 leading-none font-black text-xl">
                        Luciano<br />Tonet<small class="opacity-50">.dev</small>
                    </span>
                </NuxtLink>

                <span v-if="$route.path !== '/'"
                    class="ml-3 leading-none font-bold text-2xl flex justify-center items-center tracking-tight border-l pl-4">
                    <span class="rounded mix-blend-exclusion">{{ pageTitle }}</span>
                </span>
            </div>

            <MainNav></MainNav>

            <button @click="toggleDarkMode" class="ml-auto">
                <span v-if="isDarkMode" class="text-yellow-500">☀️</span>
                <span v-else class="text-gray-500">🌙</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue';
import { useState } from '#app';
const route = useRoute();
const pageTitle = computed(() => route.meta.title); // Obtém o título da página atual

const isDarkMode = useState('isDarkMode', () => JSON.parse(localStorage.getItem('darkMode')) || false);

// Persistir a preferência de tema
watch(isDarkMode, (newValue) => {
    localStorage.setItem('darkMode', newValue);
});

// Recuperar a preferência de tema ao montar
onMounted(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
        isDarkMode.value = JSON.parse(savedMode);
    }
});

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
};
</script>