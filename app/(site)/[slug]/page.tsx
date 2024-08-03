"use client"

import { getPage } from "@/sanity/sanity-utils";
import { PortableText } from "next-sanity";
import { useEffect, useState } from "react"; // Import React hooks for async rendering
import LoadingUI from "../components/loadingui";
import ContactForm from "../components/contactform";
import Link from "next/link";

type PageProps = {
  params: { slug: string };
};

export default function Page({ params }: PageProps) {
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    const fetchPage = async () => {
      const fetchedPage = await getPage(params.slug);
      setPage(fetchedPage);
    };

    fetchPage();
  }, [params.slug]);

  if (!page) {
    return <LoadingUI/>; // Placeholder for loading state
  }

  return (
    <div className="mb-10 w-full md:w-[75%] mx-auto">
		<header className=" my-2 p-0 flex items-center justify-between gap-2" >
				<Link href="../" title="Home" rel="noopener noreferrer" className=" m-0 bg-white rounded-lg text-black font-bold sm:font-medium p-3 whitespace-nowrap hover:bg-gray-800 hover:text-white transition">
					Home
				</Link>
				<Link href="./" title="View project" target="_blank" rel="noopener noreferrer" className=" m-0 bg-white rounded-lg text-black font-bold sm:font-medium p-3 whitespace-nowrap hover:bg-gray-800 hover:text-white transition" >
					Go back
				</Link>
			</header>
      <h1 className="my-14 text-white text-5xl font-bold">{page.title}</h1>

      <div className="prose prose-a:underline prose-a:text-white hover:prose-a:text-gray-400 transition text-lg text-white mt-10">
        <PortableText value={page.content} />
      </div>

      {page.slug === "contact" && (
        <ContactForm/>
      )}
    </div>
  );
}
