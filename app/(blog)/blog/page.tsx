// @/app/blog/page.tsx

import { getblogPosts } from '@/lib/cms/sanity';
import { BlogPostsGrid } from '@/components/blogpostsgrid';
// import { CommentForm } from '@/components/commentform';
import BlogHero from '@/components/bloghero';

export default async function BlogHome() {
	const blogPosts = await getblogPosts();

	return (
		<div className='space-y-20'>
			<BlogHero />
			<section>
				<BlogPostsGrid blogPosts={blogPosts} />
			</section>
		</div>
	);
}
