'use client'

import LoadingUI from '@/components/loadingui'
import { montserrat } from '@/fonts/fonts'
import { getblogPosts } from '@/sanity/sanity-utils'
import { blogPost } from '@/types/blogPost'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function BlogHome() {
	const [blogPosts, setblogPosts] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchblogPosts = async () => {
			try {
				const fetchedblogPosts = await getblogPosts();
				setblogPosts(fetchedblogPosts);
			} catch (error) {
				console.error("Error fetching posts", error);
				setError("Error loading posts");
			}
		};

		fetchblogPosts();
	}, []);

	if (error) {
		return <div className="text-white">
			<h2>An error occured while getting posts, this could be the reason;</h2>
			{error}
		</div>;
	}

	if (!blogPosts) {
		return <LoadingUI />; // loading state UI
	}
	return (
		<div className="grid grid-cols-1 gap-8 mt-5 md:grid-cols-2 lg:grid-cols-3 ">
			{blogPosts.map((blogPosts: blogPost) => (
				<Link
					href={`/blog/post/${blogPosts.slug}`}
					key={blogPosts._id}
					className="transition duration-300 ease-in-out border-2 border-gray-300 group rounded-xl hover:scale-105 hover:border-4 hover:border-gray-300">
					{blogPosts.image && (
						<Image
							src={blogPosts.image}
							alt={blogPosts.title}
							width={150}
							height={300}
							className="object-cover rounded-lg group-hover:brightness-50 "
						/>
					)}
					<div className={` ${montserrat.className} font-bold text-gray-300/50 group-hover:text-gray-300 m-2`}>
						{blogPosts.title}
					</div>
				</Link>
			))}
		</div>
	)
}
