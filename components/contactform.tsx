import { montserrat } from "@/fonts/fonts";



export function ContactForm() {
	return (
		<div className="flex justify-center my-10">
			<div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl">
				<h2 className={` ${montserrat.className} text-2xl font-bold text-white mb-4`}>Contact Me</h2>
				<form action={'https://formspree.io/f/xzzpgvdw'} method="POST" className="space-y-10">
					<div className="flex flex-col">
						<label htmlFor="email" className="text-white">Your Email</label>
						<input
							type="email"
							id="email"
							name="email"
							className="px-4 py-2 border-2 border-green-500 rounded-lg focus:outline-none focus:border-green-500"
							placeholder="eg; you@example.com"
							required
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="message" className="text-white">Type your message here:</label>
						<textarea
							id="message"
							name="message"
							rows={4}
							className="px-4 py-2 border-2 border-green-500 rounded-lg focus:outline-none focus:border-green-500"
							placeholder="eg; Hi Oti, I need a blog site done.."
							required
						></textarea>
					</div>
					<div className="flex justify-center sm:justify-start">
						<button
							type="submit"
							className="px-4 py-2 text-white transition bg-green-500 rounded-lg hover:bg-green-900 hover:scale-105"
						>
							Send Message
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
