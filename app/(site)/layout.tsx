import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";
import { getPages } from "@/sanity/sanity-utils";

import { Phone } from "@phosphor-icons/react/dist/ssr";

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
			<body className="bg-gradient-to-b from-slate-950 via-emerald-500 to-gray-800 mx-auto p-10 sm:p-20">
				<header className="text-3xl flex items-center justify-between ">
					<Link
						href="/"
						className="bg-gradient-to-r from-green-900 via-green-700 to-green-300 bg-clip-text text-transparent font-bold hover:scale-125 transition">
						Oti.
					</Link>
					<div className="flex items-center gap-3 text-gray-200">
						{pages.map((page) => (
							<Link
								key={page._id}
								href={`/${page.slug}`}
								className="hover:underline hover:scale-105 hover:text-white hover:font-medium transition">
								{page.title}
							</Link>
						))}
					</div>
				</header>

				<main className="py-20">{children}</main>

				<footer  className="bg-gray-800 
              text-white text-center 
             border-t-2 border-emerald-500 
             fixed 
             inset-x-0 
             bottom-0 
             p-4" >
				&copy;Oti. contact me at any of these options;
				<Phone weight="duotone" />
				+12345678
				name@email.com
				lindin.com/username 
				github.com/username
				</footer>
			</body>
		</html>
	);
}
