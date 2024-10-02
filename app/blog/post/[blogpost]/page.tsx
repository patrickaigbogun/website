import CommentSection from "@/components/commentsection";
import { getblogPost, urlFor } from "@/sanity/sanity-utils";
import { PortableText } from "next-sanity";

type Props = {
	params: { blogpost: string }
};

export default async function page({ params }: Props) {
	const blogPost = await getblogPost(params.blogpost);

	return (
		<div className="w-full md:w-[75%] mx-auto" >
			<h1 className="text-5xl font-bold" >
				{blogPost.title}
			</h1>
			<h4 className="text-lg text-wrap">
				{blogPost.tagline}
			</h4>
			<h6 className="text-[#5f5272]" >
				{new Date(blogPost.publishDate).toDateString()}
			</h6>
			<h4 className="font-bold" >
				{blogPost.author.name}
			</h4>
			<section>
				<img
					src={urlFor(blogPost.image).url()}
					alt={blogPost.alt}
					width={960}
					height={540}
					className="object-cover my-10 border-2 border-gray-700 aspect-video rounded-xl"
				/>
				<div className="" >
				<PortableText value={blogPost.content} />
				</div>
			</section>
			<section>
				<CommentSection />
			</section>
		</div>
	)
}
