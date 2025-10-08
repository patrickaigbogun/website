import {
	boolean,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { userRoleEnum, userTierEnum } from '../enums';

export const user = pgTable('user', {
	id: text().primaryKey(), // Changed from uuid() to text() for Better Auth compatibility
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).unique().notNull(),
	emailVerified: boolean().default(false).notNull(),
	image: varchar({ length: 500 }),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp().defaultNow(),

	role: userRoleEnum(),
});
