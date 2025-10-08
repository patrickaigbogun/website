import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './users';

export const session = pgTable('session', {
	id: text().primaryKey(),
	expiresAt: timestamp().notNull(),
	token: text().notNull().unique(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp().defaultNow(),
	ipAddress: text(),
	userAgent: text(),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
});
