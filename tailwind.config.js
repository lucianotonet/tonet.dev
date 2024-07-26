/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
	],
	theme: {
		extend: {
			colors: {
				'white': '#fffde7', // Amarelado menos intenso
				'black': '#0d0d0d', // Preto um pouco mais escuro
			},
			spacing: {
				'1': '0.25rem', // Reduzir espaçamento vertical
				'2': '0.5rem',  // Reduzir espaçamento vertical
				'3': '0.75rem', // Reduzir espaçamento vertical
				'4': '1rem',    // Reduzir espaçamento vertical
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}