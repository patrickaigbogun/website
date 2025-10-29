// lib/cms/sanity-server.ts
// Server-only Sanity client and utilities

import { Project } from '@/types/Projects';
import { createClient, groq } from 'next-sanity';
import clientConfig from '@/config/cms/providers/client';
import { Page } from '@/types/Page';
import { blogPost } from '@/types/blogPost';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Author } from '@/types/author';
import { CommentTypes } from '@/types/Comments';

// Server-only client instance
const client = createClient(clientConfig);

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

export async function getProjects(): Promise<Project[]> {
	return client.fetch(
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
	return client.fetch(
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
	return client.fetch(
		groq`*[_type == 'page']{
			_id,
			_createdAt,
			title,
			'slug': slug.current
        }`
	);
}

export async function getPage(slug: String): Promise<Page> {
	return client.fetch(
		groq`*[_type == 'page' && slug.current == $slug][0]{
			_id,
			_createdAt,
			title,
			alt,
			'slug': slug.current,
			'image': image.asset->url,
			content
        }`,
		{ slug }
	);
}

export async function getblogPosts(): Promise<blogPost[]> {
	return client.fetch(
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
			'author': authors->{_id, name},
			content
		}`
	);
}

export async function getblogPost(slug: string): Promise<blogPost> {
	return client.fetch(
		groq`*[_type == 'blogPost' && slug.current == $slug][0]{
			_id,
			_createdAt,
			title,
			alt,
			'slug': slug.current,
			'image': image.asset->url,
			tagline,
			excerpt,
			publishDate,
			'author': authors->{_id, name},
			content,
			'comments': *[_type == 'comment' && references(^._id)]{
				_id,
				name,
				comment,
				_createdAt
			}
		}`,
		{ slug }
	);
}

export async function getAuthors(): Promise<Author[]> {
	return client.fetch(
		groq`*[_type == 'author']{
			_id,
			_createdAt,
			name,
			'slug': slug.current,
			'image': image.asset->url,
			alt,
			bio,
			'socials': socials,
			'posts': *[_type == 'blogPost' && references(^._id)]{
				_id,
				title,
				'slug': slug.current,
				'image': image.asset->url,
				alt,
				publishDate
		}`
	);
}

export async function getAuthor(authorId: string): Promise<Author> {
	return client.fetch(
		groq`*[_type == 'author' && _id == $authorId][0]{
			_id,
			_createdAt,
			name,
			'slug': slug.current,
			'image': image.asset->url,
			alt,
			bio,
			'socials': socials,
			'posts': *[_type == 'blogPost' && references(^._id)]{
				_id,
				title,
				'slug': slug.current,
				'image': image.asset->url,
				alt,
				publishDate
			}
		}`,
		{ authorId }
	);
}

export async function getComments(postId: string): Promise<CommentTypes[]> {
	return client.fetch(
		groq`*[_type == 'comment' && blogPost._ref == $postId] | order(_createdAt desc) {
			_id,
			name,
			comment,
			_createdAt
		  }`,
		{ postId }
	);
}
