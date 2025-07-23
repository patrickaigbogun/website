// db/schema/user_library.ts
import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { Users } from './users';
import { courses } from './courses';

export const userLibrary = pgTable('user_library', {
	id: uuid('id').primaryKey().defaultRandom(),

	userId: uuid('user_id')
		.notNull()
		.references(() => Users.id, { onDelete: 'cascade' }),
	courseId: uuid('course_id')
		.notNull()
		.references(() => courses.id, { onDelete: 'cascade' }),

	savedAt: timestamp('saved_at').defaultNow(),
});
