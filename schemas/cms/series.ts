import { RuleType } from '@/types/components';

const series = {
	name: 'series',

	title: 'Series',

	type: 'document',

	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule: RuleType) => [
				rule.required().error('Series title is required'),
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
			rows: 4,
			validation: (rule: RuleType) => [
				rule.required().error('Series description is required'),
			],
		},
		{
			name: 'image',
			title: 'Cover Image',
			type: 'image',
			options: { hotspot: true },
		},
		{
			name: 'alt',
			title: 'Alt Text',
			type: 'string',
		},
		{
			name: 'orderIndex',
			title: 'Display Order',
			type: 'number',
			description: 'Lower numbers appear first',
		},
	],
};

export default series;
