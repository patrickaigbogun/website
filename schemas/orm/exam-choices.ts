import { pgTable, uuid, text, boolean } from 'drizzle-orm/pg-core';
import { examQuestions } from './exam-questions';

export const examChoices = pgTable('exam_choices', {
	id: uuid('id').primaryKey().defaultRandom(),
	questionId: uuid('question_id')
		.notNull()
		.references(() => examQuestions.id, { onDelete: 'cascade' }),
	text: text('text').notNull(),
	isCorrect: boolean('is_correct').default(false),
});
