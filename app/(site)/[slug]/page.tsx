
import { getPage } from "@/sanity/sanity-utils";
import LoadingUI from "@/components/loadingui";
import { ContactForm } from "@/components/contactform";
import { montserrat } from "@/fonts/fonts";
import { NavBtn } from "@/components/NavBtn";
import RedirectButton from "@/components/RedirectButton";
import { Suspense } from "react";
import { PortableText } from "@portabletext/react";

interface Props {
	params: { slug: string };
};

export default async function Page({ params }: Props) {
	const blogUrl = '/blog'
	const page = await getPage(params.slug);

	return (
		<div className="mb-10 w-full md:w-[75%] mx-auto">
			<header className="flex items-center justify-start gap-2 p-0 my-2 ">
				<NavBtn direction="back" > Previous Page</NavBtn>
			</header>
			<Suspense fallback={<LoadingUI />}>
				<h1 className={` ${montserrat.className} my-14 text-white text-5xl font-bold`}>{page.title}</h1>

				<div className="mt-10 text-lg prose text-white transition prose-strong:text-white prose-headings:text-white prose-a:text-white p prose-a:underline prose-a:decoration-green-500">
					<PortableText value={page.content} />
				</div>

				<div className="my-6">
					{page.slug === "contact" && (
						<ContactForm />
					)}
					{page.slug === "cave-experience" && (
						<RedirectButton target={blogUrl} >
							Going to Blog
						</RedirectButton>
					)}
				</div>
			</Suspense>
		</div>
	);
}
