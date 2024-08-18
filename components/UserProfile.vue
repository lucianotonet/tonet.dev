<template>
    <div v-show="user.name" class="container max-w-7xl flex flex-col items-center sm:flex-row md:flex-col gap-6">
        <div class="flex flex-col md:pt-10">
            <img :src="user.avatar_url" alt="Perfil"
                class="md:-ml-14 flex w-full  transition-all duration-100 ease-in-out" />
        </div>
        <div class="flex flex-col gap-6 px-4 max-w-96 md:max-w-3xl">
            <div>
                <h2 class="text-5xl font-bold">{{ user.name }}</h2>
                <p class="text-sm text-gray-400">@{{ user.login }}</p>
            </div>
            <p class="mb-4 text-xl leading-tight">{{ user.bio }}</p>
            <div class="text-sm flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <a href="https://github.com/lucianotonet" target="_blank" rel="noopener noreferrer">
                        <GithubLogoIcon class="size-8" />
                    </a>
                </div>
                <div class="flex items-center gap-2">
                    <a href="https://instagram.com/lucianotonet" target="_blank" rel="noopener noreferrer">
                        <InstagramLogoIcon class="size-8" />
                    </a>
                </div>
                <div class="flex items-center gap-2">
                    <a href="https://linkedin.com/in/lucianotonet" target="_blank" rel="noopener noreferrer">
                        <LinkedinLogoIcon class="size-8" />
                    </a>
                </div>
                

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { BellIcon, PinTopIcon, GithubLogoIcon, InstagramLogoIcon, TwitterLogoIcon, LinkedinLogoIcon } from '@radix-icons/vue'
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