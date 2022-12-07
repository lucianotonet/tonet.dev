<template>
	<div>
		<NuxtLink to="/">
			Home
		</NuxtLink>
		<h1>Posts</h1>
		<div v-for="post in posts"
			:key="post.id">
			<NuxtLink :to="`/blog/${post.slug}`">
				<h3>{{ post.title }}</h3>
			</NuxtLink>
			<small>
				{{ post.created_at }}
			</small>
			<br>
			<img :src="post.image" />
			<p>{{ post.body }}</p>
		</div>
	</div>
</template>

<script setup>
const posts = ref([])

onMounted(() => {
	fetch('https://admin.tonet.test/api/posts')
		.then(res => res.json())
		.then(data => {
			posts.value = data
		})
})
</script>
