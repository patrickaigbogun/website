// @/app/blog/page.tsx

import BlogPostsGridWrapper from '@/components/BlogPostGridWrapper';
import { Form, TextAreaLabel, TextAreaNoRq } from '@/components/Form';

export default function BlogHome() {
	return (
		<>
			<BlogPostsGridWrapper />
			<Form action='api/comments/submit' >
			<div className='flex flex-col mx-auto space-y-4'>
			<TextAreaLabel name={'comment'} reuse='text-white text-3xl' >comment area</TextAreaLabel>
			<TextAreaNoRq id='comment' name='comment' rows={3} reuse='bg-black text-white  outline-none focus:ring-4 focus:ring-zinc-700/50 rounded-md p-2' placeholder='leave a comment' />
			</div>
			</Form>
			
		</>
	);
};
