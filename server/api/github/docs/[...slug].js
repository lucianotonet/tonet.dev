export default defineEventHandler(async (event) => {
    const repo = event.context.params.slug.split('/').slice(0, 2).join('/');
    const file = event.context.params.slug.split('/').slice(2).join('/'); // O file agora é todo o caminho restante após o repo
    const query = event._path.split('?')[1];
    // Pega a query string
    let version = query ? query.split('=')[1] : ''; // Se tiver query, pega a versão da query
    version = version.replaceAll('-', '.');


    const runtimeConfig = useRuntimeConfig();
    const githubToken = runtimeConfig.githubToken;

    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${file}${version ? '?ref=' + version : ''}`, {
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
