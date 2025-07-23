// db/schema/course_engagements.ts
import {
	pgTable,
	uuid,
	timestamp,
	integer,
	text,
	varchar,
} from 'drizzle-orm/pg-core';
import { Users } from './users';
import { videos } from './videos';

export const courseEngagements = pgTable('course_engagements', {
	id: uuid('id').primaryKey().defaultRandom(),

	userId: uuid('user_id')
		.notNull()
		.references(() => Users.id, { onDelete: 'cascade' }),
	videoId: uuid('video_id')
		.notNull()
		.references(() => videos.id, { onDelete: 'cascade' }),

	sessionId: uuid('session_id').notNull(),
	watchTimeSeconds: integer('watch_time_seconds').default(0),
	completionPercentage: integer('completion_percentage').default(0),

	playbackSpeed: varchar('playback_speed', { length: 20 }),
	quality: varchar('quality', { length: 50 }),
	device: varchar('device', { length: 100 }),

	createdAt: timestamp('created_at').defaultNow(),
});
