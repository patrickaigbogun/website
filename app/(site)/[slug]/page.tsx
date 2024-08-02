"use client"

import { getPage } from "@/sanity/sanity-utils";
import { PortableText } from "next-sanity";
import { useEffect, useState } from "react"; // Import React hooks for async rendering

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
    return <div className="text-white" >Loading...</div>; // Placeholder for loading state
  }

  return (
    <div className="mb-10 w-full md:w-[75%] mx-auto">
      <h1 className="my-14 text-white text-5xl font-bold">{page.title}</h1>

      <div className="prose prose-a:underline prose-a:text-white hover:prose-a:text-gray-400 transition text-lg text-white mt-10">
        <PortableText value={page.content} />
      </div>

      {page.slug === "contact" && (
        <div className="text-white mt-10">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur,
          sunt? Fuga quia atque dolor dolores quibusdam id, adipisci eum quidem
          ullam laborum. Repellat, facere animi excepturi unde nulla perferendis
          id.
        </div>
      )}
    </div>
  );
}
