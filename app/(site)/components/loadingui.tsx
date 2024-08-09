import { montserrat } from "@/fonts/fonts";


export default function LoadingUI() {

	return (
		<div className={` ${montserrat.className} 100vh flex justify-center`}>
			<span className=" text-9xl font-extrabold bg-gradient-to-r from-green-900 via-green-700 to-green-300 bg-clip-text text-transparent animate-pulse">
				Oti.
			</span>
		</div>
	)
}