<template>
	<div v-if="post">
		<NuxtLink to="/">
			Home
		</NuxtLink>
		<NuxtLink to="/blog">
			Blog
		</NuxtLink>
		<article>
			<h1>{{ post.title }}</h1>
			<small>
				{{ Date(post.created_at) }}
			</small>
			<br>
			<img :src="post.image" />
			<p>{{ post.body }}</p>
		</article>

	</div>
</template>

<script setup>
const post = ref([])

onMounted(() => {
	fetch(`https://admin.tonet.test/api/posts/${useRoute().params.slug}`)
		.then(res => res.json())
		.then(data => {
			post.value = data
		})
})
</script>
