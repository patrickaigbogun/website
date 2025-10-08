import { json, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const cronJobs = pgTable('cron_jobs', {
	id: uuid('id').defaultRandom().primaryKey(),
	jobType: text('job_type').notNull(), // e.g. 'campaign_send', 'order_check'
	data: json('data').notNull(), // dynamic payload (contact ids, email id etc.)
	schedule: text('schedule').notNull(), // ISO date string or cron format
	status: text('status').default('scheduled'), // scheduled, running, complete, failed
	createdAt: timestamp('created_at').defaultNow(),
});
