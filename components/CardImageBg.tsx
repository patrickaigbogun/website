'use client';

import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

interface CardImageBgProps {
	imageSrc: StaticImageData;
	alt: string;
	title?: string;
	tagline?: string;
	date?: string;
	excerpt?: string;
	reuse?: string;
}

export default function CardImageBg({ imageSrc, alt, title, tagline, excerpt, date, reuse }: CardImageBgProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className={` ${reuse} relative overflow-hidden shadow-lg cursor-pointer rounded-3xl w-72 h-[22rem] max-w-72 group`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Background Image */}
			<div className="absolute inset-0">
				<Image
					src={imageSrc}
					alt={alt}
					fill
					className={` group-hover:brightness-50  object-cover transition-all ease-in-out duration-300`}
				/>
			</div>

			{/* Text Content */}
			<div className="relative z-10 flex flex-col justify-end h-full p-4 bg-gradient-to-t from-black via-gray-950/30 to-transparent">
				<span className='space-y-3' >
					<span className='space-y-1' >
						<h2 className="text-xl font-bold text-white">{title}</h2>
						<p className="text-base text-gray-300">{tagline}</p>
					</span>
					<p className="text-xs text-gray-300">{date}</p>
				</span>

				{/* Excerpt, only visible on hover */}
				<p
					className={`mt-2 text-gray-100 text-base ease-in-out transition-all duration-500 ${isHovered ? 'flex ' : 'hidden'
						}`}
				>
					{excerpt}
				</p>
			</div>
		</div>
	);
}
