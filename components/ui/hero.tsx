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
			className='h-screen overflow-hidden relative w-[95%] sm:w-[88%] mx-auto flex '
			ref={ref}
		>
			<motion.div style={{ y }} className='relative h-full w-full'>
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
				<div className='absolute inset-0 flex flex-row h-[67%] w-full items-center justify-center z-20'>
					<div className='space-y-12 text-text max-w-3xl backdrop-blur-md bg-bg/30 p-8 rounded-2xl border border-border/15 shadow-2xl'>
						<div className='space-y-3'>
							<h1
								className={`text-5xl md:text-5xl font-extrabold leading-tight ${montserrat.className}`}
							>
								You found it!
							</h1>
							<h3 className='text-text text-lg'>
								The boring blog by me; Patrick Aigbogun, Oti.
							</h3>
						</div>
						<p className=' leading-relaxed text-text'>
							I'm a budding software engineer who writes poetry as
							a form of self expression. This is where I share my
							thoughts on technology, philosophy, art, and life.
							The blog itself is a creative outlet for me to
							playtest some new ideas of mine before i implement
							them elsewhere.
						</p>
						<p>
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
										<PreviewCard.Popup className='flex w-60 origin-(--transform-origin) flex-col gap-2 rounded-lg bg-[canvas] p-2 shadow-lg shadow-gray-200 outline  outline-gray-200 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300'>
											<PreviewCard.Arrow className='data-[side=bottom]:-top-2 data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-side=top:bottom-8px data-[side=top]:rotate-180'>
												<ArrowSvg />
											</PreviewCard.Arrow>
											<img
												width='448'
												height='300'
												className='block w-full rounded-sm'
												src='https://images.unsplash.com/photo-1619615391095-dfa29e1672ef?q=80&w=448&h=300'
												alt='Station Hofplein signage in Rotterdam, Netherlands'
											/>
											<p className='text-sm text-pretty text-gray-900'>
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
						<Link target='_blank' title='Get Started with Oti'>
							GET STARTED
						</Link>
					</div>
				</div>
			</motion.div>
		</div>
	);
}

function ArrowSvg(props: React.ComponentProps<'svg'>) {
	return (
		<svg width='20' height='10' viewBox='0 0 20 10' fill='none' {...props}>
			<path
				d='M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z'
				className='fill-[canvas]'
			/>
			<path
				d='M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z'
				className='fill-gray-200 dark:fill-none'
			/>
			<path
				d='M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z'
				className='dark:fill-gray-300'
			/>
		</svg>
	);
}
