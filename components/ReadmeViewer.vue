<template>
    <div class="card dark:bg-white/5 p-4 group rounded-lg shadow-md w-full" :style="{ viewTransitionName: 'card' }">
        <div class="border p-10">
            <div v-html="renderedContent" class="prose prose-xl w-full dark:prose-invert mx-auto"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits, onBeforeUnmount, toRefs, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import '~/assets/js/prism.js';
import '~/assets/js/prism-custom.css';
import 'prismjs/components/prism-markup-templating.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-php.js';

const emit = defineEmits(['update-active-anchor', 'update-anchors']) // Emitir eventos para atualizar link ativo e âncoras
const props = defineProps(['username', 'repo', 'version']) // Adicionando a prop de versão
const readmeContent = ref('')
const md = new MarkdownIt({
    highlight: (str, lang) => {
        if (Prism.languages[lang]) {
            str = Prism.highlight(str, Prism.languages[lang], lang)
        } else {
            console.warn(`Linguagem não suportada: ${lang}`);
        }
        return `<pre class="language-${lang}"><code class="language-${lang}">${str}</code></pre>`;
    }
})

const renderedContent = computed(() => {
    const content = md.render(readmeContent.value);
    // Substitui quebras de linha por espaços em branco dentro de tags <p>
    const formattedContent = content.replace(/<p>([\s\S]*?)<\/p>/g, (match, pContent) => {
        return `<p>${pContent.replace(/\n/g, ' ')}</p>`;
    });
    return formattedContent.replace(/<h([1-6])>(.*?)<\/h\1>/g, (match, level, text) => {
        const id = text.toLowerCase().replace(/\s+/g, '-');
        return `<h${level} id="${id}">${text}</h${level}>`;
    });
});

const updateAnchors = () => {
    const headings = document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6');
    const anchors = Array.from(headings).map(heading => ({
        text: heading.innerText,
        id: heading.id || heading.innerText.toLowerCase().replace(/\s+/g, '-'),
        level: parseInt(heading.tagName.charAt(1)),
    }));

    // Reorganiza os âncoras em uma hierarquia
    const hierarchicalAnchors = [];
    const stack = [];

    anchors.forEach(anchor => {
        while (stack.length && stack[stack.length - 1].level >= anchor.level) {
            stack.pop();
        }

        const newAnchor = { ...anchor, children: [] };

        if (stack.length) {
            stack[stack.length - 1].children.push(newAnchor);
        } else {
            hierarchicalAnchors.push(newAnchor);
        }

        stack.push(newAnchor);
    });

    emit('update-anchors', hierarchicalAnchors);
}

const fetchReadme = async (username, repo, version) => {
    version = version || 'main'; // Define a versão padrão como 'main'
    version = version.replaceAll('.', '-');
    try {
        const response = await $fetch('/api/github/contents/' + username + '/' + repo + '/' + version);

        readmeContent.value = response;
    } catch (error) {
        console.error('Erro ao buscar o conteúdo do README:', error);
    }

    updateAnchors()
}
onMounted(() => {
    fetchReadme(props.username, props.repo, props.version); // Passando a versão para a função

    // Obtém o hash da URL e posiciona o scroll
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
            const offset = 75;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    }

    const handleAnchorClick = (event) => {
        if (event.target.tagName === 'A' && event.target.href && event.target.closest('.sidebar')) {
            event.preventDefault()
            const targetId = event.target.getAttribute('href').substring(1)
            const targetElement = document.getElementById(targetId)
            if (targetElement) {
                const offset = 75
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                })

                // Atualiza o hash da URL
                window.history.pushState(null, '', `#${targetId}`);

                // Emitir o ID da âncora clicada
                emit('update-active-anchor', targetId);
            }
        }
    }

    document.addEventListener('click', handleAnchorClick)

    onBeforeUnmount(() => {
        document.removeEventListener('click', handleAnchorClick)
    })
})

watch(() => props.version, (newVersion) => {
    fetchReadme(props.username, props.repo, newVersion)
})
</script>
