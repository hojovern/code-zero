import postgres from 'postgres';
import * as dotenv from 'dotenv';
dotenv.config();

async function test() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('DATABASE_URL not found');
    return;
  }
  
  const sql = postgres(url);
  try {
    const result = await sql`SELECT id, email, role, username FROM "user"`;
    console.log('Users:', result);
  } catch (err) {
    console.error('Database error:', err);
  } finally {
    await sql.end();
  }
}

test();
