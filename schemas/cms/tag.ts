import { RuleType } from '@/types/components';

const tag = {
	name: 'tag',

	title: 'Tags',

	type: 'document',

	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule: RuleType) => [
				rule.required().error('Tag title is required'),
			],
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title' },
			validation: (rule: RuleType) => [
				rule.required().error('Slug is required'),
			],
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 2,
		},
		{
			name: 'color',
			title: 'Color',
			type: 'string',
			description: 'Optional color for tag badge (e.g., #10B981)',
		},
	],
};

export default tag;
