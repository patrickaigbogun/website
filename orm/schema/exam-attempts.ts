import { pgTable, uuid, integer, timestamp } from 'drizzle-orm/pg-core';
import { Users } from './users';
import { exams } from './exams';

export const examAttempts = pgTable('exam_attempts', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: uuid('user_id')
		.notNull()
		.references(() => Users.id, { onDelete: 'cascade' }),
	examId: uuid('exam_id')
		.notNull()
		.references(() => exams.id, { onDelete: 'cascade' }),
	startedAt: timestamp('started_at').defaultNow(),
	submittedAt: timestamp('submitted_at'),
	score: integer('score'),
});
