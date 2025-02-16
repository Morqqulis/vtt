import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class'],
	content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				background: {
					DEFAULT: '#ffffff',
					dark: '#121212',
				},
				foreground: {
					DEFAULT: '#000000',
					dark: '#ffffff',
				},
				card: {
					DEFAULT: '#ffffff',
					dark: '#181818',
				},
				'card-hover': {
					DEFAULT: '#f7f7f7',
					dark: '#282828',
				},
				muted: {
					DEFAULT: '#f3f4f6',
					dark: '#2a2a2a',
					foreground: '#6b7280',
				},
				accent: {
					DEFAULT: '#1DB954', // Spotify green
					dark: '#1DB954',
					foreground: '#ffffff',
				},
				destructive: {
					DEFAULT: '#dc2626',
					dark: '#dc2626',
					foreground: '#ffffff',
				},
				input: {
					DEFAULT: '#e5e7eb',
					dark: '#404040',
				},
				border: {
					DEFAULT: '#e5e7eb',
					dark: '#404040',
				},
			},
		},
	},
	plugins: [],
} satisfies Config

export default config
