import { pgTable, text, integer, timestamp, boolean, primaryKey, unique } from "drizzle-orm/pg-core";
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
	contentPath: text("content_path"), // e.g., "/learn/week-1/day-1"
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
