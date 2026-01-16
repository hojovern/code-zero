import 'dotenv/config';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL || "", { prepare: false });

async function migrate() {
    console.log("🛠  Running manual migration...");
    
    try {
        await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
        await sql`CREATE EXTENSION IF NOT EXISTS "vector";`;

        await sql`
            CREATE TABLE IF NOT EXISTS persona (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name TEXT NOT NULL,
                base_url TEXT NOT NULL,
                description TEXT,
                style_profile JSONB,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS document (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                persona_id UUID REFERENCES persona(id) ON DELETE CASCADE,
                url TEXT NOT NULL,
                title TEXT,
                content TEXT,
                metadata JSONB,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS memory (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                document_id UUID REFERENCES document(id) ON DELETE CASCADE,
                persona_id UUID REFERENCES persona(id) ON DELETE CASCADE,
                content TEXT NOT NULL,
                embedding VECTOR(768),
                metadata JSONB,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `;

        console.log("✅ Migration complete!");
    } catch (error) {
        console.error("❌ Migration failed:", error);
    } finally {
        await sql.end();
        process.exit(0);
    }
}

migrate();
