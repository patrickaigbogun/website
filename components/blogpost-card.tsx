'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from 'next-sanity';
import { cn } from '@/lib/utils';

export type BlogPostCardProps = {
	href: string;
	title: string;
	tagline?: string;
	excerpt?: any;
	date?: string | Date;
	coverImage?: string;
	alt?: string;
	authorName?: string;
	authorImage: string; // required for the circle cutout
	className?: string;
};

export default function BlogPostCard({
	href,
	title,
	tagline,
	excerpt,
	date,
	coverImage,
	alt = '',
	authorName,
	authorImage,
	className,
}: BlogPostCardProps) {
	const formattedDate = date ? new Date(date).toDateString() : undefined;

	return (
		<Link href={href} className={cn('block group', className)}>
			<div className='relative inline-block'>
				{/* Card body with mask for the shape */}
				<div
					className='relative overflow-hidden bg-white shadow-lg transition-transform hover:scale-[1.02]'
					style={{
						width: '280px',
						minHeight: '420px',
						borderRadius: '40px',
						borderBottomLeftRadius: '0',

						// Concave corner curving INWARD toward the card center
						// Radial gradient: transparent circle at bottom-left corner, solid elsewhere
						maskImage: `radial-gradient(circle 50px at 0 100%, transparent 50px, black 51px)`,
						WebkitMaskImage: `radial-gradient(circle 50px at 0 100%, transparent 50px, black 51px)`,
					}}
				>
					{/* Optional cover image fills the card content area underneath text */}
					{coverImage && (
						<Image
							src={coverImage}
							alt={alt}
							fill
							className='object-cover opacity-90'
							sizes='(max-width: 280px) 100vw, 280px'
						/>
					)}

					{/* Content overlay */}
					<div className='relative z-10 flex h-full flex-col justify-end p-5 pb-7 bg-gradient-to-t from-black/90 via-black/40 to-transparent'>
						<div className='space-y-2 text-white pl-8'>
							<h2 className='text-lg font-bold leading-tight'>
								{title}
							</h2>
							{tagline && (
								<p className='text-sm text-gray-200'>
									{tagline}
								</p>
							)}
							{formattedDate && (
								<p className='text-xs text-gray-300'>
									{formattedDate}
								</p>
							)}
							{authorName && (
								<p className='text-xs text-gray-200'>
									{authorName}
								</p>
							)}
						</div>

						{excerpt && (
							<div className='mt-3 text-xs text-gray-100 pl-8'>
								<PortableText value={excerpt} />
							</div>
						)}
					</div>
				</div>

				{/* Author image floating in the bottom-left corner with gap from card */}
				<div className='absolute left-[-8px] bottom-[-8px] z-20'>
					<div className='relative h-10 w-10 rounded-full ring-4 ring-bg-dark shadow-xl overflow-hidden'>
						<Image
							src={authorImage}
							alt={authorName ? `${authorName} avatar` : 'Author'}
							fill
							sizes='40px'
							className='object-cover'
						/>
					</div>
				</div>
			</div>
		</Link>
	);
}
