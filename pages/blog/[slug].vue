<template>
  <div class="mt-0" v-if="post">
    <div class="pointer-events-none select-none overflow-hidden -z-10 relative bg-gray-50">
      <img
        :src="post.image"
        class="
          w-full
          h-96
          object-cover
          pointer-events-none
          select-none
          opacity-5
        "
      />
    </div>
    <div class="prose prose-slate mx-auto lg:prose-xl px-4 -mt-72">
      <small>{{ new Date(post.created_at).toLocaleDateString() }}</small>
      <h1 class="">
        {{ post.title }}
      </h1>
      <img
        :src="post.image"
        class="w-full h-auto object-cover align-center rounded lg:scale-105"
      />
      <!-- <h3 class="">
        {{ post.excerpt }}
      </h3> -->
    </div>
    <br />
    <article
      class="prose prose-slate mx-auto lg:prose-xl px-4"
      v-html="post.body"
    />
    <br />
    <div class="prose prose-slate mx-auto lg:prose-xl px-6 lg:px-4 ">
      <small>
        Published at {{ new Date(post.created_at).toLocaleDateString() }}
      </small>
      <br />
      <div class="flex items-center space-x-3 max-w-3xl mx-auto">
        <img
          class="w-12 h-12 rounded-full"
          src="https://i.pravatar.cc/"
          alt="author avatar"
        />
        <div class="flex flex-col">
          <small class="font-bold text-2xl">{{
            post.author?.name ?? "Luciano Tonet"
          }}</small>
          <small class="text-gray-500">Author</small>
        </div>
      </div>
    </div>
    <br />
    <hr />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const post = ref([]);
const url = ref("");

onMounted(() => {
  url.value = config.public.baseUrl + config.public.apiUrl;
  fetch(`${url.value}/posts/${useRoute().params.slug}`)
    .then((res) => res.json())
    .then((data) => {
      post.value = data;
    });
});
</script>
