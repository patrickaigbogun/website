"use client"

import { getPage } from "@/sanity/sanity-utils";
import { PortableText } from "next-sanity";
import { useEffect, useState } from "react"; // Import React hooks for async rendering
import LoadingUI from "../components/loadingui";
import ContactForm from "../components/contactform";
import { montserrat } from "@/fonts/fonts";
import { BackBtn } from "../components/NavButton";
import RedirectButton from "../components/RedirectButton";

type PageProps = {
	params: { slug: string };
};

export default function Page({ params }: PageProps) {
	const [page, setPage] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPage = async () => {
			try {
				const fetchedPage = await getPage(params.slug);
				setPage(fetchedPage);
			} catch (error) {
				console.error("Error fetching page:", error);
				setError("Error loading page");
			}
		};

		fetchPage();
	}, [params.slug]);

	useEffect(() => {
		if (page && page.slug === "cave-experience") {
			// Redirect after 5 seconds
			const timer = setTimeout(() => {
				window.open('./', '_blank');
			}, 5000);

			// Cleanup the timer if the component is unmounted before the delay
			return () => clearTimeout(timer);
		}
	}, [page]);

	if (error) {
		return <div className="text-white">{error}</div>;
	};

	if (!page) {
		return <LoadingUI />; // Placeholder for loading state
	}

	return (
		<div className="mb-10 w-full md:w-[75%] mx-auto">
			<header className="flex items-center justify-start gap-2 p-0 my-2 ">
				<BackBtn>Previous Page</BackBtn>
			</header>
			<h1 className={` ${montserrat.className} my-14 text-white text-5xl font-bold`}>{page.title}</h1>

			<div className="mt-10 text-lg prose text-white transition prose-strong:text-white prose-headings:text-white prose-a:text-white p prose-a:underline prose-a:decoration-green-500">
				<PortableText value={page.content} />
			</div>

			<div className="my-6">
				{page.slug === "contact" && (
					<ContactForm />
				)}
				{page.slug === "cave-experience" && (
					<RedirectButton target="./" >
						Going to Blog
					</RedirectButton>
				)}
			</div>
		</div>
	);
}
