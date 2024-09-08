<template>
    <div class="h-full w-full flex flex-row gap-12 mx-auto py-24 px-6 lg:px-4 relative">
        <div class="flex flex-col min-h-full w-3/12">
            <div class="sticky top-20">
                <NuxtLink to="/" class="dark:text-white/60 text-black/60 hover:underline">&larr; Voltar</NuxtLink>

                <DocsNavigation :username="'lucianotonet'" :repo="'groq-laravel'" dir="docs"
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
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug?.join('/');
const selectedVersion = ref(route.query.version || '');
const anchors = ref([]);
const isLoading = ref(false);

definePageMeta({
    layout: 'docs'
});
</script>