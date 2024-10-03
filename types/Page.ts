import { PortableTextBlock } from '@portabletext/react'

export type Page = {
    _id: string;
    _createdAt: Date;
    title: string;
    alt: string;
    slug: string;
    image?:string;
    content: PortableTextBlock[];
};