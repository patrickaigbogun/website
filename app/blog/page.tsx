// @/app/blog/page.tsx

import { getblogPosts } from '@/sanity/sanity-utils';
import BlogPostsGrid from '@/components/BlogPostsGrid';
import { Suspense } from 'react';
import LoadingUI from '@/components/loadingui';
import CommentForm from '@/components/CommentForm';


export default async function BlogHome() {
  const blogPosts = await getblogPosts();

  
  return (
    <div>
     <Suspense fallback={<LoadingUI />}>
				<BlogPostsGrid blogPosts={blogPosts} />
			</Suspense>
      <CommentForm FieldValue={''}  />
    </div>
  );
}
