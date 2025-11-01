'use client';
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import { montserrat } from '@/fonts/fonts';
import { PreviewCard } from '@base-ui-components/react/preview-card';
import { Link } from '@components/reuse/button';

const scatteredImages = [
	{
		src: '/hero/coffee.webp',
		x: '10%',
		y: '15%',
		rotate: -15,
		scale: 0.8,
		parallax: 20,
		tape: 'top-left',
		note: '☕ morning fuel',
	},
	{
		src: '/hero/computer.webp',
		x: '80%',
		y: '20%',
		rotate: 12,
		scale: 1,
		parallax: 40,
		tape: 'top-right',
		note: 'where magic happens',
	},
	{
		src: '/hero/statue.webp',
		x: '15%',
		y: '70%',
		rotate: -8,
		scale: 0.9,
		parallax: 30,
		tape: 'corner',
		note: 'thinking deeply...',
	},
	{
		src: '/hero/poetry.webp',
		x: '85%',
		y: '65%',
		rotate: 18,
		scale: 0.85,
		parallax: 25,
		tape: 'cross',
		note: 'words flow',
	},
];

export default function Hero() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start'],
	});

	const y = useTransform(scrollYProgress, [0, 1], ['0vh', '100vh']);

	return (
		<div
			className='h-screen overflow-hidden relative mx-auto flex z-30'
			ref={ref}
		>
			<motion.div style={{ y }} className='relative h-full w-full flex'>
				{/* Scattered Scrapbook Images */}
				{scatteredImages.map((img, index) => {
					const imageY = useTransform(
						scrollYProgress,
						[0, 1],
						[0, img.parallax]
					);

					return (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: index * 0.2,
								duration: 0.6,
								type: 'spring',
							}}
							style={{
								position: 'absolute',
								left: img.x,
								top: img.y,
								y: imageY,
								rotate: img.rotate,
								scale: img.scale,
							}}
							className='scrapbook-photo group cursor-pointer'
							whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
						>
							{/* Washi Tape Effect */}
							<div
								className={`scrapbook-tape scrapbook-tape-${img.tape}`}
							/>

							{/* Photo with torn edges */}
							<div className='relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.3)] transition-all duration-300'>
								{/* Torn edge effect */}
								<div
									className='absolute inset-0 bg-white'
									style={{
										clipPath:
											'polygon(0% 2%, 3% 0%, 5% 3%, 8% 1%, 12% 4%, 15% 2%, 18% 5%, 22% 3%, 25% 6%, 28% 4%, 32% 7%, 35% 5%, 38% 8%, 42% 6%, 45% 9%, 48% 7%, 52% 10%, 55% 8%, 58% 11%, 62% 9%, 65% 12%, 68% 10%, 72% 13%, 75% 11%, 78% 14%, 82% 12%, 85% 15%, 88% 13%, 92% 16%, 95% 14%, 98% 17%, 100% 15%, 100% 100%, 0% 100%)',
									}}
								/>

								<div className='relative w-full h-full overflow-hidden'>
									<Image
										src={img.src}
										alt={img.note}
										fill
										className='object-cover brightness-[0.75] saturate-[0.8] group-hover:brightness-90 transition-all sepia-[0.2] contrast-[1.15]'
									/>
									{/* Grainy texture overlay */}
									<div className='absolute inset-0 bg-grain opacity-40 mix-blend-overlay pointer-events-none' />
									{/* Dark vignette overlay */}
									<div className='absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30 pointer-events-none' />
								</div>

								{/* Handwritten note */}
								<div className='absolute -bottom-8 left-0 right-0 text-center'>
									<span className='text-xs md:text-sm font-handwriting text-gray-700 bg-yellow-50/80 px-2 py-1 rounded shadow-sm'>
										{img.note}
									</span>
								</div>
							</div>
						</motion.div>
					);
				})}

				{/* Content */}
				<div className='absolute inset-0 flex items-center text-center justify-center z-10'>
					<div className='space-y-12 max-w-[85%] text-text backdrop:blur-sm bg-bg-dark/70 dark:bg-bg-dark/30 p-8 rounded-2xl border-4 border-border/15 shadow-2xl hero-content-inset'>
						<div className='space-y-3'>
							<h1
								className={`text-4xl md:text-7xl font-extrabold ${montserrat.className}`}
							>
								You found it!
							</h1>
							<h3 className='text-text text-2xl sm:text-3xl '>
								The boring blog by me; Patrick Aigbogun, Oti.
							</h3>
						</div>
						<p className=' text-xl md:text-3xl text-text'>
							I'm a budding software engineer who writes poetry as
							a form of self expression. This is where I share my
							thoughts on technology, philosophy, art, and life.
							The blog itself is a creative outlet for me to
							playtest some new ideas of mine before i implement
							them elsewhere.
						</p>
						<p className=' text-xl md:text-3xl text-text-muted'>
							The blog itself is open source, take a look if you
							want{' '}
							<PreviewCard.Root>
								<PreviewCard.Trigger
									href='https://github.com/patrickaigbogun/website'
									target='_blank'
									rel='noopener noreferrer'
									className='underline text-text-muted'
								>
									here
								</PreviewCard.Trigger>

								<PreviewCard.Portal>
									<PreviewCard.Positioner sideOffset={8}>
										<PreviewCard.Popup className='flex w-60 origin-(--transform-origin) flex-col gap-2 rounded-lg bg-[canvas] p-2 shadow-lg shadow-gray-200 outline  outline-border/15 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-border/55'>
											<img
												width='448'
												height='300'
												className='block w-full rounded-sm'
												src='https://images.unsplash.com/photo-1619615391095-dfa29e1672ef?q=80&w=448&h=300'
												alt='Station Hofplein signage in Rotterdam, Netherlands'
											/>
											<p className='text-sm text-pretty text-text-muted'>
												<strong>Typography</strong> is
												the art and science of arranging
												type to make written language
												clear, visually appealing, and
												effective in communication.
											</p>
										</PreviewCard.Popup>
									</PreviewCard.Positioner>
								</PreviewCard.Portal>
							</PreviewCard.Root>
						</p>
						{/* <Link target='_blank' title='Get Started with Oti'>
							GET STARTED
						</Link> */}
					</div>
				</div>
			</motion.div>
		</div>
	);
}
