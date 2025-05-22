<template>
    <div class="min-h-screen">
        <slot />
    </div>
</template>

<script setup>
import { useState } from '#app';

const isDarkMode = useState('isDarkMode', () => false);
</script> 