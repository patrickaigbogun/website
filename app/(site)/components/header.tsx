import Link from "next/link";
import { getPages } from "@/sanity/sanity-utils";







export default async function Header() {

    	// get all pages

	const pages = await getPages();

    return(
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
								className="hover:underline hover:scale-110 hover:text-white hover:font-medium transition">
								{page.title}
							</Link>
						))}
					</div>
				</header>
    )
}