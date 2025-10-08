import { pgSqlDb } from '@/config/db/providers/client';
import { drizzle } from 'drizzle-orm/neon-http';

export const db = drizzle({ client: pgSqlDb, casing: 'snake_case' });
