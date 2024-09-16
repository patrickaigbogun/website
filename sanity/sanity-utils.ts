// sanity-utils.ts

import { Project } from "@/types/Projects";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { Page } from "@/types/Page";
import { blogPost } from "@/types/blogPost";
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";


// UNCOMMENT WHEN YOU UNCOMMENT AUTHOR ASYNC FETCHES
// import { Author } from "@/types/author"


const builder = imageUrlBuilder(clientConfig)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export async function getProjects(): Promise<Project[]> {


	return createClient(clientConfig).fetch(
		groq`*[_type == 'project']{

            _id,
            _createdAt,
            name,
            'slug': slug.current,
            'image': image.asset->url,
            url,
            content
        }`
	);
}


export async function getProject(slug: String): Promise<Project> {

	return createClient(clientConfig).fetch(
		groq`*[_type == 'project' && slug.current == $slug][0]{

			_id,
			_createdAt,
			name,
			'slug': slug.current,
			'image': image.asset->url,
			url,
			content
        }`,
		{ slug }
	);


}


export async function getPages(): Promise<Page[]> {

	return createClient(clientConfig).fetch(
		groq`*[_type == 'page']{
			_id,
			_createdAt,
			title,
			'slug': slug.current
        }`
	);
}

export async function getPage(slug: String): Promise<Page> {

	return createClient(clientConfig).fetch(
		groq`*[_type == 'page' && slug.current == $slug][0]{
			_id,
			_createdAt,
			title,
			'slug': slug.current,
			content
        }`,
		{ slug }
	);
}

export async function getblogPosts(): Promise<blogPost[]> {
	return createClient(clientConfig).fetch(
		groq`*[_type == 'blogPost']{
			_id,
			_createdAt,
			title, 
			'slug': slug.current,
			'image': image.asset->url,
			alt,
			tagline,
			excerpt, 
			publishDate,
			'authors': authors._ref->name, 
			content
		}`
	);
	// we return the authors name here in a similar fashion as we return the image url, 
	// this is untested, the reasoning behind it being that author is stored as an object in the blogpost document same as image, 
	// we hope to return the name of the author defined in the author document through the reference created between them.
	// if this works we implement it for the individual blogpost.
}


export async function getblogPost(slug: string): Promise<blogPost> {
	return createClient(clientConfig).fetch(
		groq`*[_type == 'blogPost' && slug.current == $slug][0]{
			_id,
			_createdAt,
			title,
			'slug': slug.current,
			alt,
			tagline,
			excerpt,
			publishDate,
			authors,
			'image': image.asset->url,
			content
		}`,
		{ slug }
	);
}


// UNCOMMENT IF YOU BUILD AN INDIVIDUAL AUTHOR PAGE OR NEED TO FETCH AUTHORS FOR SOME REASON


// export async function getAuthors(slug: String): Promise<Page> {

// 	return createClient(clientConfig).fetch(
// 		groq`*[_type == 'page']{
// 			_id,
// 			_createdAt,
// 			name,
// 			'image': image.asset->url,
			
//         }`
// 	);
// }


// export async function getAuthor(slug: String): Promise<Author> {

// 	return createClient(clientConfig).fetch(
// 		groq`*[_type == 'author' && slug.current == $slug][0]{

// 			_id,
// 			_createdAt,
// 			name,
// 			'slug': slug.current,
// 			publishDate,
// 			'image': image.asset->url,

// 		}`, 
// 		{ slug }
// 	);


// }