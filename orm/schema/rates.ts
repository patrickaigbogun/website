import {
	pgTable,
	varchar,
	boolean,
	integer,
	primaryKey,
	index,
} from 'drizzle-orm/pg-core';

export const rates = pgTable(
	'rates',
	{
		userId: varchar('userId', { length: 256 }).notNull(),
		commentId: integer('commentId').notNull(),
		like: boolean('like').notNull(),
	},
	table => [
		primaryKey({ columns: [table.userId, table.commentId] }),
		index('comment_idx').on(table.commentId),
	]
);
