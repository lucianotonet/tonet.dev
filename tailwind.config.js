/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
		"./app.vue",
	],
	theme: {
		extend: {
			colors: {
				'white': '#fffde7',
				'black': '#0d0d0d',
			},
			spacing: {
				'1': '0.25rem',
				'2': '0.5rem',
				'3': '0.75rem',
				'4': '1rem',
			},
			fontFamily: {
				sans: ['Fira Code', 'monospace'], // Fonte sans-serif mais bela
				mono: ['Fira Code', 'monospace'], // Fonte sans-serif mais bela
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}