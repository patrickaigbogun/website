import { SignIn } from '@/components/email/magic-link-template';
import { db } from '@/config/db/orms/client';
import { emailConfig } from '@/config/email/providers/client';
import {
	account,
	session as sessions,
	user as users,
	verification,
} from '@/orm/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { customSession, magicLink } from 'better-auth/plugins';
import { eq } from 'drizzle-orm';
import { createElement } from 'react';
// import * as React from 'react';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		schema: {
			user: users,
			session: sessions,
			account,
			verification,
		},
		provider: 'pg',
	}),
	trustedOrigins: ['http://localhost:7990'],
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		magicLink({
			async sendMagicLink({ email, url }) {
				await emailConfig.emails.send({
					from: 'main@patrickaigbogun.me',
					to: email,
					subject: 'Login to Levra',
					react: createElement(SignIn, { signInLink: url }),
				});
			},
		}),
		customSession(async ({ user, session }) => {
			const [fullUser] = await db
				.select({ role: users.role })
				.from(users)
				.where(eq(users.id, user.id));

			const [fullSession] = await db
				.select()
				.from(sessions)
				.where(eq(sessions.id, session.id));
			return {
				user: {
					...user,
					role: fullUser?.role,
				},
				session: {
					...session,
				},
			};
		}),
	],
	secret: process.env.BETTER_AUTH_SECRET!,
});
