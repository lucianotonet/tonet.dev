<!-- Start of Selection -->
<template>
    <nav v-if="anchors.length" class="mt-8">
        <h3 class="text-xl font-bold mb-4">Conteúdo</h3>
        <ul>
            <li v-for="anchor in anchors" :key="anchor.id" :style="{ marginLeft: (anchor.level - 1) * 20 + 'px' }">
                <a :href="`#${anchor.id}`" class="hover:underline" :class="{ 'font-bold': isActive(anchor.id) }">{{ anchor.text }}</a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    anchors: {
        type: Array,
        required: true
    },
    activeAnchor: {
        type: String,
        required: true
    }
});

const isActive = (id) => {
    return activeAnchor === id;
};
</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
<!-- End of Selection -->
