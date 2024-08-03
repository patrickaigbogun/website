import { Cursor, useTypewriter } from 'react-simple-typewriter';



export default function Hero() {

	const [text, helper] = useTypewriter({
        words: [
            "Welcome to my portfolio!",
            "Coffee is better than Oxygen",
            "<Coding/>, Logic, Art, Philosophy"
        ],
        loop: true,
        delaySpeed: 2000,
      })

	return (
		<>
			<h1 className=" text-7xl font-extrabold text-white">
				Hello I&apos;m{" "}
				<span className="bg-gradient-to-r from-green-900 via-green-700 to-green-300 bg-clip-text text-transparent">
					Oti.
				</span>
			</h1>
			<p className="mt-6 mb-1 text-3xl text-white">
				{text}
				<Cursor cursorColor="green" />
			</p>
			<p className="mt-1 mb-1 text-xl text-white">
			<br /><i><sub>displayed below are my most confident works</sub></i>
			</p>
			<h2 className="mt-24 font-bold text-white text-3xl">
				My Projects
			</h2>
		</>

	)
}