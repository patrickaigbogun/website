import type { Metadata } from "next";
import "../globals.css";
import { nunito } from "@/fonts/fonts";
import BlogHeader from "@/components/BlogHeader";


export const metadata: Metadata = {
	title: "Patrick Aigbogun, Oti. Blog",
	description: "Personal blog where i discuss technologies, philosophy and poetry",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className="overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-gray-700/20 scrollbar-thumb-zinc-700/50" lang="en">
			<body className={`p-5 sm:p-20 bg-indigo-950 text-gray-600 mx-auto ${nunito.className} `}>
				<BlogHeader />
				<main className="py-20">
					{children}
				</main>
			</body>
		</html>
	);
}
