import { RuleType } from "@/types/components";

const page = {
    name: "page",
    title: "Pages",
    type: "document",
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
			name: "image",
			title: "Image",
			type: "image",
			options: { hotspot: true },
		},
        {
			name: "alt",
			title: "Alt Text",
			type: "string",
			validation: (rule: RuleType) => rule.required(),
		},	
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                kMaxLength: 96,
            }
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{type: 'block'}],
        },
    ]
}

export default page;