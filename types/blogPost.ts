import { PortableTextBlock } from "next-sanity";

export type blogPost = {
    _id : string;
    _createdAt: Date;
    title: string;
    slug: string;
    tagline:string;
    excerpt:string;
    publishDate:Date;
    authors:string;
    image:string;
    url:string;
    content: PortableTextBlock[];
};