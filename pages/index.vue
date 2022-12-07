<template>
	<div>
		<NuxtLink to="/blog">
			Blog
		</NuxtLink>
		<pre>{{ api }}</pre>
	</div>
</template>

<script setup>
const api = ref([])

onMounted(() => {
	fetch('https://admin.tonet.test')
		.then(res => res.json())
		.then(data => api.value = data)
})
</script>
