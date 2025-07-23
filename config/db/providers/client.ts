import { neon } from '@neondatabase/serverless';
import { dbKeys } from '@/config/db/env';

const url = dbKeys.url;

export const pgSqlDb = neon(url);
