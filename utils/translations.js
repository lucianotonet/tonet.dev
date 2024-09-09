export const translations = {
  en: {
    about: {
      title: "About Me",
      description1: "Hello! I'm Luciano Tonet, a web developer passionate about creating innovative and efficient solutions. With solid experience in PHP, Laravel, and Vue.js, I'm always looking for new challenges and opportunities to learn and grow.",
      description2: "My journey in software development has led me to explore various technologies and frameworks, always with the goal of delivering high-quality products that solve real problems. Currently, I'm focused on integrating AI technologies into web applications, seeking to create more intelligent and personalized experiences."
    },
    projects: {
      title: "Recent Projects",
      version: "version",
      downloads: "downloads"
    },
    blog: {
      title: "Blog",
      latestPost: {
        title: "AI Agents with Laravel",
        description: "Exploring the creation of AI agents using Laravel and Groq",
        date: "August 30, 2024"
      }
    },
    skills: "Skills"
  },
  // Adicione outras línguas conforme necessário
}

export function useTranslation(lang = 'en') {
  return {
    t: (key) => {
      const keys = key.split('.')
      let value = translations[lang]
      for (const k of keys) {
        value = value[k]
        if (value === undefined) return key
      }
      return value
    }
  }
}