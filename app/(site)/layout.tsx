import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";
import { getPages } from "@/sanity/sanity-utils";

import { EnvelopeSimple, GithubLogo, LinkedinLogo, Phone } from "@phosphor-icons/react/dist/ssr";

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
								href={`/${page.slug}`}
								key={page._id}
								className="hover:underline hover:scale-105 hover:text-white hover:font-medium transition">
								{page.title}
							</Link>
						))}
					</div>
				</header>

				<main className="py-20">{children}</main>

				<footer  className="bg-gray-800 
              text-white flex flex-row justify-center
             border-t-2 border-emerald-500 
             fixed 
             inset-x-0 
             bottom-0 
             p-4 gap-2" >
				<p>&copy;Oti. Built by Patrick Aigbogun</p>
				<Phone size={24} weight="duotone" >
				+12345678
				</Phone>
				<EnvelopeSimple size={24} weight="duotone" >
				name@email.com
				</EnvelopeSimple>
				<LinkedinLogo size={24} weight="duotone" >
				linkedin.com/username
				</LinkedinLogo >
				 <GithubLogo size={24} weight="duotone" >
				 github.com/username
				 </GithubLogo>
				
				</footer>
			</body>
		</html>
	);
}
