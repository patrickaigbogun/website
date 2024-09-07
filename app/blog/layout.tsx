import type { Metadata } from "next";
import "../globals.css";
import { nunito } from "@/fonts/fonts";


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
		<html className="overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-gray-700/20 scrollbar-thumb-green-900/60" lang="en">
			<body className={`bg-indigo-950 htext-gray-600 mx-auto p-5 sm:p-20 ${nunito.className} `}>
				<main className="m-5">
					{children}
				</main>
			</body>
		</html>
	);
}
