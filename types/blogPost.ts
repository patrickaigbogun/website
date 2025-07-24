import { PortableTextBlock } from 'next-sanity';

export type blogPost = {
	alt: string; //image alt
	_id: string;
	_createdAt: Date;
	title: string;
	slug: string; // slug object
	tagline: string;
	excerpt: PortableTextBlock[]; // Excerpt is portable text
	publishDate: Date;
	author: { _id: string; name: string }; // Reference to an Author document
	image: { asset: { _ref: string } }; // Sanity image object
	content: PortableTextBlock[]; // Portable text for content
};
