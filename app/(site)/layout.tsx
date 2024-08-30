import type { Metadata } from "next";
import "../globals.css";
// import Link from "next/link";
import Footer from "./components/footer";
import HeadWrapper from "./components/HeadWrapper";

import { nunito } from "@/fonts/fonts";

// import { EnvelopeSimple, GithubLogo, LinkedinLogo, Phone } from "@phosphor-icons/react/dist/ssr";


export const metadata: Metadata = {
	title: "A simple portfolio",
	description: "personal website made with nextjs and sanitystudio",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className="overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-gray-700/20 scrollbar-thumb-green-500" lang="en">
			<body className={`bg-black mx-auto p-5 sm:p-20 ${nunito.className} `}>
				<HeadWrapper />
				<main className="py-20">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
