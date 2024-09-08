<template v-cloak>
    <div class="h-full w-full flex flex-row gap-12 mx-auto py-24 px-6 lg:px-4 relative">
        <div class="flex flex-col min-h-full w-3/12">
            <div class="sticky top-20">
                <NuxtLink to="/" class="dark:text-white/60 text-black/60 hover:underline">&larr; Voltar</NuxtLink>

                <DocsNavigation :username="'lucianotonet'" :repo="'groq-php'" dir="docs" :version="selectedVersion" />
            </div>
        </div>
        <div class="flex flex-col mx-auto w-full">
            <ReadmeViewer @update-anchors="setAnchors" :username="'lucianotonet'" :repo="'groq-php'"
                :version="selectedVersion" @update-active-anchor="setActiveAnchor" @loading="isLoading = true"
                @loaded="isLoading = false" />
        </div>
        <div class="flex flex-col min-h-full w-3/12">
            <DocAnchors defer/>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug?.join('/');

onMounted(() => {
    route.meta.title = `Groq PHP`;
    route.meta.description = ``;
});
</script>