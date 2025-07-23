import { chapters } from './chapters';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const articles = pgTable('articles', {
	id: uuid('id').primaryKey().defaultRandom(),
	chapterId: uuid('chapter_id')
		.notNull()
		.references(() => chapters.id, { onDelete: 'cascade' }),

	title: varchar('title', { length: 255 }),
	content: text('content').notNull(),

	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});
