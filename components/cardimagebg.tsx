'use client';

import { urlFor } from '@/lib//cms/sanity';
import { CardImageBgProps } from '@/types/components';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function CardImageBg({
	href,
	imageSrc,
	alt,
	title,
	tagline,
	excerpt,
	date,
	className,
	author,
}: CardImageBgProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link href={href}>
			<div
				className={`  relative overflow-hidden shadow-lg cursor-pointer rounded-3xl w-72 h-[22rem] max-w-72 group`}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{/* Background Image */}
				<div className={`${className} absolute inset-0`}>
					<Image
						src={urlFor(imageSrc).url()}
						alt={alt}
						fill
						className={`object-cover `}
						sizes='auto'
					/>
				</div>

				{/* Text Content */}
				<div className='relative z-10 flex flex-col justify-end h-full p-4 bg-gradient-to-t from-black via-gray-950/30 to-transparent'>
					<div className='space-y-3'>
						<div className='space-y-1'>
							<h2 className='text-xl font-bold text-white'>
								{title}
							</h2>
							<p className='text-base text-gray-300'>{tagline}</p>
						</div>
						<p className='text-xs text-gray-300'>
							{new Date(date).toDateString()}
						</p>
						<p>{author}</p>
					</div>

					{/* Excerpt, only visible on hover */}
					<div
						className={` text-gray-100 text-base ease-in-out transition-all duration-500 ${
							isHovered ? 'block ' : 'hidden'
						}`}
					>
						<PortableText value={excerpt} />
					</div>
				</div>
			</div>
		</Link>
	);
}
