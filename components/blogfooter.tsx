import { montserrat } from "@/fonts/fonts"
import Link from "next/link"


function BlogFooter() {
	return (
		<footer className={`${montserrat.className} bottom-0 left-0 w-full max-w-full relative p-3 bg-[#07010E] gap-y-6`}>
			<section className="mx-auto w-[90%] md:w-[85%] space-y-6 Prose prose-a:underline" >
				<p className="font-bold" >
					© 2024 Patrick&apos;s Blog – A Journey Through Technology, Philosophy, and Poetry
				</p>

				<p>
					Thank you for exploring my world of thoughts and ideas. Whether you&apos;re here for insights on the latest tech, reflections on life&apos;s deeper questions, or a moment of poetic pause, I hope you leave inspired.
				</p>
				<section >
					<article>
						<Link href={''} >
							Privacy Policy
						</Link>
					</article>
					<article>
						<Link href={''}>
							Terms of Service
						</Link>
					</article>
					<article>
						<Link href={''}>
							Cookie Policy
						</Link>
					</article>
					<article>
						<Link href={''}>
							Disclaimer
						</Link>
					</article>
				</section>
				<p>
					Feel free to reach out or share your thoughts with me through the Contact page.
				</p>
			</section>
		</footer>
	)
}

export default BlogFooter