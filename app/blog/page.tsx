// @/app/blog/page.tsx

import { getblogPosts } from '@/sanity/sanity-utils';
import BlogPostsGrid from '@/components/blogPostsGrid';
import { Suspense } from 'react';
import LoadingUI from '@/components/loadingui';
import CommentForm from '@/components/commentForm';
import BlogHero from '@/components/blogHero';

export default async function BlogHome() {
	const blogPosts = await getblogPosts();


	return (
		<div className='space-y-20' >
			<BlogHero />
			<Suspense fallback={<LoadingUI />}>
				<BlogPostsGrid blogPosts={blogPosts} />
			</Suspense>
			<section>
				<CommentForm FieldValue={''} />
			</section>
		</div>
	);
}
