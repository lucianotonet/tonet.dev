<!-- Start of Selection -->
<template>
    <div>
        <label for="version-select" class="text-xl font-bold mb-4">Versão</label>
        <div class="flex items-center">
            <select v-model="selectedVersion" @change="loadVersion" id="version-select"
                class="form-select mt-1 block w-full py-2 px-3 border border-primary-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-black/60 focus:border-black/60 dark:focus:ring-white/60 dark:focus:border-white/60 sm:text-sm">
                <option value="main" selected>Próxima Versão</option>
                <option v-for="version in releases" :key="version" :value="version">{{ version }}</option>
            </select>
            <a :href="`https://github.com/lucianotonet/${props.repo}/tree/${selectedVersion}`" target="_blank"
                class="ml-4 text-primary-500 hover:text-primary-700" title="Ver no GitHub">
                <GithubLogoIcon class="h-8 w-8" />
            </a>
        </div>
        <div v-if="isOldVersion" class="mt-2 flex items-center">
            <span class="text-red-500 text-xs">⚠️ Versão antiga</span>
        </div>
        <div v-if="isNotReleasedVersion" class="mt-2 flex items-center">
            <span class="text-yellow-700 text-xs">⚠️ Ainda não lançada</span>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, onMounted, watch } from 'vue';
import { GithubLogoIcon } from '@radix-icons/vue'

const props = defineProps(['repo']); // Recebe a prop 'repo' para alternar entre groq-php e groq-laravel
const route = useRoute();
const releases = ref([]);
const selectedVersion = ref('main');
const isOldVersion = ref(false);
const isNotReleasedVersion = ref(false);

const emit = defineEmits(['update-version']);
const fetchVersions = async () => {
    try {
        let url = `api/github/tags/lucianotonet/${props.repo}.json`
        const response = await $fetch(`api/github/tags/lucianotonet/${props.repo}.json`);
        
        releases.value = response.map(release => release.name);

        const versionFromUrl = route.query.version;
        if (versionFromUrl && (releases.value.includes(versionFromUrl) || versionFromUrl === 'main')) {
            selectedVersion.value = versionFromUrl; // Carrega a versão passada por query string, incluindo 'main'
        } else {
            selectedVersion.value = releases.value[0]; // Define a última versão como padrão
        }
    } catch (error) {
        console.error('Erro ao buscar versões', error);
    }
}

const loadVersion = () => {
    isOldVersion.value = selectedVersion.value !== releases.value[0] && selectedVersion.value !== 'main';
    isNotReleasedVersion.value = selectedVersion.value === 'main';

    // Atualiza o query string sem usar route.push
    const url = new URL(window.location);
    url.searchParams.set('version', selectedVersion.value);
    window.history.replaceState({}, '', url);  
    
    // Emitir a versão selecionada
    emit('update-version', selectedVersion.value);
};

onMounted(() => {
    fetchVersions();
    const versionFromUrl = route.query.version; // Obtém a versão do query string ao iniciar
    if (versionFromUrl) {
        selectedVersion.value = versionFromUrl; // Carrega a versão passada por query string
    }

    isOldVersion.value = selectedVersion.value && selectedVersion.value !== releases.value[0] && selectedVersion.value !== 'main';
    isNotReleasedVersion.value = selectedVersion.value === 'main';    
})

watch(selectedVersion, (newVersion) => {
    if (newVersion) {
        loadVersion();
    }
})
</script>