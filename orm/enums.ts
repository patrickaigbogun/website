import { pgEnum } from 'drizzle-orm/pg-core';

// --- Enums ---
export const userRoleEnum = pgEnum('role', ['user', 'admin', 's_admin']);
export const userTierEnum = pgEnum('tier', ['1', '2', '3']);
export const MembershipStatusEnum = pgEnum('membership_status', [
	'pending',
	'member',
	'revoked',
	'expired',
	'caughtion',
	'probation',
]);
export const TeamWarnTimesEnum = pgEnum('warn_time', ['0', '1', '2', '3']);
export const orderStatusEnum = pgEnum('order_status', [
	'open',
	'complete',
	'overdue',
	'extension',
]);
export const templateTypeEnum = pgEnum('template_type', ['email', 'embedded']);
export const contactTypeEnum = pgEnum('contact_type', ['individual', 'org']);
export const campaignTypeEnum = pgEnum('campaign_type', [
	'scheduled',
	'ongoing',
]);
