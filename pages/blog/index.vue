<template>
  <div class="lg:mt-48">
    <div v-for="post in posts" :key="post.id" class="mx-auto grid grid-cols-6 max-w-7xl items-center lg:py-12">      
      <!-- <div
        class="
          pointer-events-none
          select-none
          -z-10
          relative
          h-48
          lg:h-full
          col-span-6
          lg:col-span-3
          overflow-hidden
        "
      >
        <img
          :src="post.image" 
          class="w-full h-full object-cover pointer-events-none select-none sticky top-0"
        />
      </div> -->

      <div class="prose prose-slate lg:prose-xl px-12 col-span-6 lg:col-span-3 items-center">
        <small>{{ new Date(post.created_at).toLocaleDateString() }}</small>
        <NuxtLink :to="`/blog/${post.slug}`" class="no-underline">
          <h1 class="font-bold">
            {{ post.title }}
          </h1>
        </NuxtLink>
        <p>{{ post.excerpt }}</p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const posts = ref([]);
const url = ref("");

onMounted(() => {
  url.value = config.public.baseUrl + config.public.apiUrl;
  fetch(url.value + "/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      posts.value = data;
    });
});
</script>
