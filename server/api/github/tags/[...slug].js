export default defineEventHandler(async (event) => {
  try {
    let repo = event.context.params.slug
    repo = repo.replace('.json', '');

    const runtimeConfig = useRuntimeConfig();
    const githubToken = runtimeConfig.githubToken;

    if (!githubToken) {
      console.warn('GitHub token não encontrado');
      return [];
    }

    const response = await $fetch(`https://api.github.com/repos/${repo}/tags`, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    return response || [];
  } catch (error) {
    console.error('Erro ao buscar tags:', error);
    return [];
  }
});
