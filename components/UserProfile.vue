<template>
    <div v-show="user.name" class="container max-w-7xl flex flex-col items-center sm:flex-row md:flex-col gap-6">
        <div class="flex flex-col md:pt-10">
            <img :src="user.avatar_url" alt="Perfil" class="md:-ml-14 flex w-full" />
        </div>
        <div class="flex flex-col gap-6 px-4 max-w-96 md:max-w-3xl">
            <div>
                <h2 class="text-5xl font-bold">{{ user.name }}</h2>
                <p class="text-sm text-gray-400">@{{ user.login }}</p>
            </div>
            <p class="mb-4 text-xl leading-tight">{{ user.bio }}</p>
            <div class="text-sm flex items-center gap-4">
                <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank"
                    rel="noopener noreferrer" class="text-primary-500 transition-colors duration-300">
                    <component v-if="social.name === 'Twitter'" :is="social.icon" class="size-8" />
                    <component v-else-if="typeof social.icon === 'object'" :is="social.icon" class="size-10" />
                    <component v-else :is="social.icon" class="size-8" />
                </a>
            </div>
            <div class="mt-4">
                <h3 class="text-2xl font-semibold mb-2">{{ t('skills') }}</h3>
                <div class="flex flex-wrap gap-2">
                    <span v-for="skill in skills" :key="skill"
                        class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">{{ skill }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon} from '@radix-icons/vue'
import YouTube from '~/components/icons/YouTube.vue'
import X from '~/components/icons/X.vue'
import { useLanguage } from '~/composables/useLanguage';
import { useTranslation } from '~/utils/translations';

const user = ref({});
const time = ref(new Date().toLocaleTimeString());

const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/lucianotonet', icon: GithubLogoIcon },
    { name: 'Instagram', url: 'https://instagram.com/lucianotonet', icon: InstagramLogoIcon },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/lucianotonet', icon: LinkedinLogoIcon },
    { name: 'Twitter', url: 'https://x.com/lucianotonet', icon: X },
    { name: 'YouTube', url: 'https://youtube.com/@lucianotonet', icon: YouTube },
];

const skills = [
    'PHP', 'Laravel', 'Vue.js', 'Nuxt.js', 'JavaScript', 'TypeScript', 'API Development', 'AI Integration'
];

const fetchUserData = async () => {
    try {
        const response = await fetch('/api/github/user/lucianotonet');
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

const { currentLanguage, setLanguage } = useLanguage();

// Usando computed para tornar a tradução reativa às mudanças de idioma
const { t } = computed(() => useTranslation(currentLanguage.value)).value;

const changeLanguage = (lang) => {
    setLanguage(lang);
};
</script>