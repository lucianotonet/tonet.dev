<template v-cloak>
  <div
    :class="['min-h-dvh w-full transition-opacity duration-300', isDarkMode ? 'dark bg-black text-white' : 'bg-white/50 text-black', 'flex flex-col']">

    <NuxtRouteAnnouncer />

    <MainHeader />

    
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    

    <MainFooter />

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
});
</script>