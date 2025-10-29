import type { Metadata } from 'next';
import '../globals.css';
import { nunito } from '@/fonts/fonts';
// import { getAuthors, urlFor } from '@/lib/cms/sanity';
import LandingHeader from '@/components/ui/header';

export const metadata: Metadata = {
	title: 'Patrick Aigbogun, Oti. Blog',
	description: 'I talk about things.',
};

export default async function BlogLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// const authors = await getAuthors();

	return (
		<div className='flex flex-col min-h-screen bg-bg text-text'>
			<section className={`${nunito.className} `}>
				<LandingHeader />
				<main className=' mx-auto w-[90%] sm:w-[85%] py-12  '>
					{children}
				</main>
			</section>
		</div>
	);
}
