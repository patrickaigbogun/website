import { RuleType } from '@/types/components';

const category = {
	name: 'category',

	title: 'Categories',

	type: 'document',

	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule: RuleType) => [
				rule.required().error('Category title is required'),
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
			rows: 3,
		},
		{
			name: 'color',
			title: 'Color',
			type: 'string',
			description: 'Optional color for category badge (e.g., #3B82F6)',
		},
	],
};

export default category;
