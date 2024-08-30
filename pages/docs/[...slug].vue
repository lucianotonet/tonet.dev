<template>
    <div>
        <ContentDoc />
    </div>
</template>

<script setup>
const { path } = useRoute()
const { data: page } = await useAsyncData(`content-${path}`, () => queryContent(path).findOne())
const route = useRoute()
definePageMeta({
    layout: 'docs'
});

onMounted(async () => {
    route.meta.title = page.value.title
    route.meta.description = ''
});
</script>