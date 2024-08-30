<template>
    <div>
        <h1>Docs</h1>
        <ContentList path="/docs" v-slot="{ list }">
            <div v-for="article in list" :key="article._path">
                <NuxtLink :to="`${article._path}`">
                    <h2>{{ article.title }}</h2>
                </NuxtLink>
                <p>{{ article.description }}</p>
            </div>
        </ContentList>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const route = useRoute()
onMounted(async () => {
    route.meta.title = 'Docs'
    route.meta.description = ''
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
