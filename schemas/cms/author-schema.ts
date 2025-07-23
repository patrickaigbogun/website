const author = {
	name: 'author',

	title: 'Author',

	type: 'document',

	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'string',
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'name' },
		},
		{
			title: 'Publish date',
			name: 'publishDate',
			type: 'date',
			options: {
				dateFormat: 'YYYY-MM-DD',
				calendarTodayLabel: 'Today',
			},
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: { hotspot: true },
			fields: [
				{
					name: 'alt',
					title: 'Alt',
					type: 'string',
					options: { source: 'name' },
				},
			],
		},
	],
};

export default author;
