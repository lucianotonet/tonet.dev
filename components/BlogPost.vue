<template>
    <article class="blog-post">
        <h1>{{ post.title }}</h1>
        <p class="meta">Por {{ post.author }} em {{ new Date(post.date).toLocaleDateString('pt-BR') }}</p>
        <!-- <div v-html="$md(post.content)"></div> -->

        <ContentDoc />
    </article>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref({ title: '', author: '', date: '', content: '' });

onMounted(async () => {
    
});
</script>