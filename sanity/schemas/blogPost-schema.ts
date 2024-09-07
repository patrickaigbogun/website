// import { group } from "console";


export type RuleType = {
	warning: (arg0: string) => RuleType;
	required: () => RuleType
	min: (min: number) => RuleType
	max: (max: number) => RuleType
	length: (exactLength: number) => RuleType
	greaterThan: (gt: number) => RuleType
	uri: (options: { scheme: string[] }) => RuleType
  }
  

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
			options: { source: "name" },
		},
		{
			name: "tagline",
			title: "Tagline",
			type: "string",
			group: ["seo", "summary"],
			validation: (rule: RuleType)=> rule.max(50).warning('Shorter titles are usually better')
		},
		{
			name: "excerpt",
			title: "Excerpt",
			type: "array",
			of: [{ type: "block" }],
			group: [ "summary"],
			validation: (rule: RuleType)=> rule.max(50).warning('Shorter titles are usually better')
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
			to: [{type: 'Author' }],
			group: [ "summary"],
			
		  },
		{
			name: "image",
			title: "Image",
			type: "image",
			options: { hotspot: true },
			fields: [
				{
					name: "alt",
					title: "Alt",
					type: "string",
					options: {source: "name"},
				},
			],
		},
		{
			name: "content",
			title: "Content",
			type: "array",
			of: [{ type: "block" }],
		},
	],
};

export default blogPost;
