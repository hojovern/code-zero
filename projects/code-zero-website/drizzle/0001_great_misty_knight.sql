CREATE TABLE "achievement" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"icon" text,
	"xp_bonus" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "course" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"image" text,
	"weeks" integer DEFAULT 4,
	"status" text DEFAULT 'draft',
	"xp_per_lesson" integer DEFAULT 100,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "course_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "enrollment" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"course_id" text NOT NULL,
	"enrolled_at" timestamp DEFAULT now(),
	"status" text DEFAULT 'active',
	CONSTRAINT "enrollment_user_id_course_id_unique" UNIQUE("user_id","course_id")
);
--> statement-breakpoint
CREATE TABLE "lesson" (
	"id" text PRIMARY KEY NOT NULL,
	"course_id" text NOT NULL,
	"week" integer NOT NULL,
	"day" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"content_path" text,
	"xp_reward" integer DEFAULT 100,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "progress" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"lesson_id" text NOT NULL,
	"completed_at" timestamp DEFAULT now(),
	"xp_earned" integer DEFAULT 0,
	CONSTRAINT "progress_user_id_lesson_id_unique" UNIQUE("user_id","lesson_id")
);
--> statement-breakpoint
CREATE TABLE "user_achievement" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"achievement_id" text NOT NULL,
	"earned_at" timestamp DEFAULT now(),
	CONSTRAINT "user_achievement_user_id_achievement_id_unique" UNIQUE("user_id","achievement_id")
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "username" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "avatar_url" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "xp_total" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "level" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "progress" ADD CONSTRAINT "progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "progress" ADD CONSTRAINT "progress_lesson_id_lesson_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lesson"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievement" ADD CONSTRAINT "user_achievement_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievement" ADD CONSTRAINT "user_achievement_achievement_id_achievement_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievement"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");