// @/components/BlogPostsGrid

"use client";

import { montserrat } from '@/fonts/fonts'
import { urlFor } from '@/sanity/sanity-utils';
// import { blogPost } from '@/types/blogPost'
import { blogPostsProps } from '@/types/components'
import { PortableText } from 'next-sanity';
import Image from 'next/image'
import Link from 'next/link'


export default function BlogPostsGrid({ blogPosts }: blogPostsProps) {
	return (
		<div className="grid grid-cols-1 gap-8 mt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
			{blogPosts.map((blogPost) => {
				console.log(blogPost); // Check the structure of each blog post object
				return (
					<Link
						href={`/blog/post/${blogPost.slug}`}
						key={blogPost._id}
						className="transition duration-300 ease-in-out border border-gray-300 group rounded-3xl hover:scale-105">
						{blogPost.image && (
							<Image
								src={urlFor(blogPost.image).url()}
								alt={blogPost.alt || 'Blog post image'}
								width={150}
								height={300}
								className="object-cover rounded-lg group-hover:brightness-50 aspect-auto "
							/>
						)}
						<div>
						<p className={` ${montserrat.className} font-bold text-gray-300/50 group-hover:text-gray-300 m-2`}>
							{blogPost.title}
						</p>
						<p className={` ${montserrat.className} font-bold text-gray-300/50 group-hover:text-gray-300 m-2`}>
							{blogPost.tagline}
						</p>
						<p>{new Date(blogPost.publishDate).toDateString()}</p>
						<div className="text-lg text-white ">
							<PortableText value={blogPost.excerpt} />
						</div>
						</div>
					</Link>
				);
			})}

		</div>
	)
}
