'use client';

//"@/components/commentsection.tsx"

import { useEffect, useState } from 'react';
import * as motion from 'framer-motion/client';
// import { CommentBubble } from "./commentbubble";
import { getComments } from '@/lib//cms/sanity';
import { CommentTypes } from '@/types/Comments'; // Ensure you import your CommentTypes
// import { CommentForm } from "./commentform";
import dynamic from 'next/dynamic';

const CommentForm = dynamic(
	() => import('@/components/commentform').then(mod => mod.CommentForm),
	{ ssr: false }
);
const CommentBubble = dynamic(
	() => import('@/components/commentbubble').then(mod => mod.CommentBubble),
	{ loading: () => <p>Loading...</p>, ssr: false }
);

function CommentSection() {
	const [showMore, setShowMore] = useState(false);

	const [comments, setComments] = useState<CommentTypes[]>([]); // Specify the type here
	const [shouldRevalidate, setShouldRevalidate] = useState(false);

	// Fetch comments from your API
	const fetchComments = async () => {
		const fetchedComments = await getComments();
		setComments(fetchedComments); // This will now accept CommentTypes[]
	};

	useEffect(() => {
		fetchComments();
	}, [shouldRevalidate]); // Re-fetch comments whenever shouldRevalidate changes

	// Set up a timer to revalidate comments every second
	useEffect(() => {
		const interval = setInterval(() => {
			fetchComments();
		}, 1000); // Revalidate every 1 second

		return () => clearInterval(interval); // Cleanup on unmount
	}, []);

	const handleCommentSubmitted = () => {
		setShouldRevalidate(prev => !prev); // Toggle the state to trigger revalidation
	};

	return (
		<section className='w-full p-0 mx-auto my-8 space-y-10 text-center sm:max-w-3xl'>
			<section>
				<CommentForm
					FieldValue={''}
					onCommentSubmitted={handleCommentSubmitted}
				/>
			</section>

			<button onClick={() => setShowMore(!showMore)}>
				<h2 className='p-2 m-0 text-xl font-bold text-black transition-all ease-linear bg-white border-4 border-gray-200 rounded-full hover:scale-105'>
					{showMore
						? 'Hide Comments'
						: `Show Comments (${comments.length})`}
				</h2>
			</button>

			<div
				className={`transition-opacity duration-500 ${showMore ? 'opacity-100' : 'opacity-0'}`}
			>
				{showMore && (
					<section className='space-y-6'>
						{comments.length > 0 ? (
							<CommentBubble comments={comments} />
						) : (
							<p className='text-gray-500'>
								No comments yet. Be the first to comment!
							</p>
						)}
					</section>
				)}
			</div>
		</section>
	);
}

export default CommentSection;
