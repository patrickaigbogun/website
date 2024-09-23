'use client';
import { useState } from 'react';
import { submitComments } from '@/actions/comments/HandleSubmit';
import { CommentProps } from '@/types/CommentProps';

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
		<form onSubmit={handleSubmit}>
			<label htmlFor="comment" className="text-white">Type your message here:</label>
			<textarea
				id="comment"
				name="comment"
				rows={3}
				placeholder="Type something here"
				required
				value={Value} // Bind the textarea to the state
				onChange={(e) => setValue(e.target.value)} // Update state on change
			/>
			<button type="submit">Send Comment</button>
		</form>
	);
}
