'use client';

import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function Section() {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', 'end start'],
	});
	const y = useTransform(scrollYProgress, [0, 1], ['-10vh', '10vh']);

	return (
		<div
			ref={container}
			className='relative flex items-center justify-center h-screen overflow-hidden'
			style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
		>
			<div className='fixed top-[-10vh] left-0 h-[120vh] w-full'>
				<motion.div style={{ y }} className='relative w-full h-full'>
					<Image
						src='/images/spiral-circles.jpeg'
						fill
						alt='Abstract spiral circles'
						style={{ objectFit: 'cover' }}
					/>
				</motion.div>
			</div>

			<h3 className='absolute top-12 right-6 text-white uppercase z-10 text-sm md:text-base lg:text-lg'>
				Anatomy of Possibility
			</h3>

			<p className='absolute bottom-12 right-6 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-5xl z-10'>
				Every section is a frame for your story. Shape it, remix it, and
				let your content spill into unexpected patterns that keep people
				scrolling.
			</p>
		</div>
	);
}
