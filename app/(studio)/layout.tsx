import type { Metadata } from "next";
import "../globals.css";


export const metadata: Metadata = {
	title: "Admin for Patrick Aigbogun's Portfolio ",
	description: "personal website made with nextjs and sanitystudio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
			<div >
				{children}
			</div>
	);
}
