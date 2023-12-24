<template>
  <div class="relative min-h-screen">
    <header
      class="mb-4 p-4 flex justify-between items-center lg:fixed w-full top-0"
    >
      <NuxtLink to="/"><h1 class="text-3xl font-bold">Tonet.dev</h1></NuxtLink>

      <nav class="">
        <NuxtLink to="/"> Home </NuxtLink>
        <NuxtLink to="/blog"> Blog </NuxtLink>
      </nav>
    </header>

    <slot />
  </div>
</template>