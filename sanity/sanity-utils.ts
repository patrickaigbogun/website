// sanity-utils.ts

import { Project } from "@/types/Projects";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { Page } from "@/types/Page";
import { blogPost } from "@/types/blogPost";

// UNCOMMENT WHEN YOU UNCOMMENT AUTHOR ASYNC FETCHES
// import { Author } from "@/types/author"

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
            name,
            'slug': slug.current,
            'image': image.asset->url,
            url,
            content
        }`
	);
}

export async function getblogPost(slug: String): Promise<blogPost> {

	return createClient(clientConfig).fetch(
		groq`*[_type == 'blogPost' && slug.current == $slug][0]{

			_id,
			_createdAt,
			title,
			'slug': slug.current,
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