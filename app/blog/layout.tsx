import type { Metadata } from "next";
import "../globals.css";
import { nunito } from "@/fonts/fonts";
import BlogHeader from "@/components/blogHeader";
import { getAuthorImage } from "@/sanity/sanity-utils";




export const metadata: Metadata = {
	title: "Patrick Aigbogun, Oti. Blog",
	description: "Personal blog where i discuss technologies, philosophy and poetry",
};

export default async function RootLayout({
	children,
  }: Readonly<{
	children: React.ReactNode;
  }>) {
	const author = await getAuthorImage();
  
	if (!author) {
	  console.log("Author not found");
	  return (
		<div>
		  <p>Author not found.</p>
		</div>
	  );
	}
  

	return (
		<html className="overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-gray-700/20 scrollbar-thumb-[#ded1ff]/30" lang="en">
			<body className={`bg-[#270453] text-gray-600 ${nunito.className} `}>
				<BlogHeader name={author.name} image={author.image} />
				<main className="p-5 my-20 sm:mx-5">
					{children}
				</main>
			</body>
		</html>
	);
}