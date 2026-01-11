import { pgTable, text, integer, timestamp, boolean, primaryKey, unique, jsonb } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "@auth/core/adapters";

// ============================================
// AUTH TABLES (existing)
// ============================================

// Role types: 'student' | 'teacher' | 'super_admin'
export const users = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").unique(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
	role: text("role").default("student"), // 'student' | 'teacher' | 'super_admin'
	// Student profile fields
	username: text("username").unique(),
	avatarUrl: text("avatar_url"),
	xpTotal: integer("xp_total").default(0),
	level: integer("level").default(1),
	createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	})
);

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.identifier, verificationToken.token],
		}),
	})
);

export const authenticators = pgTable(
	"authenticator",
	{
		credentialID: text("credentialID").notNull().unique(),
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		providerAccountId: text("providerAccountId").notNull(),
		credentialPublicKey: text("credentialPublicKey").notNull(),
		counter: integer("counter").notNull(),
		credentialDeviceType: text("credentialDeviceType").notNull(),
		credentialBackedUp: boolean("credentialBackedUp").notNull(),
		transports: text("transports"),
	},
	(authenticator) => ({
		compositePK: primaryKey({
			columns: [authenticator.userId, authenticator.credentialID],
		}),
	})
);

// ============================================
// COURSE & LEARNING TABLES (new)
// ============================================

export const courses = pgTable("course", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name").notNull(),
	slug: text("slug").unique().notNull(),
	description: text("description"),
	image: text("image"),
	weeks: integer("weeks").default(4),
	status: text("status").default("draft"), // draft, active, archived
	xpPerLesson: integer("xp_per_lesson").default(100),
	createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

export const lessons = pgTable("lesson", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	courseId: text("course_id")
		.notNull()
		.references(() => courses.id, { onDelete: "cascade" }),
	week: integer("week").notNull(),
	day: integer("day").notNull(),
	title: text("title").notNull(),
	description: text("description"),
	contentPath: text("content_path"), // e.g., "/student-portal/week-1/day-1"
	xpReward: integer("xp_reward").default(100),
	order: integer("order").notNull(),
});

export const enrollments = pgTable(
	"enrollment",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		userId: text("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		courseId: text("course_id")
			.notNull()
			.references(() => courses.id, { onDelete: "cascade" }),
		enrolledAt: timestamp("enrolled_at", { mode: "date" }).defaultNow(),
		status: text("status").default("active"), // active, completed, paused
	},
	(enrollment) => ({
		uniqueUserCourse: unique().on(enrollment.userId, enrollment.courseId),
	})
);

export const progress = pgTable(
	"progress",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		userId: text("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		lessonId: text("lesson_id")
			.notNull()
			.references(() => lessons.id, { onDelete: "cascade" }),
		completedAt: timestamp("completed_at", { mode: "date" }).defaultNow(),
		xpEarned: integer("xp_earned").default(0),
	},
	(prog) => ({
		uniqueUserLesson: unique().on(prog.userId, prog.lessonId),
	})
);

// ============================================
// GAMIFICATION TABLES (new)
// ============================================

export const achievements = pgTable("achievement", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
	icon: text("icon"), // Emoji
	xpBonus: integer("xp_bonus").default(0),
});

export const userAchievements = pgTable(
	"user_achievement",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		userId: text("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		achievementId: text("achievement_id")
			.notNull()
			.references(() => achievements.id, { onDelete: "cascade" }),
		earnedAt: timestamp("earned_at", { mode: "date" }).defaultNow(),
	},
	(ua) => ({
		uniqueUserAchievement: unique().on(ua.userId, ua.achievementId),
	})
);

// ============================================
// EMAIL MARKETING TABLES
// ============================================

