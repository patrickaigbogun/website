import {
	pgTable,
	varchar,
	integer,
	serial,
	json,
	timestamp,
} from 'drizzle-orm/pg-core';

export const comments = pgTable('comments', {
	id: serial('id').primaryKey().notNull(),
	page: varchar('page', { length: 256 }).notNull(),
	thread: integer('thread'),
	author: varchar('author', { length: 256 }).notNull(),
	content: json('content').notNull(),
	timestamp: timestamp('timestamp', { withTimezone: true })
		.defaultNow()
		.notNull(),
});
