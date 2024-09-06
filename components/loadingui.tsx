import { montserrat } from "@/fonts/fonts";


export default function LoadingUI() {

	return (
		<div className={` ${montserrat.className} flex items-center justify-center h-full`}>
			<span className="font-extrabold text-transparent text-9xl bg-gradient-to-r from-green-900 via-green-700 to-green-300 bg-clip-text animate-pulse">
				Oti.
			</span>
		</div>
	)
}