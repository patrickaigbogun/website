import Image from 'next/image';

export default function Featured() {
	return (
		<div className='flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 z-50'>
			<div className='flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2'>
				<Image
					src='/images/woman-horse.jpeg'
					alt='Woman on horse in countryside'
					width={600}
					height={800}
					className='w-full h-full object-cover'
				/>
			</div>
			<div className='flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1'>
				<h3 className='uppercase mb-4'>
					Features That Refuse to Sit Still
				</h3>
				<p className='text-2xl lg:text-4xl mb-8'>
					Not just bullet points—living, breathing highlights. Each
					feature adapts to movement, context, and mood, making your
					product feel alive from the very first glance.
				</p>
				<button className='bg-black text-white border border-black px-4 py-2 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit'>
					LEARN MORE
				</button>
			</div>
		</div>
	);
}
