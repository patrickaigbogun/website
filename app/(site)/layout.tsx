import type { Metadata } from "next";
import "../globals.css";
// import Link from "next/link";
import { Footer } from "@/components/Footer";
import HeaderWrapper from "@/components/HeaderWrapper";

import { nunito } from "@/fonts/fonts";

// import { EnvelopeSimple, GithubLogo, LinkedinLogo, Phone } from "@phosphor-icons/react/dist/ssr";


export const metadata: Metadata = {
	title: "A simple portfolio",
	description: "personal website made with nextjs and sanitystudio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`bg-black mx-auto p-5 sm:p-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-gray-700/20 scrollbar-thumb-green-900/60 ${nunito.className} `}>
				<HeaderWrapper />
				<main className="py-20">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
