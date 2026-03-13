import { pgTable, serial, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const visitorAnalyticsTable = pgTable("visitor_analytics", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 100 }).notNull(),
  ipAddress: varchar("ip_address", { length: 50 }),
  country: varchar("country", { length: 100 }),
  city: varchar("city", { length: 100 }),
  deviceType: varchar("device_type", { length: 50 }),
  browser: varchar("browser", { length: 100 }),
  os: varchar("os", { length: 100 }),
  screenResolution: varchar("screen_resolution", { length: 30 }),
  referrer: text("referrer"),
  trafficSource: varchar("traffic_source", { length: 50 }),
  utmSource: varchar("utm_source", { length: 255 }),
  utmMedium: varchar("utm_medium", { length: 255 }),
  utmCampaign: varchar("utm_campaign", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pageViewsTable = pgTable("page_views", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 100 }).notNull(),
  pageUrl: text("page_url").notNull(),
  pageTitle: varchar("page_title", { length: 500 }),
  timeSpent: integer("time_spent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const cookieTrackingTable = pgTable("cookie_tracking", {
  id: serial("id").primaryKey(),
  visitorId: varchar("visitor_id", { length: 100 }).notNull(),
  sessionId: varchar("session_id", { length: 100 }).notNull(),
  consentGiven: varchar("consent_given", { length: 20 }).notNull().default("pending"),
  visitCount: integer("visit_count").default(1),
  firstVisit: timestamp("first_visit").defaultNow().notNull(),
  lastVisit: timestamp("last_visit").defaultNow().notNull(),
});

export const insertVisitorAnalyticsSchema = createInsertSchema(visitorAnalyticsTable).omit({ id: true, createdAt: true });
export type InsertVisitorAnalytics = z.infer<typeof insertVisitorAnalyticsSchema>;
export type VisitorAnalytics = typeof visitorAnalyticsTable.$inferSelect;

export const insertPageViewSchema = createInsertSchema(pageViewsTable).omit({ id: true, createdAt: true });
export type InsertPageView = z.infer<typeof insertPageViewSchema>;
export type PageView = typeof pageViewsTable.$inferSelect;

export const insertCookieTrackingSchema = createInsertSchema(cookieTrackingTable).omit({ id: true, firstVisit: true, lastVisit: true });
export type InsertCookieTracking = z.infer<typeof insertCookieTrackingSchema>;
export type CookieTracking = typeof cookieTrackingTable.$inferSelect;
