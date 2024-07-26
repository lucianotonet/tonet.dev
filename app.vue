<template v-cloak>
  <div
    :class="['min-h-dvh w-full transition-opacity duration-300', isDarkMode ? 'dark bg-black text-white' : 'bg-white/50 text-black', 'font-mono flex flex-col']">

    <NuxtRouteAnnouncer />

    <div class="flex-grow flex-col flex items-center justify-center relative">
      <MainHeader />
      <NuxtPage />
      <MainFooter />
    </div>
  </div>
</template>

<script setup>
import { useState } from '#app';
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const isDarkMode = useState('isDarkMode', () => false);
const route = useRoute();
const router = useRouter();

watch(route, (to, from) => {
  // Transitions
  const navigate = () => router.push(to);
  
  if (document.startViewTransition) {
    document.startViewTransition(navigate);
  } else {
    navigate();
  }

  // Titles
  useHead({
    title: route.meta.title ? (route.meta.title + ' - LucianoTonet.dev') : 'LucianoTonet.dev'
  })  
});
</script>