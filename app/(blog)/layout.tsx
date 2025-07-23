import type { Metadata } from 'next';
import '../globals.css';
import { nunito } from '@/fonts/fonts';
import { BlogHeader } from '@/components/blogheader';
import { getAuthorImage } from '@/sanity/sanity-utils';
import BlogFooter from '@/components/blogfooter';

// import DraggableWrapper from "@/components/dragwrapper";
// import FloatingIsland from "@/components/floatingisland";
// import DraggableSidebar from "@/components/testercomponent";

export const metadata: Metadata = {
	title: 'Patrick Aigbogun, Oti. Blog',
	description:
		'Personal blog where i discuss technologies, philosophy and poetry',
};

export default async function BlogLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const author = await getAuthorImage();
	if (!author) {
		console.warn('Author not found');
		return (
			<div>
				<p>Author not found.</p>
			</div>
		);
	}

	return (
		<div className='flex flex-col min-h-screen overflow-y-scroll bg-[#0C0218] text-[#c8c2cc] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-gray-700/20 scrollbar-thumb-[#ded1ff]/30'>
			<section className={` flex-grow ${nunito.className} `}>
				<BlogHeader image={author.image} name={author.name} />
				{/* <DraggableWrapper  Top={200} Left={15}> */}
				{/* <FloatingIsland /> */}
				{/* </DraggableWrapper> */}
				{/* <DraggableSidebar /> */}
				<main className=' mx-auto flex-grow w-[90%] sm:w-[85%] py-12  '>
					{children}
				</main>
				<BlogFooter />
			</section>
		</div>
	);
}
