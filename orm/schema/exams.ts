import {
	pgTable,
	uuid,
	text,
	integer,
	boolean,
	timestamp,
} from 'drizzle-orm/pg-core';
import { courses } from './courses';

export const exams = pgTable('exams', {
	id: uuid('id').primaryKey().defaultRandom(),
	courseId: uuid('course_id')
		.notNull()
		.references(() => courses.id, { onDelete: 'cascade' }),
	title: text('title').notNull(),
	instructions: text('instructions'),
	durationMinutes: integer('duration_minutes'),
	totalScore: integer('total_score'),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});
