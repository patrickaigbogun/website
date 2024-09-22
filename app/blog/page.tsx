// @/app/blog/page.tsx

import BlogPostsGridWrapper from '@/components/BlogPostGridWrapper';
import CommentForm from '@/components/CommentForm';
import { CommentTypes } from '@/types/Comments';


export default function BlogHome(comment:CommentTypes) {
  
  return (
    <>
      <BlogPostsGridWrapper />
      <CommentForm _id={comment._id} _createdAt={comment._createdAt} content={''} />
    </>
  );
}
