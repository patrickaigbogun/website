import { PortableTextBlock } from "next-sanity";
import { Page } from "./Page";
import { blogPost } from './blogPost'
import { FormEventHandler } from "react";


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

export type AutoCompleteOptions = 
  | 'on'
  | 'off'
  | 'name'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'tel'
  | 'address-line1'
  | 'address-line2'
  | 'country'
  | 'postal-code'
  | 'city'
  | 'state'
  | 'organization';

export type FormProps = {
    onSubmit?: FormEventHandler<HTMLFormElement>;
    action?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; // More specific method types
    autoComplete?: AutoCompleteOptions; // Narrowed type for autocomplete
    children?: React.ReactNode;
}


export type TextAreaProps = {
	id: string;
	name: string;
	rows: number;
	className?:string;
	placeholder:string;
	value?:string
	children?: React.ReactNode;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export type TextAreaLabelProps = {
	htmlFor: string;
	className:string;
	children?: React.ReactNode;
}

export type FormButtonProps = {
	children : React.ReactNode;
	title:string;
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