import {
	boolean,
	pgTable,
	timestamp,
	uuid,
	varchar,
	integer,
} from 'drizzle-orm/pg-core';
import { courses } from './courses';

export const chapters = pgTable('chapters', {
	id: uuid('id').primaryKey().defaultRandom(),
	courseId: uuid('course_id')
		.notNull()
		.references(() => courses.id, { onDelete: 'cascade' }),

	title: varchar('title', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).unique(),
	order: integer('order').default(0),

	isPublished: boolean('is_published').default(false),
	publishedAt: timestamp('published_at'),

	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});
