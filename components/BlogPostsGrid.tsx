// @/components/BlogPostsGrid

"use client";

import { montserrat } from '@/fonts/fonts'
import { urlFor } from '@/sanity/sanity-utils';
// import { blogPost } from '@/types/blogPost'
import { blogPostsProps } from '@/types/components'
import { PortableText } from 'next-sanity';
import Image from 'next/image'
import Link from 'next/link'
import CardImageBg from './CardImageBg';


export default function BlogPostsGrid({ blogPosts }: blogPostsProps) {
	return (
		<div className='mx-auto flex justify-center w-[90%] sm:w-[85%]'>
			<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
				{blogPosts.map((blogPost) => {
					console.log(blogPost); // Correctly logs individual blog post
					return (
						<CardImageBg
							key={blogPost._id}
							imageSrc={blogPost.image}
							alt={blogPost.alt || 'Blog post image'}
							title={blogPost.title}
							tagline={blogPost.tagline}
							date={blogPost.publishDate}
							author={blogPost.author.name}
							excerpt={blogPost.excerpt}
							className='transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-50 group-hover:blur-sm'
						/>
					);
				})}
			</div>
		</div>
	);
}
