"use client"

import { getPage } from "@/sanity/sanity-utils";
import { PortableText } from "next-sanity";
import { useEffect, useState } from "react"; // Import React hooks for async rendering
import LoadingUI from "../components/loadingui";
import ContactForm from "../components/contactform";
import { montserrat } from "@/fonts/fonts";
import BackBtn from "../components/BackButton";
// import Link from "next/link";

type PageProps = {
	params: { slug: string };
};

export default function Page({ params }: PageProps) {
	const [page, setPage] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPage = async () => {
			try{
				const fetchedPage = await getPage(params.slug);
			setPage(fetchedPage);
			}
			catch (error) {
				console.error("Error fetching page:", error);
				setError("Error loading page");
			}
		};

		fetchPage();
	}, [params.slug]);

	if (error) {
		return <div className="text-white">{error}</div>;
	};

	if (!page) {
		return <LoadingUI />; // Placeholder for loading state
	}

	return (
		<div className="mb-10 w-full md:w-[75%] mx-auto">
			<header className="flex items-center justify-start gap-2 p-0 my-2 " >
				{/* <Link href="../" title="Home" rel="noopener noreferrer" className="p-3 m-0 font-bold text-black transition bg-white rounded-lg sm:font-medium whitespace-nowrap hover:bg-gray-800 hover:text-white">
					Home
				</Link> */}
				<BackBtn>Previous Page</BackBtn>
			</header>
			<h1 className={` ${montserrat.className} my-14 text-white text-5xl font-bold`}>{page.title}</h1>

			<div className="mt-10 text-lg prose text-white transition prose-strong:text-white prose-headings:text-white prose-a:text-white p prose-a:underline prose-a:decoration-green-500">
				<PortableText value={page.content} />
			</div>

			{page.slug === "contact" && (
				<ContactForm />
			)}
		</div>
	);
}
