import { PortableTextBlock } from '@portabletext/react'

export type Page = {
    _id: string;
    _createdAt: Date;
    title: string;
    slug: string;
    content: PortableTextBlock[];
};