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
			<body className="bg-black mx-auto p-10 sm:p-20">
				<header className="text-3xl flex items-center justify-between ">
					<Link
						href="/"
						className="bg-gradient-to-r from-green-900 via-green-700 to-green-300 bg-clip-text text-transparent font-bold hover:scale-125 transition">
						Oti.
					</Link>
					<div className="flex justify-between gap-3 text-gray-200">
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

				<footer className="bg-gray-950 bg-opacity-15 backdrop-blur-md text-white flex flex-row justify-center border-t-2 border-green-300 fixed inset-x-0 bottom-0 p-4 gap-4">
      <p>&copy; Oti. Built by Patrick Aigbogun</p>
      <div className="flex items-center gap-2">
        <Phone size={24} weight="duotone" />
        <span>+12345678</span>
      </div>
      <div className="flex items-center gap-2">
        <EnvelopeSimple size={24} weight="duotone" />
        <span>name@email.com</span>
      </div>
      <div className="flex items-center gap-2">
        <LinkedinLogo size={24} weight="duotone" />
        <a href="https://linkedin.com/username" target="_blank" rel="noopener noreferrer">linkedin.com/username</a>
      </div>
      <div className="flex items-center gap-2">
        <GithubLogo size={24} weight="duotone" />
        <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">github.com/username</a>
      </div>
    </footer>
			</body>
		</html>
	);
}
