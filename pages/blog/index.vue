<template>
    <div class="mt-24">
        <h1>Lista de Posts</h1>
        <ul>
            <li v-for="post in posts" :key="post.slug">
                <nuxt-link :to="`/blog/${post.slug}`">{{ post.title }}</nuxt-link>
            </li>
            <li>
                <nuxt-link :to="`/blog/groq-php_-_a-blazing-fast-AI-inferece-with-PHP`">groq-php_-_a-blazing-fast-AI-inferece-with-PHP</nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
const posts = ref([]);

onMounted(async () => {
    posts.value = await fetchPosts();
});

async function fetchPosts() {
    // Mock de busca no backend
    const mockPosts = [
        { slug: 'post-1', title: 'Título do Post 1' },
        { slug: 'post-2', title: 'Título do Post 2' }
    ];
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockPosts);
        }, 1000);
    });
}</script>

<style scoped>
h1 {
    color: #333;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 10px 0;
}
</style>
