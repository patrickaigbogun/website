import { pgTable, varchar, boolean } from 'drizzle-orm/pg-core';

export const roles = pgTable('roles', {
	userId: varchar('userId', { length: 256 }).primaryKey(),
	name: varchar('name', { length: 256 }).notNull(),
	canDelete: boolean('canDelete').notNull(),
});
