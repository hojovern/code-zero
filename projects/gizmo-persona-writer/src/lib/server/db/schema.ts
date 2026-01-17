import { pgTable, text, timestamp, jsonb, vector, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const personas = pgTable("persona", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    baseUrl: text("base_url").notNull(),
    description: text("description"),
    styleProfile: jsonb("style_profile"), // Tone, rhythm, vocabulary, etc.
    integrations: jsonb("integrations"), // { instagram: { accessToken: "", userId: "" } }
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const personasRelations = relations(personas, ({ many }) => ({
    schedules: many(schedules),
    drafts: many(drafts),
    memories: many(memories),
    documents: many(documents),
}));

export const documents = pgTable("document", {
    id: uuid("id").primaryKey().defaultRandom(),
    personaId: uuid("persona_id").references(() => personas.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    title: text("title"),
    content: text("content"), // Full text or markdown
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const documentsRelations = relations(documents, ({ one }) => ({
    persona: one(personas, {
        fields: [documents.personaId],
        references: [personas.id],
    }),
}));

export const schedules = pgTable("schedule", {
    id: uuid("id").primaryKey().defaultRandom(),
    personaId: uuid("persona_id").references(() => personas.id, { onDelete: "cascade" }),
    frequency: text("frequency").notNull(), // 'daily', 'weekly', 'monthly'
    targetChannel: text("target_channel").notNull(), // 'blog', 'twitter', 'newsletter'
    status: text("status").default("active"), // 'active', 'paused'
    lastRunAt: timestamp("last_run_at"),
    nextRunAt: timestamp("next_run_at"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const schedulesRelations = relations(schedules, ({ one }) => ({
    persona: one(personas, {
        fields: [schedules.personaId],
        references: [personas.id],
    }),
}));

export const drafts = pgTable("draft", {
    id: uuid("id").primaryKey().defaultRandom(),
    personaId: uuid("persona_id").references(() => personas.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    content: text("content").notNull(),
    status: text("status").default("pending_review"), // 'pending_review', 'approved', 'published'
    scheduledAt: timestamp("scheduled_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const draftsRelations = relations(drafts, ({ one }) => ({
    persona: one(personas, {
        fields: [drafts.personaId],
        references: [personas.id],
    }),
}));

export const memories = pgTable("memory", {
    id: uuid("id").primaryKey().defaultRandom(),
    documentId: uuid("document_id").references(() => documents.id, { onDelete: "cascade" }),
    personaId: uuid("persona_id").references(() => personas.id, { onDelete: "cascade" }),
    content: text("content").notNull(), // Chunked text
    embedding: vector("embedding", { dimensions: 768 }), // For Gemini embeddings
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const memoriesRelations = relations(memories, ({ one }) => ({
    persona: one(personas, {
        fields: [memories.personaId],
        references: [personas.id],
    }),
    document: one(documents, {
        fields: [memories.documentId],
        references: [documents.id],
    }),
}));
