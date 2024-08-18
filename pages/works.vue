<template>
    <div class="container mx-auto min-h-screen h-full flex justify-center items-center flex-col">
        <h1 class="text-3xl font-bold">Works</h1>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
onMounted(() => {
    route.meta.title = 'Works'
})
</script>