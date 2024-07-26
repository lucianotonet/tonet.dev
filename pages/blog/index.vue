<template>
  <div>
    <h1>Blog</h1>
    <div v-for="post in posts" :key="post._path">
      <NuxtLink :to="post._path">
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useAsyncData } from 'nuxt'
import { queryContent } from '@nuxt/content'

const { data: posts } = useAsyncData(() => queryContent().find())
</script>
