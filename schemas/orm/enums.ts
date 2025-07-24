import { pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('role', ['pupil', 'creator', 'admin']);
export const videoStatusEnum = pgEnum('status', [
	'processing',
	'ready',
	'failed',
]);
export const emailVerifiedEnum = pgEnum('verified', ['true', 'false']);
export const isActiveEnum = pgEnum('active', ['true', 'false']);
