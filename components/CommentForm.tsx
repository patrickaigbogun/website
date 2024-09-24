'use client';
import { useState } from 'react';
import { submitComments } from '@/actions/comments/HandleSubmit';
import { CommentProps } from '@/types/CommentProps';
import { Form, FormButton, FormLabel, FormTextArea } from './Form';

export default function CommentForm({ FieldValue, }: CommentProps) {
	// State to manage the comment input
	const [Value, setValue] = useState(FieldValue || '');

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevent page reload on form submit

		// Call the function to submit the comment, passing the content from state
		try {
			await submitComments(Value);
			console.log('Comment submitted successfully');

			// Optionally, clear the form
			setValue('');
		} catch (error) {
			console.error('Error submitting comment:', error);
		}
	};

	return (
		<Form onSubmit={handleSubmit} >
			<FormLabel htmlFor="comment" className="text-left text-white">Type your message here:</FormLabel>
			<FormTextArea
				id="comment"
				name="comment"
				rows={3}
				className="w-full p-2 text-black bg-white border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-zinc-700"
				placeholder="Type something here"
				required
				value={Value} // Bind the textarea to the state
				onChange={(e) => setValue(e.target.value)} // Update state on change
			/>
			<div
			className='flex justify-center md:justify-start'
			>
				<FormButton
					className="w-full mx-auto md:w-auto md:mx-0 "
					title={'Send Comment'} 
					>
					Send Comment
				</FormButton>
			</div>

		</Form>
	);
}
