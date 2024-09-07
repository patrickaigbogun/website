// /components/BlogPostsGrid

"use client";

import { montserrat } from '@/fonts/fonts'
// import { blogPost } from '@/types/blogPost'
import { blogPostsProps } from '@/types/components'
import Image from 'next/image'
import Link from 'next/link'


export default function BlogPostsGrid({ blogPosts }: blogPostsProps) {
  return (
<div className="grid grid-cols-1 gap-8 mt-5 md:grid-cols-2 lg:grid-cols-3 ">
    {blogPosts.map((blogPost) => (
        <Link
            href={`/blog/post/${blogPost.slug}`}
            key={blogPost._id}
            className="transition duration-300 ease-in-out border border-gray-300 group rounded-3xl hover:scale-105 hover:border-4 hover:border-gray-300">
            {blogPost.image && (
                <Image
                    src={blogPost.image.image}
                    alt={blogPost.image.alt}
                    width={150}
                    height={300}
                    className="object-cover rounded-lg group-hover:brightness-50 "
                />
            )}
            <div className={` ${montserrat.className} font-bold text-gray-300/50 group-hover:text-gray-300 m-2`}>
                {blogPost.title}
            </div>
            <div>
                {blogPost.tagline}
            </div>
            <div>
                {blogPost.excerpt}
            </div>
        </Link>
    ))}
</div>
  )
}
