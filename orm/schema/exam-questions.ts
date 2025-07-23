import {
	pgTable,
	uuid,
	text,
	integer,
	timestamp,
	pgEnum,
} from 'drizzle-orm/pg-core';
import { exams } from './exams';

export const questionTypeEnum = pgEnum('question_type', [
	'multiple_choice',
	'true_false',
	'short_answer',
]);

export const examQuestions = pgTable('exam_questions', {
	id: uuid('id').primaryKey().defaultRandom(),
	examId: uuid('exam_id')
		.notNull()
		.references(() => exams.id, { onDelete: 'cascade' }),
	questionText: text('question_text').notNull(),
	questionType: questionTypeEnum('question_type').notNull(),
	score: integer('score').default(1),
	createdAt: timestamp('created_at').defaultNow(),
});
