'use client';

import React from 'react';
import BlogPostCard from '@/components/blogpost-card';

export default function TestPage() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 p-8'>
			<BlogPostCard
				href='/blog/example'
				title='Designing Shaped Cards'
				tagline='Bottom-left cutout with avatar'
				date={new Date()}
				coverImage='https://images.unsplash.com/photo-1527766833261-b9ad6cdf16e8?q=80&w=800&auto=format&fit=crop'
				authorName='John Doe'
				authorImage='https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&auto=format&fit=crop'
			/>
		</div>
	);
}
