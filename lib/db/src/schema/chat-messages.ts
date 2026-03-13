import { pgTable, serial, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const chatSessionsTable = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  visitorName: varchar("visitor_name", { length: 255 }),
  visitorEmail: varchar("visitor_email", { length: 255 }),
  visitorPhone: varchar("visitor_phone", { length: 50 }),
  visitorCompany: varchar("visitor_company", { length: 255 }),
  pageUrl: text("page_url"),
  isResolved: boolean("is_resolved").default(false),
  leadId: integer("lead_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const chatMessagesTable = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull(),
  sender: varchar("sender", { length: 20 }).notNull().default("visitor"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertChatSessionSchema = createInsertSchema(chatSessionsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type ChatSession = typeof chatSessionsTable.$inferSelect;

export const insertChatMessageSchema = createInsertSchema(chatMessagesTable).omit({ id: true, createdAt: true });
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessagesTable.$inferSelect;
