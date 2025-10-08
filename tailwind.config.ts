import typography from '@tailwindcss/typography';
import tailwindscrollbar from 'tailwind-scrollbar';

export default {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				nunito: ['var(--font-nunito)', 'sans-serif'],
				montserrat: ['var(--font-montserrat)', 'sans-serif'],
			},
			colors: {
				bg: 'var(--bg)',
				bgDark: 'var(--bg-dark)',
				bgLight: 'var(--bg-light)',

				text: 'var(--text)',
				textMuted: 'var(--text-muted)',

				highlight: 'var(--highlight)',

				border: 'var(--border)',
				borderMuted: 'var(--border-muted)',

				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				danger: 'var(--danger)',
				warning: 'var(--warning)',
				success: 'var(--success)',
				info: 'var(--info)',
			},
		},
	},
	plugins: [
		typography,
		tailwindscrollbar({
			nocompatible: true,
			preferredStrategy: 'pseudoelements',
		}),
	],
};