// Email Templates - Reusable building blocks
export const emailTemplates = pgTable("email_template", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name").notNull(),
	subject: text("subject").notNull(),
	previewText: text("preview_text"),
	htmlContent: text("html_content").notNull(),
	textContent: text("text_content"),
	category: text("category").default("marketing"), // 'marketing' | 'transactional' | 'drip'
	variables: jsonb("variables"), // [{name, defaultValue, description}]
	createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

// Email Campaigns - One-time sends
export const emailCampaigns = pgTable("email_campaign", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name").notNull(),
	subject: text("subject").notNull(),
	previewText: text("preview_text"),
	templateId: text("template_id").references(() => emailTemplates.id, { onDelete: "set null" }),
	htmlContent: text("html_content").notNull(),
	textContent: text("text_content"),
	status: text("status").default("draft"), // 'draft' | 'review' | 'scheduled' | 'sending' | 'sent' | 'paused'
	segmentRules: jsonb("segment_rules"), // {courseId?, engagementLevel?, cohortDate?}
	scheduledAt: timestamp("scheduled_at", { mode: "date" }),
	sentAt: timestamp("sent_at", { mode: "date" }),
	recipientCount: integer("recipient_count").default(0),
	createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

// Email Sequences - Multi-email automation (drip)
export const emailSequences = pgTable("email_sequence", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name").notNull(),
	description: text("description"),
	triggerEvent: text("trigger_event").notNull(), // 'enrollment' | 'signup' | 'inactivity' | 'completion'
	status: text("status").default("draft"), // 'active' | 'paused' | 'draft'
	createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

// Email Sequence Steps - Individual emails in a sequence
export const emailSequenceSteps = pgTable("email_sequence_step", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	sequenceId: text("sequence_id")
		.notNull()
		.references(() => emailSequences.id, { onDelete: "cascade" }),
	order: integer("order").notNull(),
	name: text("name").notNull(),
	delayDays: integer("delay_days").default(0),
	delayHours: integer("delay_hours").default(0),
	subject: text("subject").notNull(),
	previewText: text("preview_text"),
	htmlContent: text("html_content").notNull(),
	textContent: text("text_content"),
});

// Email Sends - Individual send records (for analytics)
export const emailSends = pgTable("email_send", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
	userEmail: text("user_email").notNull(),
	campaignId: text("campaign_id").references(() => emailCampaigns.id, { onDelete: "set null" }),
	sequenceStepId: text("sequence_step_id").references(() => emailSequenceSteps.id, { onDelete: "set null" }),
	messageId: text("message_id"), // For webhook matching (Brevo message ID)
	status: text("status").default("queued"), // 'queued' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'complained'
	variant: text("variant"), // 'A' | 'B' for A/B tests
	sentAt: timestamp("sent_at", { mode: "date" }),
	deliveredAt: timestamp("delivered_at", { mode: "date" }),
	openedAt: timestamp("opened_at", { mode: "date" }),
	clickedAt: timestamp("clicked_at", { mode: "date" }),
	openCount: integer("open_count").default(0),
	clickCount: integer("click_count").default(0),
	metadata: jsonb("metadata"), // {linksClicked: [], device, location}
});

// Email Events - Detailed event log
export const emailEvents = pgTable("email_event", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	sendId: text("send_id")
		.notNull()
		.references(() => emailSends.id, { onDelete: "cascade" }),
	eventType: text("event_type").notNull(), // 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'complained' | 'unsubscribed'
	timestamp: timestamp("timestamp", { mode: "date" }).defaultNow(),
	metadata: jsonb("metadata"), // {ip, userAgent, linkUrl, bounceType}
});

// Email Preferences - Subscriber preferences
export const emailPreferences = pgTable("email_preference", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text("user_id")
		.notNull()
		.unique()
		.references(() => users.id, { onDelete: "cascade" }),
	marketingOptIn: boolean("marketing_opt_in").default(true),
	weeklyDigest: boolean("weekly_digest").default(true),
	productUpdates: boolean("product_updates").default(true),
	unsubscribedAt: timestamp("unsubscribed_at", { mode: "date" }),
	unsubscribeReason: text("unsubscribe_reason"),
});

// Email A/B Tests
export const emailAbTests = pgTable("email_ab_test", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	campaignId: text("campaign_id")
		.notNull()
		.references(() => emailCampaigns.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	variantA: jsonb("variant_a").notNull(), // {subject, previewText, content}
	variantB: jsonb("variant_b").notNull(),
	splitPercentage: integer("split_percentage").default(50), // % to variant A
	winnerMetric: text("winner_metric").default("opens"), // 'opens' | 'clicks'
	winnerVariant: text("winner_variant"), // 'A' | 'B'
	completedAt: timestamp("completed_at", { mode: "date" }),
	createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

// Sequence Enrollments - Track users in sequences
export const sequenceEnrollments = pgTable(
	"sequence_enrollment",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		userId: text("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		sequenceId: text("sequence_id")
			.notNull()
			.references(() => emailSequences.id, { onDelete: "cascade" }),
		currentStepId: text("current_step_id").references(() => emailSequenceSteps.id, { onDelete: "set null" }),
		status: text("status").default("active"), // 'active' | 'completed' | 'unsubscribed'
		enrolledAt: timestamp("enrolled_at", { mode: "date" }).defaultNow(),
		completedAt: timestamp("completed_at", { mode: "date" }),
		nextSendAt: timestamp("next_send_at", { mode: "date" }),
	},
	(se) => ({
		uniqueUserSequence: unique().on(se.userId, se.sequenceId),
	})
);
