import { pgTable, serial, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const blogCategoriesTable = pgTable("blog_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPostsTable = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  seoTitle: varchar("seo_title", { length: 500 }),
  seoDescription: text("seo_description"),
  focusKeywords: text("focus_keywords"),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featuredImage: text("featured_image"),
  tags: text("tags"),
  categoryId: integer("category_id"),
  author: varchar("author", { length: 255 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("draft"),
  ogTitle: varchar("og_title", { length: 500 }),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),
  canonicalUrl: text("canonical_url"),
  schemaMarkup: text("schema_markup"),
  seoScore: integer("seo_score").default(0),
  views: integer("views").default(0),
  uniqueVisitors: integer("unique_visitors").default(0),
  publishDate: timestamp("publish_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBlogCategorySchema = createInsertSchema(blogCategoriesTable).omit({ id: true, createdAt: true });
export type InsertBlogCategory = z.infer<typeof insertBlogCategorySchema>;
export type BlogCategory = typeof blogCategoriesTable.$inferSelect;

export const insertBlogPostSchema = createInsertSchema(blogPostsTable).omit({ id: true, createdAt: true, updatedAt: true, views: true, uniqueVisitors: true });
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPostsTable.$inferSelect;
