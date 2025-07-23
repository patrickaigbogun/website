import type { Metadata } from 'next';
import '../globals.css';
import { Footer } from '@/components/footer';
import { getPages } from '@/sanity/sanity-utils';
import Header from '@/components/header';

import { nunito } from '@/fonts/fonts';
import { div } from 'framer-motion/client';

export const metadata: Metadata = {
	title: 'A simple portfolio',
	description: 'personal website made with nextjs and sanitystudio',
};

export default async function PortfolioLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pages = await getPages();

	return (
		<div
			className={`h-screen bg-black p-5 sm:p-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-gray-700/20 scrollbar-thumb-green-900/60 ${nunito.className} `}
		>
			<div className='mx-auto'>
				<Header pages={pages} />
				<main className='py-20'>{children}</main>
				<Footer />
			</div>
		</div>
	);
}
