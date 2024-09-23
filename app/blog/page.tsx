// @/app/blog/page.tsx

import BlogPostsGridWrapper from '@/components/BlogPostGridWrapper';
import CommentForm from '@/components/CommentForm';
import { CommentTypes } from '@/types/Comments';


export default function BlogHome(comment:CommentTypes) {
  
  return (
    <>
      <BlogPostsGridWrapper />
      <CommentForm FieldValue={comment._id}  />
    </>
  );
}
