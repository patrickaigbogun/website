import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";
import { getPages } from "@/sanity/sanity-utils";

export const metadata: Metadata = {
	title: "A simple portfolio",
	description: "personal website made with nextjs and sanitystudio",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	// get all pages

const pages = await getPages();

	return (
		<html lang="en">
			<body className="max-w-3xl mx-auto py-20" >
				<header className="flex items-center justify-between " >
					<Link
						href="/"
						className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent text-lg font-bold ">
						Oti.
					</Link>
<div className="flex items-center gap-3 text-sm text-gray-600" >
	{pages.map((page) => (
		<Link key={page._id} href={`/${page.slug}`} className="hover:underline" >
			{page.title}
		</Link>
	))}
</div>

				</header>

				<main className="py-20" >{children}</main>
			</body>
		</html>
	);
}
