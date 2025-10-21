import typography from '@tailwindcss/typography';
import tailwindscrollbar from 'tailwind-scrollbar';

export default {
	theme: {
		extend: {
			fontFamily: {
				nunito: ['var(--font-nunito)', 'sans-serif'],
				montserrat: ['var(--font-montserrat)', 'sans-serif'],
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
