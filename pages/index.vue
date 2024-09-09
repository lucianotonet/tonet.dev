<template>
  <div class="w-full max-w-7xl mx-auto px-4 py-12">
    <div class="flex flex-col md:flex-row gap-12">
      <div class="md:w-1/3">
        <UserProfile />
      </div>
      <div class="md:w-2/3">
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6">{{ t('about.title') }}</h2>
          <p class="text-lg mb-4">
            {{ t('about.description1') }}
          </p>
          <p class="text-lg">
            {{ t('about.description2') }}
          </p>
        </section>

        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6">{{ t('projects.title') }}</h2>
          <div class="grid gap-6">
            <NuxtLink v-for="project in projects" :key="project.name" :to="project.link"
              class="card hover:-translate-x-1 dark:bg-white/5 p-5 group rounded-lg shadow-md w-full transform transition duration-300">
              <div class="border p-6 w-full mx-auto">
                <h3 class="text-2xl font-bold mb-2">{{ project.name }}</h3>
                <p class="text-lg text-gray-600 dark:text-gray-400 mb-2">{{ project.description }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  v{{ project.version }} • {{ project.downloads }} {{ t('projects.downloads') }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </section>

        <section>
          <h2 class="text-3xl font-bold mb-6">{{ t('blog.title') }}</h2>
          <div class="grid gap-6">
            <small>Coming soon...</small>
            <!-- <NuxtLink to="/blog/agentes-ia-laravel-groq" class="card hover:-translate-x-1 dark:bg-white/5 p-5 group rounded-lg shadow-md w-full transform transition duration-300">
              <div class="border p-6 w-full mx-auto">
                <h3 class="text-2xl font-bold mb-2">{{ t('blog.latestPost.title') }}</h3>
                <p class="text-lg text-gray-600 dark:text-gray-400 mb-2">
                  {{ t('blog.latestPost.description') }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ t('blog.latestPost.date') }}</p>
              </div>
            </NuxtLink> -->
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useLanguage } from '~/composables/useLanguage';
import { useTranslation } from '~/utils/translations';

const { currentLanguage } = useLanguage();
const { t } = computed(() => useTranslation(currentLanguage.value)).value;

const projects = ref([
  { name: 'Groq-PHP', link: '/groq-php', description: '', version: '0.0.0', downloads: 0 },
  { name: 'Groq-Laravel', link: '/groq-laravel', description: '', version: '0.0.0', downloads: 0 },
  { name: 'Cartesia-PHP', link: '/cartesia-php', description: '', version: '0.0.0', downloads: 0 },
]);

const fetchProjectData = async () => {
  const packages = ['groq-php', 'groq-laravel', 'cartesia-php'];
  
  for (const pkg of packages) {
    try {
      const response = await fetch(`https://packagist.org/packages/lucianotonet/${pkg}.json?v=${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        const project = projects.value.find(p => p.link === `/${pkg}`);
        if (project) {
          project.description = data.package.description;
          const versions = Object.keys(data.package.versions);
          versions.shift(); // Remove o primeiro item (dev-main)
          project.version = versions[0];
          project.downloads = data.package.downloads.total;
        }
      }
    } catch (error) {
      console.error(`Erro ao buscar dados para ${pkg}:`, error);
    }
  }
};

onMounted(() => {
  fetchProjectData();
});

useHead({
  title: 'Luciano Tonet - Web Developer & AI Enthusiast'
});
</script>