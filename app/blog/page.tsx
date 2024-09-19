// @/app/blog/page.tsx
'use client';
import { useState } from 'react';
import BlogPostsGridWrapper from '@/components/BlogPostGridWrapper';
import { Form, FormButton, TextAreaLabel, TextAreaNoRq } from '@/components/Form';
import {createComment} from '@/sanity/sanity-utils'; // Assuming this contains your transaction logic

export default function BlogHome() {
  // State to manage the comment input
  const [comment, setComment] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Call the function to create the comment, passing the comment content
    try {
      await createComment({ comment });
      console.log('Comment submitted successfully');
      
      // Optionally, clear the form
      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <>
      <BlogPostsGridWrapper />
      <Form onSubmit={handleSubmit}>
        <div className='flex flex-col mx-auto space-y-4'>
          <TextAreaLabel name={'comment'} className='text-3xl text-white'>
            Comment area
          </TextAreaLabel>
          <TextAreaNoRq
            id='comment'
            name='comment'
            rows={3}
            className='p-2 w-[80%] text-white bg-black rounded-md outline-none focus:ring-4 focus:ring-zinc-700/50'
            placeholder='Leave a comment'
            value={comment} // Bind value to the comment state
			onChange={(e) => setComment(e.target.value)} // Capture change event
          />
        </div>
        <FormButton title='Send'>Send</FormButton>
      </Form>
    </>
  );
}
