import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const username = event.context.params.username
  const runtimeConfig = useRuntimeConfig()
  const githubToken = runtimeConfig.githubToken

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `Erro ao buscar dados do usuário: ${response.statusText}`
      })
    }

    const userData = await response.json()
    return userData
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno ao buscar dados do usuário'
    })
  }
})