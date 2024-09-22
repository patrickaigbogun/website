'use client';
import submitComments from '@/actions/comments/HandleSubmit';
import { CommentTypes } from '@/types/Comments';
// import { useState } from 'react';
// import { Form, FormButton, TextAreaLabel, TextAreaNoRq } from '@/components/Form';
// import { createComment } from '@/sanity/sanity-utils'; // Assuming this contains your transaction logic



export default function CommentForm(comment: CommentTypes) {

	// // State to manage the comment input
	// const [comment, setComment] = useState('');

	// // Handle form submission
	// const handleSubmit = async (e: React.FormEvent) => {
	// 	e.preventDefault(); // Prevent page reload on form submit

	// 	// Call the function to create the comment, passing the comment content
	// 	try {
	// 		await createComment({ comment });
	// 		console.log('Comment submitted successfully');

	// 		// Optionally, clear the form
	// 		setComment('');
	// 	} catch (error) {
	// 		console.error('Error submitting comment:', error);
	// 	}
	// };
	return (
		<div>
			{/* <Form onSubmit={handleSubmit}>
				<div className='flex flex-col mx-auto space-y-4'>
					<TextAreaLabel name={comment} className='text-3xl text-white'>
						Comment area
					</TextAreaLabel>
					<TextAreaNoRq
						id={comment}
						name={comment}
						rows={3}
						className='p-2 w-[80%] text-white bg-black rounded-md outline-none focus:ring-4 focus:ring-zinc-700/50'
						placeholder='Leave a comment'
						value={comment} // Bind value to the comment state
						onChange={(e) => setComment(e.target.value)} // Capture change event
					/>
				</div>
				<FormButton title='Send'>Send</FormButton>
			</Form> */}
			<form method='POST' action={submitComments}>
				<label htmlFor={'comment'} className="text-white">Type your message here:</label>
				<textarea
					id={comment._id}
					name={'comment'}
					rows={3}
					placeholder='type something here'
					required
				// value={comment.content}
				>
					{comment.content}
				</textarea>
				<button type="submit">send comment</button>
			</form>
		</div>
	)
}


