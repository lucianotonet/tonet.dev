<template>
    <div class="w-full mx-auto mt-auto items-center justify-center overflow-hidden relative">
        <div class="bg-gradient-to-b from-transparent to-white dark:to-black opacity-95 absolute inset-0 h-full z-10"></div>
        <div class="bg-gradient-to-r from-left to-right from-white to-white dark:from-black dark:to-black dark:via-transparent via-transparent opacity-95 absolute inset-0 h-full z-10"></div>
        <img :src="isDarkMode ? '/github-user-contribution-dark.svg' : '/github-user-contribution.svg'" alt="github-user-contribution" class="w-full transform scale-105 transition-all duration-300 md:-mb-24 z-0">
    </div>
</template>

<script setup>
import { useState } from '#app';

const isDarkMode = useState('isDarkMode', () => false);
</script>