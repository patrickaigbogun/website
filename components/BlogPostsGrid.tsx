// @/components/BlogPostsGrid



import { blogPostsProps } from '@/types/components'
import Link from 'next/link'
import CardImageBg from '@/components/cardImageBg';


export default function BlogPostsGrid({ blogPosts }: blogPostsProps) {
	return (
		<section>
			<div className=''>
			<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
				{blogPosts.map((blogPost) => {
					console.log(blogPost); // Correctly logs individual blog post
					return (
						<Link
							key={blogPost._id}
							href={`/blog/post/${blogPost.slug}`}
						>

							<CardImageBg
								imageSrc={blogPost.image}
								alt={blogPost.alt || 'Blog post image'}
								title={blogPost.title}
								tagline={blogPost.tagline}
								date={blogPost.publishDate}
								author={blogPost.author.name}
								excerpt={blogPost.excerpt}
								className='transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-50 group-hover:blur-sm'
							/>

						</Link>
					);
				})}
			</div>
		</div>
		</section>
		
	);
}
