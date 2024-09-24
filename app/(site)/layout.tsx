import type { Metadata } from "next";
import "../globals.css";
import { Footer } from "@/components/footer";
import { getPages } from "@/sanity/sanity-utils";
import Header from "@/components/header";
import { Suspense } from "react";
import LoadingUI from "@/components/loadingui";
import { nunito } from "@/fonts/fonts";


export const metadata: Metadata = {
	title: "A simple portfolio",
	description: "personal website made with nextjs and sanitystudio",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pages = await getPages();

	return (
		<html lang="en">
			<body className={`bg-black mx-auto p-5 sm:p-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-gray-700/20 scrollbar-thumb-green-900/60 ${nunito.className} `}>
				<Suspense fallback={<LoadingUI />}>
					<Header pages={pages} />
				</Suspense>
				<main className="py-20">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
