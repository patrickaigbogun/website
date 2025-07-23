// // @/components/BlogPostGridWrapper.tsx

// import { getblogPosts } from '@/sanity/sanity-utils';
// import BlogPostsGrid from '@/components/BlogPostsGrid';
// import { Suspense } from 'react';
// import LoadingUI from './loadingui';

// export default async function BlogPostsGridWrapper() {

// 	const blogPosts = await getblogPosts();

// 	return (
// 		<div>
// 			<Suspense fallback={<LoadingUI />}>
// 				<BlogPostsGrid blogPosts={blogPosts} />
// 			</Suspense>
// 		</div>
// 	);
// }
