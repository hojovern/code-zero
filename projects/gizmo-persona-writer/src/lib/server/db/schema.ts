import { pgTable, text, timestamp, jsonb, vector, uuid } from "drizzle-orm/pg-core";

export const personas = pgTable("persona", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    baseUrl: text("base_url").notNull(),
    description: text("description"),
    styleProfile: jsonb("style_profile"), // Tone, rhythm, vocabulary, etc.
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const documents = pgTable("document", {
    id: uuid("id").primaryKey().defaultRandom(),
    personaId: uuid("persona_id").references(() => personas.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    title: text("title"),
    content: text("content"), // Full text or markdown
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const memories = pgTable("memory", {
    id: uuid("id").primaryKey().defaultRandom(),
    documentId: uuid("document_id").references(() => documents.id, { onDelete: "cascade" }),
    personaId: uuid("persona_id").references(() => personas.id, { onDelete: "cascade" }),
    content: text("content").notNull(), // Chunked text
    embedding: vector("embedding", { dimensions: 768 }), // For Gemini embeddings
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow(),
});
