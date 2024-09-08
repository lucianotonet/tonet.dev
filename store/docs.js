import { reactive } from 'vue';

export const state = reactive({
    files: [],
    isLoading: false,
});

export const mutations = {
    SET_FILES(value) {
        state.files = value;
    },
    SET_LOADING(value) {
        state.isLoading = value;
    },
};

export const actions = {
    async fetchDocs(username, repo, dir, version = 'main') {
        mutations.SET_LOADING(true);
        version = version.replaceAll('.', '-');
        try {
            const response = await $fetch(`/api/github/docs/${username}/${repo}/${dir}?version=${version}`);

            let files = JSON.parse(response);
            mutations.SET_FILES(files);
            await actions.loadFileTitles(username,repo,version); // Chama a função para carregar os títulos
        } catch (error) {
            console.error('Erro ao buscar os arquivos markdown:', error);
        } finally {
            mutations.SET_LOADING(false);
        }
    },
    async loadFileTitles(username, repo, version) {
        for (const file of state.files) {
            let filePath = file.path
            if(file.title) continue;
            try {
                const contentResponse = await $fetch(`/api/github/docs/${username}/${repo}/${filePath}?version=${version}`);
                file.title = getFrontMatterTitle(contentResponse);
            } catch (error) {
                console.error(`Erro ao carregar o conteúdo do arquivo ${filePath}:`, error);
            }
        }
    },
};

const getFrontMatterTitle = (content) => {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = content.match(frontMatterRegex);
    if (match) {
        const frontMatterContent = match[1];
        const titleLine = frontMatterContent.split('\n').find(line => line.startsWith('title:'));
        if (titleLine) {
            const title = titleLine.split(':')[1].trim().replace(/^['"]|['"]$/g, '');
            return title; // Retorna apenas o título
        }
    }
    return null; // Retorna null se não houver front matter ou título
}

export const getters = {
    files: () => state.files,
    isLoading: () => state.isLoading,
};

export default {
    state,
    mutations,
    actions,
    getters,
};