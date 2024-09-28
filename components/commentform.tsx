'use client';

//"@/components/commentform"

import { useState } from 'react';
import { submitComments } from '@/actions/comments/HandleSubmit';
import { CommentFormProps } from '@/types/CommentProps';
import { Form, FormButton, FormLabel, FormTextArea } from './reuseForm';

export function CommentForm({ FieldValue, onCommentSubmitted }: CommentFormProps) {
  const [Value, setValue] = useState(FieldValue || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitComments(Value);
      console.log('Comment submitted successfully');
      setValue(''); // Clear the form
      onCommentSubmitted(); // Call the function to revalidate comments
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel htmlFor="comment" className="text-left text-white">Type your message here:</FormLabel>
      <FormTextArea
        id="comment"
        name="comment"
        rows={3}
        className="w-full p-2 text-black bg-white border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-zinc-700"
        placeholder="Type something here"
        required
        value={Value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className='flex justify-center md:justify-start'>
        <FormButton
          className="w-full mx-auto rounded-full md:w-auto md:mx-0"
          title={'Send Comment'}
        >
          Send Comment
        </FormButton>
      </div>
    </Form>
  );
}
