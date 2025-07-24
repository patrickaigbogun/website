import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { chapters } from './chapters';

export const resources = pgTable('resources', {
	id: uuid('id').primaryKey().defaultRandom(),
	chapterId: uuid('chapter_id')
		.notNull()
		.references(() => chapters.id, { onDelete: 'cascade' }),

	label: varchar('label', { length: 255 }).notNull(),
	url: varchar('url', { length: 1024 }).notNull(),
	resourceType: varchar('resource_type', { length: 50 }).default('file'), // 'pdf', 'link', 'zip', etc.

	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});
