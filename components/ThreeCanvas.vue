<template>
  <div
    :class="focus ? 'w-full h-full' : 'relative w-full h-full'"
    @click="toggleFocus"
  >
    <canvas
      ref="canvas"
      :class="focus ? 'w-full h-full' : 'absolute top-0 left-0 w-full h-full'"
    ></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// Função para buscar dados do WakaTime
async function fetchData() {
  const [activityDataRaw, langsDataRaw, categoriesDataRaw] = await Promise.all([
    fetch("https://wakatime.com/share/@LucianoTonet/3e93f1f3-5bc2-4704-ae99-a797377ad44b.json"),
    fetch("https://wakatime.com/share/@LucianoTonet/170a2813-0f7f-478d-bc1d-a8a9f0159a39.json"),
    fetch("https://wakatime.com/share/@LucianoTonet/5044517e-8985-4ed7-a89b-8d31dabd924b.json"),
  ]);

  return {
    activityData: await activityDataRaw.json(),
    langsData: await langsDataRaw.json(),
    categoriesData: await categoriesDataRaw.json(),
  };
}
</script>