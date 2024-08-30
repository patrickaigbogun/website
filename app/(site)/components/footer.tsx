import { montserrat } from "@/fonts/fonts";
import { GithubLogo, LinkedinLogo, Phone } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Footer() {

	return (

		<footer className={` ${montserrat.className} flex justify-center max-h-[18%] p-1 font-medium text-sm lg:text-base bg-gray-950 bg-opacity-15 backdrop-blur-lg text-white border-t fixed inset-x-0 bottom-0 `}>
			<div className=" flex flex-col sm:flex-row sm:justify-center gap-x-4 items-center max-w-[90%] my-2 space-y-2">
				<div className="inline-block" ><p>&copy; Oti. Built by Patrick Aigbogun</p> </div>
				<div className="inline-flex flex-row gap-4 " >
					<span className="flex flex-row transition hover:scale-125">
						<a href="tel:+2349137251650"><Phone size={24} weight="duotone" /></a>
					</span>
					{/* <div className="flex items-center gap-2">
							<EnvelopeSimple size={24} weight="duotone" />
							<span>name@email.com</span>
						</div> */}
					<Link href={"https://linkedin.com/username"} className="transition hover:scale-125">
						<LinkedinLogo size={24} weight="duotone" />
					</Link>
					<Link href={"https://github.com/username"} className="transition hover:scale-125">
						<GithubLogo size={24} weight="duotone" />
					</Link>
				</div>
			</div>
		</footer>

	)
}


