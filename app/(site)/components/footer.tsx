import { GithubLogo, LinkedinLogo, Phone } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Footer() {

	return (

		<footer className="bg-gray-950 bg-opacity-15 backdrop-blur-md text-white flex flex-row justify-center border-t-2 border-green-500 fixed inset-x-0 bottom-0 p-4 gap-4">
			<p>&copy; Oti. Built by Patrick Aigbogun</p>
			<div className="flex items-center gap-2 hover:scale-125 transition">
				<Phone size={24} weight="duotone" />
				<span>+12345678</span>
			</div>
			{/* <div className="flex items-center gap-2">
						<EnvelopeSimple size={24} weight="duotone" />
						<span>name@email.com</span>
					</div> */}
			<Link href={"https://linkedin.com/username"} className="flex items-center gap-2 hover:scale-125 transition">
				<LinkedinLogo size={24} weight="duotone" />
			</Link>
			<Link href={"https://github.com/username"} className="flex items-center gap-2 hover:scale-125 transition">
				<GithubLogo size={24} weight="duotone" />
			</Link>
		</footer>

	)
}


