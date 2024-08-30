<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold mb-8">Blog</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="article in list" :key="article._path"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <pre>{{ article._path }}</pre>
                <NuxtLink :to="article._path" v-if="article.thumbnail">
                    <img :src="article.thumbnail.startsWith('http') || article.thumbnail.startsWith('https') ? article.thumbnail : `/blog/${article._path.split('/').pop()}/${article.thumbnail}`"
                        :alt="article.title" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h2 class="text-xl font-semibold mb-2">{{ article.title }}</h2>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-2">{{ formatDate(article.date) }}</p>
                        <p class="text-gray-700 dark:text-gray-200">{{ article.description }}</p>
                    </div>
                </NuxtLink>
                <NuxtLink v-else :to="article._path">
                    <div class="p-4">
                        <h2 class="text-xl font-semibold mb-2">{{ article.title }}</h2>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-2">{{ formatDate(article.date) }}</p>
                        <p class="text-gray-700 dark:text-gray-200">{{ article.description }}</p>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const route = useRoute()
const { data: list } = await useAsyncData('blog-list', () => queryContent('/blog').find())

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(async () => {
    route.meta.title = 'Blog'
    route.meta.description = 'Artigos e tutoriais sobre desenvolvimento web e tecnologia'
});
</script>

<style scoped>
h1 {
    color: #333;
}

div {
    margin: 10px 0;
}
</style>
