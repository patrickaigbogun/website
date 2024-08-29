import { PortableTextBlock } from "next-sanity";

export type blogPost = {
    _id : string;
    _createdAt: Date;
    name: string;
    slug: string;
    image:string;
    url:string;
    content: PortableTextBlock[];
};