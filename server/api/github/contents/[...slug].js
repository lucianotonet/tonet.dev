export default defineEventHandler(async (event) => {
    try {
        const repo = event.context.params.slug.split('/').slice(0, 2).join('/');
        let version = event.context.params.slug.split('/').slice(2, 3).join('/');
        version = version.replaceAll('-', '.');

        const runtimeConfig = useRuntimeConfig();
        const githubToken = runtimeConfig.githubToken;

        if (!githubToken) {
            console.warn('GitHub token não encontrado');
            return '';
        }

        const response = await fetch(`https://api.github.com/repos/${repo}/contents/README.md${version ? '?ref=' + version : ''}`, {
            headers: {
                Accept: 'application/vnd.github.v3.raw',
                Authorization: `token ${githubToken}`
            }
        });

        if (!response.ok) {
            console.warn(`Erro ao buscar conteúdo: ${response.status} ${response.statusText}`);
            return '';
        }

        return await response.text();
    } catch (error) {
        console.error('Erro ao buscar conteúdo:', error);
        return '';
    }
});
