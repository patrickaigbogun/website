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
			<body className="bg-gradient-to-b from-gray-900 via-emerald-200 to-gray-200 mx-auto p-20" >
				<header className="text-2xl flex items-center justify-between " >
					<Link
						href="/"
						className="bg-gradient-to-r from-green-900 via-green-700 to-green-300 bg-clip-text text-transparent font-bold ">
						Oti.
					</Link>
<div className="flex items-center gap-3 text-gray-300" >
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
