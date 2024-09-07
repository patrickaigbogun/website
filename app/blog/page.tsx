// /app/blog/page.tsx

import { getblogPosts } from '@/sanity/sanity-utils';
import BlogPostsGrid from '@/components/BlogPostsGrid';

export default async function BlogHomePage() {
    const blogPosts = await getblogPosts();

    return <BlogPostsGrid blogPosts={blogPosts} />;
}
