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

export type RuleType = {
	warning: (arg0: string) => RuleType;
	required: () => RuleType
	min: (min: number) => RuleType
	max: (max: number) => RuleType
	length: (exactLength: number) => RuleType
	greaterThan: (gt: number) => RuleType
	uri: (options: { scheme: string[] }) => RuleType
}