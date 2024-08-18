export default defineEventHandler(async (event) => {
  const repo = event.context.params.slug

  const runtimeConfig = useRuntimeConfig();
  const githubToken = runtimeConfig.githubToken;

  const response = await $fetch(`https://api.github.com/repos/${repo}/tags`, {
    headers: {
      'Authorization': `Bearer ${githubToken}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  if (!response) {
    throw createError({ statusCode: 404, statusMessage: 'Erro ao buscar versões' });
  }

  return response.map(release => release.name);
});
