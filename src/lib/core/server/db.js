import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import * as schema from './schema.js';
import dns from 'node:dns';

// Force Node.js to use IPv4 to bypass WSL IPv6 routing failures
dns.setDefaultResultOrder('ipv4first');

if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in the environment variables.');
}

const client = postgres(env.DATABASE_URL, { prepare: false });
export const db = drizzle(client, { schema });
