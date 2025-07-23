import { defineConfig } from 'drizzle-kit';
// import { pgSqlDb } from './config/db/providers/client';
import { dbKeys } from './config/db/env';

// import { neonDbUrl } from '#/constants/db';
export default defineConfig({
	out: './orm/drizzle',
	schema: './orm/schema/',
	dialect: 'postgresql',
	dbCredentials: {
		url: dbKeys.url,
	},
});
