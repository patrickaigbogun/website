import { defineConfig } from 'drizzle-kit';
import { dbKeys } from './config/db/env';

export default defineConfig({
	out: './orm/drizzle',
	schema: ['./orm/schema/', './orm/enums.ts'],
	dialect: 'postgresql',
	dbCredentials: {
		url: dbKeys.url,
	},
	casing: 'snake_case', // This will automatically convert camelCase to snake_case
});
