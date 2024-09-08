import CardImageBg from '@/components/CardImageBg'
import React from 'react'
import TestImage from '@/public/test.jpg'

export default function page() {
	return (
		<div className='mx-auto w-[70%]' >
			<div className='flex flex-row flex-wrap justify-center gap-4 ' >
			<CardImageBg
				imageSrc={TestImage}
				alt='some alt text'
				title="Dynamic Card Title"
				tagline="This is a sample tagline."
				date='Sat Sep 07 2024'
				excerpt="Tit's just an imaginary post, something i am using as placeholder at the moment for my post. We are working on adding useful content later."
			/>
			<CardImageBg
				imageSrc={TestImage}
				alt='some alt text'
				title="Dynamic Card Title"
				tagline="This is a sample tagline."
				date='Sat Sep 07 2024'
				excerpt="This short excerpt appears on hover."
			/>
			<CardImageBg
				imageSrc={TestImage}
				alt='some alt text'
				title="Dynamic Card Title"
				tagline="This is a sample tagline."
				date='Sat Sep 07 2024'
				excerpt="This short excerpt appears on hover."
			/>
			<CardImageBg
				imageSrc={TestImage}
				alt='some alt text'
				title="Dynamic Card Title"
				tagline="This is a sample tagline."
				date='Sat Sep 07 2024'
				excerpt="This short excerpt appears on hover."
			/>
			<CardImageBg
				imageSrc={TestImage}
				alt='some alt text'
				title="Dynamic Card Title"
				tagline="This is a sample tagline."
				date='Sat Sep 07 2024'
				excerpt="This short excerpt appears on hover."
			/>
			<CardImageBg
				imageSrc={TestImage}
				alt='some alt text'
				title="Dynamic Card Title"
				tagline="This is a sample tagline."
				date='Sat Sep 07 2024'
				excerpt="This short excerpt appears on hover."
				reuse='border border-gray-600 text-black'
			/>

			</div>
			
		</div>
	)
}
