import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { emailVerifiedEnum, isActiveEnum, userRoleEnum } from '../enums';

export const Users = pgTable('users', {
	id: uuid().primaryKey().defaultRandom(),
	email: varchar({ length: 255 }).unique().notNull(),
	password_hash: varchar().unique().notNull(),
	role: userRoleEnum().notNull().default('pupil'),
	first_name: text().notNull().unique(),
	last_name: text().notNull().unique(),
	avatar_url: varchar().notNull().unique(),
	bio: text().notNull().unique(),
	email_verified: emailVerifiedEnum().notNull().default('false'),
	is_active: isActiveEnum().notNull().default('false'),
	last_login: timestamp(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp().defaultNow(),
});
