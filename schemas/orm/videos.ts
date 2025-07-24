import {
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { chapters } from './chapters';

export const videos = pgTable('videos', {
	id: uuid('id').primaryKey().defaultRandom(),
	chapterId: uuid('chapter_id')
		.notNull()
		.references(() => chapters.id, { onDelete: 'cascade' }),

	title: varchar('title', { length: 255 }),

	assetId: varchar('asset_id', { length: 255 }).notNull(),
	playbackId: varchar('playback_id', { length: 255 }).notNull(),

	duration: integer('duration'), // in seconds, from Mux
	status: varchar('status', { length: 50 }).default('processing'),
	metadata: text('metadata'),

	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});
