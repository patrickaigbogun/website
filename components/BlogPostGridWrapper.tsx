// @/components/BlogPostGridWrapper.tsx

'use client';

import { getblogPosts } from '@/sanity/sanity-utils';
import BlogPostsGrid from '@/components/BlogPostsGrid';
import { useEffect, useState } from 'react';
import LoadingUI from './loadingui';

export default function BlogPostsGridWrapper() {
	const [blogPosts, setblogPosts] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchblogPosts = async () => {
			try {
				const fetchedblogPosts = await getblogPosts();
				setblogPosts(fetchedblogPosts);
			} catch (error) {
				console.error("Error fetching projects:", error);
				setError("Error loading projects");
			}
		};

		fetchblogPosts();
	}, []);

	if (error) {
		return <div className="text-white">
			<h2>An error occured while getting posts, this could be the reason below</h2>
			{error}
		</div>;
	}

	if (!blogPosts) {
		return <LoadingUI />; // loading state UI
	}


	return <BlogPostsGrid blogPosts={blogPosts} />;
}