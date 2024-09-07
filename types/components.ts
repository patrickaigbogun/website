import { Page } from "./Page";
import { blogPost } from './blogPost'


export type HeaderProps = {
    pages: Page[];
};

export type blogPostsProps = {
    blogPosts: blogPost[];
};

export type LinkProps =  {
    target: string;
    children: React.ReactNode;
    title?: string; // Optional third parameter
};

export type  ButtonProps =  {
    children: React.ReactNode;
};

