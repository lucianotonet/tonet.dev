<template>
    <div class="card dark:bg-white/5 p-5 group rounded-lg shadow-md w-full">
        <div class="border p-10 w-full mx-auto">
            <div v-html="renderedContent" class="prose prose-xl max-w-2xl dark:prose-invert mx-auto"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import MarkdownIt from 'markdown-it';
import { useRoute } from 'vue-router';

const props = defineProps(['repo', 'file']);
const readmeContent = ref('');
const md = new MarkdownIt();

const renderedContent = computed(() => {
    return md.render(readmeContent.value);
});

const fetchDoc = async () => {
    const response = await fetch(`/content/${props.repo}/docs/${props.file}`);
    readmeContent.value = await response.text();
};

onMounted(() => {
    fetchDoc();
});
</script>