// @/app/blog/page.tsx

import BlogPostsGridWrapper from '@/components/BlogPostGridWrapper';
import CommentForm from '@/components/CommentForm';


export default function BlogHome() {
  
  return (
    <>
      <BlogPostsGridWrapper />
      <CommentForm FieldValue={''}  />
    </>
  );
}
