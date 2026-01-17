CREATE TABLE "document" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"persona_id" uuid,
	"url" text NOT NULL,
	"title" text,
	"content" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "draft" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"persona_id" uuid,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"image_url" text,
	"image_prompt" text,
	"status" text DEFAULT 'pending_review',
	"scheduled_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "memory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_id" uuid,
	"persona_id" uuid,
	"content" text NOT NULL,
	"embedding" vector(768),
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "persona" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"base_url" text NOT NULL,
	"description" text,
	"style_profile" jsonb,
	"integrations" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "schedule" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"persona_id" uuid,
	"frequency" text NOT NULL,
	"target_channel" text NOT NULL,
	"status" text DEFAULT 'active',
	"last_run_at" timestamp,
	"next_run_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_persona_id_persona_id_fk" FOREIGN KEY ("persona_id") REFERENCES "public"."persona"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "draft" ADD CONSTRAINT "draft_persona_id_persona_id_fk" FOREIGN KEY ("persona_id") REFERENCES "public"."persona"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memory" ADD CONSTRAINT "memory_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memory" ADD CONSTRAINT "memory_persona_id_persona_id_fk" FOREIGN KEY ("persona_id") REFERENCES "public"."persona"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_persona_id_persona_id_fk" FOREIGN KEY ("persona_id") REFERENCES "public"."persona"("id") ON DELETE cascade ON UPDATE no action;