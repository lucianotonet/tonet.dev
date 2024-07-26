<template>
  <article v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.description }}</p>
    <div v-html="post.body"></div>
  </article>
</template>

<script setup>
import { useAsyncData, useRoute } from 'nuxt'
import { queryContent } from '@nuxt/content'

const route = useRoute()
const { data: post } = useAsyncData(() => queryContent(route.params.pathMatch).findOne())
</script>
