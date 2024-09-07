import { PortableTextBlock } from "next-sanity";

export type blogPost = {
    alt: string;
    _id: string;
    _createdAt: Date;
    title: string;
    slug: string // slug object
    tagline: string;
    excerpt: PortableTextBlock[]; // Excerpt is portable text
    publishDate: Date;
    authors: { _ref: string; _type: string }; // Reference to an Author document
    image: { asset: { _ref: string }; alt: string }; // Sanity image object with alt text
    content: PortableTextBlock[]; // Portable text for content
};
