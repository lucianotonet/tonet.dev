<template>
    <div class="container max-w-7xl flex flex-col items-center sm:flex-row md:flex-col gap-6">
        <div class="flex flex-col md:pt-10">
            <img :src="user.avatar_url" alt="Perfil" class="md:-ml-14 flex w-full" />
        </div>
        <div class="flex flex-col gap-6 px-4 max-w-96 md:max-w-3xl">
            <div>
                <h2 class="text-5xl font-bold">{{ user.name }}</h2>
                <p class="text-sm text-gray-400">@{{ user.login }}</p>
            </div>
            <p class="mb-4 text-xl leading-tight">{{ user.bio }}</p>
            <div class="text-sm">
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <span>{{ user.company }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <span>{{ user.location }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <span>{{ time }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const user = ref({});
const time = ref(new Date().toLocaleTimeString());

const fetchUserData = async () => {
    try {
        const response = await fetch('https://api.github.com/users/lucianotonet');
        if (response.ok) {
            user.value = await response.json();
        } else {
            console.error('Erro ao buscar dados do usuário:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
    }
};

onMounted(() => {
    fetchUserData();
    setInterval(() => {
        time.value = new Date().toLocaleTimeString();
    }, 1000);
});
</script>