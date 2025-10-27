import typography from '@tailwindcss/typography';

export default {
	theme: {
		extend: {
			fontFamily: {
				nunito: ['var(--font-nunito)', 'sans-serif'],
				montserrat: ['var(--font-montserrat)', 'sans-serif'],
			},
		},
	},
	plugins: [typography],
};
