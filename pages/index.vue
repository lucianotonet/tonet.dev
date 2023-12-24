<template>
  <div class="mx-auto h-full flex justify-center items-center flex-col bg-red-50 min-h-screen">
    <div class="prose w-full">
      <pre>{{ languages }}</pre>
      <pre>{{ langs }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langs: null,
      languages: null,
    };
  },
  async mounted() {
    this.languages = await fetch(
      'https://wakatime.com/share/@LucianoTonet/170a2813-0f7f-478d-bc1d-a8a9f0159a39.json',
    )
      .then((response) => response.json())
      .then((data) => {
        this.langs = data.data;
        return this.langs;
      });
  },
};
</script>