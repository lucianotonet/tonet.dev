<template>
    <div class="card dark:bg-white/5 p-5 group rounded-lg shadow-md w-full transform transition duration-300"
        active-class="bg-gray-200 font-bold" exact-active-class="bg-green-200 font-medium">
        <div class="border p-10 w-full mx-auto" :style="{ viewTransitionName: 'card' }">
            <div v-html="renderedContent" class="prose prose-xl max-w-2xl dark:prose-invert mx-auto"
                @DOMSubtreeModified="updateAnchors"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits, onBeforeUnmount, toRefs, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import Prism from 'prismjs' // Importando o PrismJS
import '~/assets/js/prism-custom.css';
import 'prismjs/components/prism-markup-templating.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-php.js';

const emit = defineEmits(['update-active-anchor']) // Emitir evento para atualizar link ativo
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
    return content.replace(/<h([1-6])>(.*?)<\/h\1>/g, (match, level, text) => {
        const id = text.toLowerCase().replace(/\s+/g, '-');
        return `<h${level} id="${id}">${text}</h${level}>`;
    });
});

const updateAnchors = () => {
    const headings = document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6')
    const anchors = Array.from(headings).map(heading => ({
        text: heading.innerText,
        id: heading.id || heading.innerText.toLowerCase().replace(/\s+/g, '-'),
        level: parseInt(heading.tagName.charAt(1))
    }))
    emit('update-anchors', anchors)
}

const fetchReadme = async (username, repo, version = 'main') => {
    const { public: { githubToken } } = useRuntimeConfig(); // Obtém o token de autenticação da configuração em tempo de execução
    const url = `https://api.github.com/repos/${username}/${repo}/contents/README.md${version ? '?ref=' + version : ''}`;
    const headers = { 
        Accept: 'application/vnd.github.v3.raw',
        Authorization: `Bearer ${githubToken}` // Adiciona o token de autenticação
    };

    try {
        const response = await fetch(url, { headers });

        if (!response.ok) {
            const errorMessage = response.status === 404
                ? `Nenhum commit encontrado para a referência ${version}. Consulte a documentação em https://docs.github.com/v3/repos/contents/`
                : 'A resposta da rede não foi ok';
            throw new Error(errorMessage);
        }

        readmeContent.value = await response.text();
    } catch (error) {
        console.error('Erro ao buscar o README:', error);
    }
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
