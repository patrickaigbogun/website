// import { group } from "console";

import { RuleType } from "@/types/components";
import ImageSchema from "./image-schema";




const blogPost = {
	name: "blogPost",

	title: "BlogPosts",

	type: "document",

	groups: [
		{
			name: 'seo',
			title: 'SEO',
		},
		{
			name: 'summary',
			title: 'Summary',
		},
	],

	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
			group: ["seo", "summary"],
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: { source: "title" },
		},
		{
			name: "tagline",
			title: "Tagline",
			type: "string",
			group: ["seo", "summary"],
			validation: (rule: RuleType) => rule.max(50).warning('Shorter titles are usually better')
		},
		{
			name: "excerpt",
			title: "Excerpt",
			type: "array",
			of: [{ type: "block" }],
			group: ["summary"],
			validation: (rule: RuleType) => rule.max(50).warning('Shorter excerpts are usually better')
		},
		{
			title: 'Publish date',
			name: 'publishDate',
			type: 'date',
			options: {
				dateFormat: 'YYYY-MM-DD',
				calendarTodayLabel: 'Today'
			},
			group: ["seo", "summary"],
		},
		{
			name: 'authors',
			type: 'reference',
			title: 'Authors',
			to: [{ type: 'author' }],
			group: ["summary"],
		},
		ImageSchema,
		{
			name: "content",
			title: "Content",
			type: "array",
			of: [{ type: "block" }],
		},
	],
};

export default blogPost;
