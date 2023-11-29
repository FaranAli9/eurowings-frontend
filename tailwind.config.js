/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: {
				primary: '#af1e65',
				dark: {
					primary: '#212529',
					secondary: '#6a6a6a'
				}
			}
		}
	},
	plugins: []
}
