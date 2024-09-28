'use client';

//"@/components/commentsection.tsx"

import { useEffect, useState } from "react";
// import { CommentBubble } from "./commentbubble";
import { getComments } from "@/sanity/sanity-utils";
import { CommentTypes } from "@/types/Comments"; // Ensure you import your CommentTypes
// import { CommentForm } from "./commentform";
import dynamic from "next/dynamic";

const CommentForm = dynamic(() => import('@/components/commentform').then((mod) => mod.CommentForm), { ssr: false })
const CommentBubble = dynamic(() => import('@/components/commentbubble').then((mod) => mod.CommentBubble), { ssr: false })


function CommentSection() {

	const [showMore, setShowMore] = useState(false)

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
		}, 60000); // Revalidate every 1 second

		return () => clearInterval(interval); // Cleanup on unmount
	}, []);

	const handleCommentSubmitted = () => {
		setShouldRevalidate((prev) => !prev); // Toggle the state to trigger revalidation
	};

	return (
		<section className="max-w-3xl p-4 mx-auto my-8 bg-white rounded-lg shadow-lg">
			<section>
				<CommentForm FieldValue={''} onCommentSubmitted={handleCommentSubmitted} />
			</section>

			<h2 className="mb-4 text-xl font-bold">Comments ({comments.length})</h2>

			{showMore && (<div className="space-y-6">
				{comments.length > 0 ? (
					<CommentBubble comments={comments} />
				) : (
					<p className="text-gray-500">No comments yet. Be the first to comment!</p>
				)}
			</div>)}
			<button onClick={() => setShowMore(!showMore)}>Toggle</button>


		</section>
	);
}

export default CommentSection;