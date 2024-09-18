import { PortableTextBlock } from "next-sanity";
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
	direction: 'back' | 'forward';
};

export type FormProps = {
	action:string;
	children:React.ReactNode;
}

export type TextAreaProps = {
	id: string;
	name: string;
	rows: number;
	reuse:string;
	placeholder:string;
	children?: React.ReactNode;
}

export type TextAreaLabelProps = {
	name: string;
	reuse:string;
	children?: React.ReactNode;
}

export type RuleType = {
	error(arg0: string): unknown;
	warning: (arg0: string) => RuleType;
	required: () => RuleType
	min: (min: number) => RuleType
	max: (max: number) => RuleType
	length: (exactLength: number) => RuleType
	greaterThan: (gt: number) => RuleType
	uri: (options: { scheme: string[] }) => RuleType
};


export type CardImageBgProps = {
	imageSrc: { asset: { _ref: string }}; 
	alt: string;
	title?: string;
	tagline?: string;
	date: Date;
	author: string;
	excerpt: PortableTextBlock[];
	// reuse: string;
	className?: string;
};