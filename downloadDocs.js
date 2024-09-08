const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
require('dotenv').config();

const REPOS = ['cartesia-php', 'groq-php', 'groq-laravel'];
const GITHUB_API = 'https://api.github.com/repos/lucianotonet';
const GITHUB_TOKEN = process.env.NUXT_GITHUB_TOKEN;

const axiosInstance = axios.create({
  headers: {
    'Authorization': `token ${GITHUB_TOKEN}`
  }
});

async function downloadDocs() {
  for (const repo of REPOS) {
    try {
      const latestVersion = await getLatestVersion(repo);
      const hasDocsDir = await checkDocsDirectory(repo, latestVersion);
      
      if (hasDocsDir) {
        await downloadVersion(repo, latestVersion);
        console.log(chalk.green(`✓ Documentação da última versão (${latestVersion}) do repositório ${repo} baixada com sucesso.`));
      } else {
        console.log(chalk.yellow(`⚠ O diretório 'docs' não existe na versão ${latestVersion} do repositório ${repo}. Pulando...`));
      }
    } catch (error) {
      console.error(`Erro ao baixar a documentação do repositório ${repo}:`, error.message);
    }
  }
}

async function getLatestVersion(repo) {
  const response = await axiosInstance.get(`${GITHUB_API}/${repo}/releases/latest`);
  return response.data.tag_name;
}

async function checkDocsDirectory(repo, version) {
  try {
    await axiosInstance.get(`${GITHUB_API}/${repo}/contents/docs?ref=${version}`);
    return true;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false;
    }
    throw error;
  }
}

async function downloadVersion(repo, version) {
  const docsPath = path.join('content', repo, 'docs');
  await fs.ensureDir(docsPath);
  await downloadDirectory(repo, version, 'docs', docsPath);
}

async function downloadDirectory(repo, version, dir, localPath) {
  try {
    const response = await axiosInstance.get(`${GITHUB_API}/${repo}/contents/${dir}?ref=${version}`);
    
    for (const item of response.data) {
      if (item.type === 'file') {
        await downloadFile(item.download_url, path.join(localPath, item.name));
        console.log(chalk.green(`✓ Arquivo ${item.name} baixado com sucesso para ${localPath}`));
      } else if (item.type === 'dir') {
        const newLocalPath = path.join(localPath, item.name);
        await fs.ensureDir(newLocalPath);
        await downloadDirectory(repo, version, item.path, newLocalPath);
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log(`O diretório ${dir} não existe na versão ${version} do repositório ${repo}.`);
    } else {
      throw error;
    }
  }
}

async function downloadFile(url, filePath) {
  const response = await axiosInstance.get(url);
  const content = response.data;
  await fs.outputFile(filePath, content);
}

downloadDocs().catch(console.error);