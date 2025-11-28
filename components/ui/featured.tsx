import { montserrat } from '@/fonts/fonts';
import { ScrollArea } from './scroll-area';
import BlogPostCard from '@/components/blogpost-card';

export default function Featured() {
	return (
		<div className=' min-h-screen px-6 py-12 z-30 flex flex-col space-y-12'>
			<section>
				<h2
					className={` ${montserrat.className} text-5xl font-bold text-center`}
				>
					Tech
				</h2>
				<div>
					<h4
						className={` ${montserrat.className} font-bold text-2xl`}
					>
						Projects
					</h4>
					<ScrollArea>
						<div className='flex flex-row gap-6 overflow-x-scroll max-w-screen p-4 scrollbar-hide'>
							<BlogPostCard
								href='/blog/tech-1'
								title='Building Reliable Systems'
								tagline='Architecture, tooling, and habits'
								date={new Date()}
								coverImage='https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'
								authorName='Ada Lovelace'
								authorImage='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
							/>
							<BlogPostCard
								href='/blog/tech-2'
								title='Type-Safe APIs'
								tagline='Contracts that scale'
								date={new Date()}
								coverImage='https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=800&auto=format&fit=crop'
								authorName='Grace Hopper'
								authorImage='https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=200&auto=format&fit=crop'
							/>
							<BlogPostCard
								href='/blog/tech-3'
								title='Observability Basics'
								tagline='Logs, metrics, traces'
								date={new Date()}
								coverImage='https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'
								authorName='Linus Torvalds'
								authorImage='https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop'
							/>
						</div>
					</ScrollArea>
					<h4
						className={` ${montserrat.className} font-bold text-2xl`}
					>
						Resources
					</h4>
					<ScrollArea>
						<div className='flex flex-row gap-6 overflow-x-auto max-w-screen py-4'>
							<BlogPostCard
								href='/blog/resources-1'
								title='Favorite Tools'
								tagline='Editors, CLIs, extensions'
								date={new Date()}
								coverImage='https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop'
								authorName='Kent Beck'
								authorImage='https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&auto=format&fit=crop'
							/>
							<BlogPostCard
								href='/blog/resources-2'
								title='Learning Paths'
								tagline='Curated roadmap'
								date={new Date()}
								coverImage='https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop'
								authorName='Sandi Metz'
								authorImage='https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop'
							/>
						</div>
					</ScrollArea>
					<h4
						className={` ${montserrat.className} font-bold text-2xl`}
					>
						Career
					</h4>
					<ScrollArea>
						<div className='flex flex-row gap-6 overflow-x-auto max-w-screen py-4'>
							<BlogPostCard
								href='/blog/career-1'
								title='Interviewing Well'
								tagline='Signals and storytelling'
								date={new Date()}
								coverImage='https://images.unsplash.com/photo-1496096265110-f83ad7f96608?q=80&w=800&auto=format&fit=crop'
								authorName='Camille Fournier'
								authorImage='https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
							/>
						</div>
					</ScrollArea>
				</div>
			</section>
			<section>
				<h2
					className={` ${montserrat.className} text-5xl font-bold text-center`}
				>
					Philosophy
				</h2>
				<div>
					<h4
						className={` ${montserrat.className} font-bold text-2xl`}
					>
						Thinkings
					</h4>
					<ScrollArea>
						<div className='flex flex-row gap-6 overflow-x-auto max-w-screen py-4'>
							<BlogPostCard
								href='/blog/philo-1'
								title='On Curiosity'
								tagline='Why ask better questions'
								date={new Date()}
								coverImage='https://images.unsplash.com/photo-1454165205744-3b78555e5572?q=80&w=800&auto=format&fit=crop'
								authorName='Philosopher'
								authorImage='https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop'
							/>
						</div>
					</ScrollArea>
					<h4
						className={` ${montserrat.className} font-bold text-2xl`}
					>
						Beliefs
					</h4>
					<ScrollArea>
						<div className='flex flex-row gap-6 overflow-x-auto max-w-screen py-4'>
							<BlogPostCard
								href='/blog/poetry-1'
								title='Morning Lines'
								tagline='A short verse'
								date={new Date()}
								coverImage='https://images.unsplash.com/photo-1475275083424-b4ff816303bb?q=80&w=800&auto=format&fit=crop'
								authorName='Poet'
								authorImage='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
							/>
						</div>
					</ScrollArea>
					<h4
						className={` ${montserrat.className} font-bold text-2xl`}
					>
						Lessons
					</h4>
					<ScrollArea>
						<div className='flex flex-row gap-6 overflow-x-auto max-w-screen py-4'>
							<BlogPostCard
								href='/blog/stories-1'
								title='The Wanderer'
								tagline='A tiny tale'
								date={new Date()}
								coverImage='https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop'
								authorName='Storyteller'
								authorImage='https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop'
							/>
						</div>
					</ScrollArea>
				</div>
			</section>
			<section>
				<h2
					className={` ${montserrat.className} text-5xl font-bold text-center`}
				>
					Art
				</h2>
				<div className='flex flex-col '>
					<div>
						<h4
							className={` ${montserrat.className} font-bold text-2xl`}
						>
							Poetry
						</h4>
						<ScrollArea>
							<div className='flex flex-row gap-6 overflow-x-auto max-w-screen py-4'>
								<BlogPostCard
									href='/blog/series-1'
									title='Refactors'
									tagline='Part 1: Naming'
									date={new Date()}
									coverImage='https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop'
									authorName='Editor'
									authorImage='https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
								/>
							</div>
						</ScrollArea>
					</div>
					<div>
						<h4
							className={` ${montserrat.className} font-bold text-2xl`}
						>
							Short Stories
						</h4>
						<ScrollArea>
							<div className='flex flex-row overflow-x-auto max-w-screen'></div>
						</ScrollArea>
					</div>
					<div>
						<h4
							className={` ${montserrat.className} font-bold text-2xl`}
						>
							Series
						</h4>
						<ScrollArea>
							<div className='flex flex-row overflow-x-auto max-w-screen'></div>
						</ScrollArea>
					</div>
				</div>
			</section>
		</div>
	);
}
