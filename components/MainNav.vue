<template>
    <nav>
        <ul v-if="$route.path === '/'" class="flex flex-col md:flex-row space-x-0 md:space-x-4 border-l pl-6 mr-auto ml-5 h-10 items-center">
            <!-- <li>
                <NuxtLink to="/skills" class="hover:text-gray-400 transition-colors">Skills</NuxtLink>
            </li> -->
            <!-- <li>
                <NuxtLink to="/docs" class="hover:text-gray-400 transition-colors">Docs</NuxtLink>
            </li> -->
            <!-- <li>
                <NuxtLink to="/blog" class="hover:text-gray-400 transition-colors">Blog</NuxtLink>
            </li> -->
            <!-- <li>
                <NuxtLink to="/contato" class="hover:text-gray-400 transition-colors">Contato</NuxtLink>
            </li> -->
        </ul> <!-- -->
    </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';

const $route = useRoute();
</script>
