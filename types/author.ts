import { PortableTextBlock } from "next-sanity";

export type Author = {
    _id : string;
    _createdAt: Date;
    name: string;
    slug: string;
    publishDate:Date;
    image:string;
};