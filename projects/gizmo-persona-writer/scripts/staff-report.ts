import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../src/lib/server/db/schema';

const client = postgres(process.env.DATABASE_URL || "", { prepare: false });
const db = drizzle(client, { schema });

async function getStaffReport() {
    const all = await db.select().from(schema.personas);
    const report = all.map(p => {
        return {
            name: p.name,
            tone: p.styleProfile?.tone || "Unknown",
            memorySize: "Active" // Placeholder for actual doc count
        };
    });
    console.log(JSON.stringify(report, null, 2));
    process.exit(0);
}

getStaffReport();
