import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  location: varchar("location", { length: 255 }),
  sourcePage: text("source_page"),
  source: varchar("source", { length: 50 }).notNull().default("contact_form"),
  message: text("message"),
  status: varchar("status", { length: 50 }).notNull().default("new_lead"),
  assignedTo: varchar("assigned_to", { length: 255 }),
  notes: text("notes"),
  lastContactedAt: timestamp("last_contacted_at"),
  reminderSentAt: timestamp("reminder_sent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leadsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;
