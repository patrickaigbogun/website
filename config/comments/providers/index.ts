import { createBetterAuthAdapter } from '@fuma-comment/server/adapters/better-auth';
import { createDrizzleAdapter } from '@fuma-comment/server/adapters/drizzle';
import { comments, rates, roles, user } from '@/orm/schema';
import { db } from '@/config/db/orms/client';
import { auth as betterAuth } from '@/config/auth/providers';

const auth = createBetterAuthAdapter(betterAuth);

const storage = createDrizzleAdapter({
	db,
	schemas: {
		comments,
		rates,
		roles,
		user,
	},
	auth: 'better-auth',
});
