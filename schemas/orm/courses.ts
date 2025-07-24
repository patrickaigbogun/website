import {
	boolean,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';

export const courses = pgTable('courses', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: varchar('title', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	description: text('description'),
	image: varchar('image', { length: 1024 }),
	authorId: uuid('author_id').notNull(),

	isPublished: boolean('is_published').default(false),
	publishedAt: timestamp('published_at'),

	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});
