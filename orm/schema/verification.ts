import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const verification = pgTable('verification', {
	id: text('id').primaryKey(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp().notNull(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp().defaultNow(),
});
