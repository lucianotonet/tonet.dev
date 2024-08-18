export default defineEventHandler(async (event) => {
    const repo = event.context.params.slug.split('/').slice(0, 2).join('/');
    let version = event.context.params.slug.split('/').slice(2, 3).join('/');
    version = version.replaceAll('-', '.');

    const runtimeConfig = useRuntimeConfig();
    const githubToken = runtimeConfig.githubToken;

    const response = await fetch(`https://api.github.com/repos/${repo}/contents/README.md${version ? '?ref=' + version : ''}`, {
        headers: {
            Accept: 'application/vnd.github.v3.raw',
            Authorization: `Bearer ${githubToken}` // Adiciona o token de autenticação
        }
    });

    if (!response.ok) {
        const errorMessage = response.status === 404
            ? `Nenhum commit encontrado para a referência ${version}. Consulte a documentação em https://docs.github.com/v3/repos/contents/`
            : 'A resposta da rede não foi ok';
        throw new Error(errorMessage);
    }

    return await response.text();
});
