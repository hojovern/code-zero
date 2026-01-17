import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const dbUrl = typeof process !== 'undefined' ? process.env.DATABASE_URL : '';

if (!dbUrl) throw new Error('DATABASE_URL is not set');

const client = postgres(dbUrl, { prepare: false });
export const db = drizzle(client, { schema });
