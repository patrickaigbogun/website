import { getPage } from '@/lib/cms/sanity';
import { ContactForm } from '@/components/contactform';
import { montserrat } from '@/fonts/fonts';
import { NavBtn } from '@/components/NavBtn';
import { PortableText } from '@portabletext/react';

interface Props {
	params: { slug: string };
}

export default async function Page({ params }: Props) {
	const page = await getPage(params.slug);

	return (
		<div className='mb-10 w-full md:w-[75%] mx-auto'>
			<header className='flex items-center justify-start gap-2 p-0 my-2 '>
				<NavBtn direction='back'> Previous Page</NavBtn>
			</header>

			<section className='flex flex-col items-center w-full text-center'>
				<h1
					className={` ${montserrat.className} my-14 text-white text-5xl font-bold`}
				>
					{page.title}
				</h1>

				{page.image ? (
					<img
						src={page.image}
						alt={page.alt}
						className='object-contain border-2 border-gray-900 rounded-full w-52 h-52'
					/>
				) : (
					<p />
				)}

				<div className='mt-10 text-lg prose text-white transition prose-strong:text-white prose-headings:text-white prose-a:text-white p prose-a:underline prose-a:decoration-green-500'>
					<PortableText value={page.content} />
				</div>
			</section>
			{page.slug === 'contact' && (
				<div className='my-6'>
					<ContactForm />
				</div>
			)}
		</div>
	);
}
