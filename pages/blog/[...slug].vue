<template>
  <div class="container mx-auto px-4 py-8">
    <article class="prose dark:prose-invert lg:prose-xl mx-auto">
      <img v-if="page.image"
        :src="page.image.startsWith('http') || page.image.startsWith('https') ? page.image : `${path}/${page.image}`.replace('//', '/')"
        :alt="page.title" class="w-full h-64 object-cover rounded-lg mb-8">
      <p class="text-xs text-gray-600 dark:text-gray-400">{{ formatDate(page.date) }} • {{ page.author }}</p>
      <ContentDoc />
    </article>
  </div>
</template>

<script setup>
const route = useRoute()
const { path } = useRoute()
const { data: page } = await useAsyncData(`content-${path}`, () => queryContent(path).findOne())

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(async () => {
  route.meta.title = 'Blog'
  route.meta.description = ''
});
</script>