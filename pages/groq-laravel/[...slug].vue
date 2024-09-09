<template>
    <div class="h-full w-full flex flex-row gap-12 mx-auto py-24 px-6 lg:px-4 relative">
        <div class="flex flex-col min-h-full w-3/12">
            <div class="sticky top-20">
                <NuxtLink to="/groq-laravel/" class="dark:text-white/60 text-black/60 hover:underline">&larr; Voltar</NuxtLink>

                <DocsNavigation :username="'lucianotonet'" :repo="'groq-laravel'" dir="docs"
                    :version="selectedVersion" />
            </div>
        </div>
        <div class="flex flex-col w-full">
            <div class="card dark:bg-white/5 p-4 group rounded-lg shadow-md w-full"
                :style="{ viewTransitionName: 'card' }">
                <div class="border p-10 min-w-full">
                    <ContentDoc class="prose dark:prose-invert mx-auto"/>
                </div>
            </div>
        </div>
        <div class="flex flex-col min-h-full w-3/12">
            <DocAnchors />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const contentHtml = ref('');
const selectedVersion = ref(route.query.version || '');
const anchors = ref([]);
const isLoading = ref(false);

const fetchContent = async () => {
    isLoading.value = true;
    const { data } = await useAsyncData(`content-${route.path}`, () => 
        queryContent(route.path).findOne()
    )
    contentHtml.value = data.value?.body?.html || ''
    isLoading.value = false;
    nextTick(() => {
        
    })
}

onMounted(() => {
    fetchContent()
    setAnchors()
})

watch(() => route.path, () => {
    fetchContent()
    setAnchors()
})

const setAnchors = () => {
    anchors.value = [];
    const headings = document.querySelectorAll('.prose h1, .prose h2, .prose h3');
    headings.forEach(heading => {
        anchors.value.push({
            text: heading.textContent,
            hash: `#${heading.id}`
        });
    });
};

definePageMeta({
    layout: 'docs'
});
</script>