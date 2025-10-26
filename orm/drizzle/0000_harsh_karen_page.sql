CREATE TYPE "public"."membership_status" AS ENUM('pending', 'member', 'revoked', 'expired', 'caughtion', 'probation');--> statement-breakpoint
CREATE TYPE "public"."warn_time" AS ENUM('0', '1', '2', '3');--> statement-breakpoint
CREATE TYPE "public"."campaign_type" AS ENUM('scheduled', 'ongoing');--> statement-breakpoint
CREATE TYPE "public"."contact_type" AS ENUM('individual', 'org');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('open', 'complete', 'overdue', 'extension');--> statement-breakpoint
CREATE TYPE "public"."template_type" AS ENUM('email', 'embedded');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin', 's_admin');--> statement-breakpoint
CREATE TYPE "public"."tier" AS ENUM('1', '2', '3');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"page" varchar(256) NOT NULL,
	"thread" integer,
	"author" varchar(256) NOT NULL,
	"content" json NOT NULL,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cron_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_type" text NOT NULL,
	"data" json NOT NULL,
	"schedule" text NOT NULL,
	"status" text DEFAULT 'scheduled',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rates" (
	"userId" varchar(256) NOT NULL,
	"commentId" integer NOT NULL,
	"like" boolean NOT NULL,
	CONSTRAINT "rates_userId_commentId_pk" PRIMARY KEY("userId","commentId")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"userId" varchar(256) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"canDelete" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" varchar(500),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"role" "role",
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "comment_idx" ON "rates" USING btree ("commentId");