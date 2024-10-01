import type { Metadata } from "next";
import "../globals.css";
import { nunito } from "@/fonts/fonts";
import { BlogHeader } from "@/components/blogheader";
import { getAuthorImage } from "@/sanity/sanity-utils";

import DraggableWrapper from "@/components/dragwrapper";
import FloatingIsland from "@/components/floatingisland";
import DraggableSidebar from "@/components/testercomponent";




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
			<body className={` z-0 bg-[#270453] text-[#EBE5FF] ${nunito.className} py-12 `}>
				<BlogHeader image={author.image} name={author.name} />
				{/* <DraggableWrapper  Top={200} Left={15}> */}
					{/* <FloatingIsland /> */}
				{/* </DraggableWrapper> */}
				{/* <DraggableSidebar /> */} 
				<main className=" z-1 mx-auto flex justify-center w-[90%] sm:w-[85%] py-12  ">
					{children}
				</main>
			</body>
		</html>
	);
}