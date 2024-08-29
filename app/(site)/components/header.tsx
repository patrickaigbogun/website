import Link from "next/link";
import { getPages } from "@/sanity/sanity-utils";
import { montserrat } from "@/fonts/fonts";






export default async function Header() {

    	// get all pages

	const pages = await getPages();

    return(
        <header className={` ${montserrat.className} text-3xl flex items-center justify-between`} >
					<Link
						href="/"
						className="font-bold text-transparent transition ease-linear bg-gradient-to-r from-green-900 via-green-700 to-green-300 bg-clip-text hover:scale-125">
						Oti.
					</Link>
					<div className="flex justify-between gap-3 text-xl text-gray-200">
						{pages.map((page) => (
							<Link
								href={`/${page.slug}`}
								key={page._id}
								className="p-2 font-medium text-white transition ease-linear sm:font-medium hover:font-bold hover:underline hover:decoration-green-500 hover:scale-110">
								{page.title}
							</Link>
						))}
					</div>
				</header>
    )
}