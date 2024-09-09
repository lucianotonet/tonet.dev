<template>
    <nav v-if="anchors.length" class="sticky top-20 sidebar mt-8 text-xs w-full">
        <h3 class="uppercase font-bold mb-4">Content</h3>
        <ul class="flex flex-col gap-1">
            <li v-for="anchor in anchors" :key="anchor.hash"
                :class="{ 'ml-2': anchor.level > 1, 'ml-4': anchor.level > 2 }">
                <a @click.prevent="smoothScrollTo(anchor.hash)" :class="['hover:cursor-pointer hover:underline', 
                             anchor.level === 1 ? 'font-bold' : '',
                             anchor.level === 2 ? 'font-semibold' : '',
                             'dark:text-white/60 text-black/60 max-w-24 overflow-hidden']">
                    <span class="break-words">{{ anchor.text }}</span>
                </a>
            </li>
        </ul>

        <div class="mt-8 ">
            <a href="#" @click.prevent="scrollToTop" class="text-primary-500 hover:text-primary-700">
                <span class="break-words">Voltar ao topo</span>
            </a>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';

const anchors = ref([]);

onMounted(() => {
    setAnchors();
});

const setAnchors = () => {
    anchors.value = [];

    const headings = document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6');

    headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        anchors.value.push({
            text: heading.textContent,
            hash: `#${heading.id}`,
            level: level
        });
    });
};

const smoothScrollTo = (hash) => {
    const targetElement = document.querySelector(hash); // Usando hash diretamente para selecionar o elemento

    if (targetElement) {
        const offset = 75;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
        });
        history.pushState(null, '', hash); // Atualiza a hash na URL dinamicamente
    }
};

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

</script>
