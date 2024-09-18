// @/app/blog/page.tsx

import BlogPostsGridWrapper from '@/components/BlogPostGridWrapper';
import { TextAreaLabel, TextAreaNoRq } from '@/components/Form';

export default function BlogHome() {
	return (
		<>
			<BlogPostsGridWrapper />
			<div className='flex flex-col mx-auto space-y-4'>
			<TextAreaLabel name={'comment'} reuse='text-white text-3xl' >comment area</TextAreaLabel>
			<TextAreaNoRq id='comment' name='comment' rows={3} reuse='bg-black text-white border-red' placeholder='leave a comment' />
			</div>
		</>
	);
};
