import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
	title: "Patrick Aigbogun's portfolio",
	description: "Patrick Aigbogun's personal website made with nextjs and sanityio",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="p-0 m-0" >

				{children}

			</body>
		</html>
	);
}
