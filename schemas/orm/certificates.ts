import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { Users } from './users';
import { courses } from './courses';
import { examAttempts } from './exam-attempts';

export const certificates = pgTable('certificates', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: uuid('user_id')
		.notNull()
		.references(() => Users.id),
	courseId: uuid('course_id')
		.notNull()
		.references(() => courses.id),
	certificateUrl: varchar('certificate_url', { length: 1024 }).notNull(),
	issuedAt: timestamp('issued_at').defaultNow(),
	certificateNumber: varchar('certificate_number', { length: 64 })
		.unique()
		.notNull(),

	// Optional: Track which exam attempt issued it
	examAttemptId: uuid('exam_attempt_id').references(() => examAttempts.id),
});
