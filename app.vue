<template>
  <div
    :class="['min-h-dvh w-full transition-opacity duration-300', isDarkMode ? 'dark bg-black text-white' : 'bg-white/50 text-black', 'flex flex-col']">
    <MainHeader />
    <NuxtPage/>
    <MainFooter />
  </div>
</template>

<script setup>
import { useState } from '#app';

const isDarkMode = useState('isDarkMode', () => false);
</script>