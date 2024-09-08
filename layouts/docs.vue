<template>
    <div class="flex-grow flex-col flex items-center justify-center relative">
        <slot />
    </div>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits, watch } from 'vue';
import MarkdownIt from 'markdown-it';
import '~/assets/js/prism.js';
import '~/assets/js/prism-custom.css';
import 'prismjs/components/prism-markup-templating.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-php.js';
import 'prismjs/components/prism-javascript.js'; // Adicionando suporte para JavaScript

const emit = defineEmits(['update-active-anchor']);
const codeContent = ref('');
const anchors = ref([]);
const activeAnchor = ref('');

const md = new MarkdownIt({
    highlight: (str, lang) => {
        if (Prism.languages[lang]) {
            str = Prism.highlight(str, Prism.languages[lang], lang);
        } else {
            console.warn(`Linguagem não suportada: ${lang}`);
        }
        return `<pre class="language-${lang}"><code class="language-${lang}">${str}</code></pre>`;
    }
});

const renderedContent = computed(() => {
    return md.render(codeContent.value);
});

const highlightCode = () => {
    const preElements = document.querySelectorAll('pre');
    preElements.forEach((pre) => {
        Prism.highlightElement(pre);
    });
}

onMounted(() => {
    highlightCode();
});

watch(codeContent, () => {
    highlightCode();
});
</script>