// db/relations.ts
import { relations } from 'drizzle-orm';
import { articles } from './articles';
import { resources } from './resources';
import { videos } from './videos';
import { chapters } from './chapters';
import { courses } from './courses';

export const courseRelations = relations(courses, ({ many }) => ({
	chapters: many(chapters),
}));

export const chapterRelations = relations(chapters, ({ one, many }) => ({
	course: one(courses, {
		fields: [chapters.courseId],
		references: [courses.id],
	}),
	videos: many(videos),
	articles: many(articles),
	resources: many(resources),
}));

export const videoRelations = relations(videos, ({ one }) => ({
	chapter: one(chapters, {
		fields: [videos.chapterId],
		references: [chapters.id],
	}),
}));

export const articleRelations = relations(articles, ({ one }) => ({
	chapter: one(chapters, {
		fields: [articles.chapterId],
		references: [chapters.id],
	}),
}));

export const resourceRelations = relations(resources, ({ one }) => ({
	chapter: one(chapters, {
		fields: [resources.chapterId],
		references: [chapters.id],
	}),
}));
