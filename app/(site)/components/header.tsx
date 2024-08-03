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
					<div className="flex text-xl justify-between gap-3 text-gray-200">
						{pages.map((page) => (
							<Link
								href={`/${page.slug}`}
								key={page._id}
								className=" bg-white rounded-lg text-black font-medium sm:font-medium p-2 whitespace-nowrap hover:font-bold hover:underline hover:scale-110 transition">
								{page.title}
							</Link>
						))}
					</div>
				</header>
    )
}