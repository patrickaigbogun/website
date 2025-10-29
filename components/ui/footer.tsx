import Link from 'next/link';

export default function Footer() {
	return (
		<div
			className='relative w-full bg-neutral-900 overflow-hidden'
			style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
		>
			<div className='mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-24 flex flex-col justify-between h-[400px] sm:h-[600px] lg:h-[800px]'>
				<div className='flex shrink-0 gap-8 sm:gap-12 lg:gap-20'>
					<div className='flex flex-col gap-1 sm:gap-2'>
						<h3 className='mb-1 sm:mb-2 uppercase text-neutral-400 text-xs sm:text-sm'>
							About
						</h3>
						<Link
							href='/projects'
							className='text-white hover:text-neutral-400 transition-colors duration-300 text-sm sm:text-base'
						>
							Projects
						</Link>
						<Link
							href='/mission'
							className='text-white hover:text-neutral-400 transition-colors duration-300 text-sm sm:text-base'
						>
							Our Mission
						</Link>
						<Link
							href='/contact'
							className='text-white hover:text-neutral-400 transition-colors duration-300 text-sm sm:text-base'
						>
							Contact Us
						</Link>
					</div>
					<div className='flex flex-col gap-1 sm:gap-2'>
						<h3 className='mb-1 sm:mb-2 uppercase text-neutral-400 text-xs sm:text-sm'>
							Education
						</h3>
						<Link
							href='/news'
							className='text-white hover:text-neutral-400 transition-colors duration-300 text-sm sm:text-base'
						>
							News
						</Link>
						<Link
							href='/learn'
							className='text-white hover:text-neutral-400 transition-colors duration-300 text-sm sm:text-base'
						>
							Learn
						</Link>
						<Link
							href='/publications'
							className='text-white hover:text-neutral-400 transition-colors duration-300 text-sm sm:text-base'
						>
							Publications
						</Link>
					</div>
				</div>
				<div className='flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0 mt-8'>
					<h1 className='text-5xl sm:text-7xl lg:text-8xl leading-[0.8] text-white font-bold tracking-tight'>
						RESEARCH
					</h1>
					<p className='text-white text-sm sm:text-base'>
						©copyright
					</p>
				</div>
			</div>
		</div>
	);
}
