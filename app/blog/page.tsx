
// import LoadingUI from '@/components/loadingui'
import { getblogPosts } from '@/sanity/sanity-utils'

import blogHomePosts from '@/components/blogHome';

// import React, { useEffect, useState } from 'react'

export default async function BlogHomePage() {
	// const [blogPosts, setblogPosts] = useState<any>(null);
	// const [error, setError] = useState<string | null>(null);

	// useEffect(() => {
	// 	const fetchblogPosts = async () => {
	// 		try {
	// 			const fetchedblogPosts = await getblogPosts();
	// 			setblogPosts(fetchedblogPosts);
	// 		} catch (error) {
	// 			console.error("Error fetching posts", error);
	// 			setError("Error loading posts");
	// 		}
	// 	};

	// 	fetchblogPosts();
	// }, []);

	// if (error) {
	// 	return <div className="text-white">
	// 		<h2>An error occured while getting posts, this could be the reason;</h2>
	// 		{error}
	// 	</div>;
	// }

	// if (!blogPosts) {
	// 	return <LoadingUI />; // loading state UI
	// }

	const blogPosts = await getblogPosts();


	return <blogHomePosts blogPosts={blogPost}  />;

}
