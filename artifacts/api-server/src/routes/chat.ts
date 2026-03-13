import { Router } from "express";
import { db, chatSessionsTable, chatMessagesTable, leadsTable } from "../../../../lib/db/src/index.ts";
import { eq, desc, count } from "drizzle-orm";
import { authMiddleware } from "../middleware/auth";
import { publicRateLimiter, sanitizeString, validateEmail, validatePhone, validatePaginationParams, validateIdParam } from "../middleware/security";

const chatRouter = Router();

chatRouter.post("/chat/session", publicRateLimiter, async (req, res) => {
  try {
    const pageUrl = sanitizeString(req.body.pageUrl, 500);
    const [session] = await db.insert(chatSessionsTable).values({
      pageUrl: pageUrl || "",
    }).returning();
    return res.status(201).json({ id: session.id });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

chatRouter.post("/chat/message", publicRateLimiter, async (req, res) => {
  try {
    const sessionId = parseInt(req.body.sessionId);
    const message = sanitizeString(req.body.message, 2000);
    const sender = sanitizeString(req.body.sender, 20);

    if (!sessionId || isNaN(sessionId) || !message) {
      return res.status(400).json({ error: "Session ID and message required" });
    }
    if (!["visitor", "bot"].includes(sender || "visitor")) {
      return res.status(400).json({ error: "Invalid sender" });
    }

    const session = await db.select().from(chatSessionsTable).where(eq(chatSessionsTable.id, sessionId)).limit(1);
    if (session.length === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    const [msg] = await db.insert(chatMessagesTable).values({
      sessionId, message, sender: sender || "visitor",
    }).returning();
    return res.status(201).json({ id: msg.id });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

chatRouter.post("/chat/details", publicRateLimiter, async (req, res) => {
  try {
    const sessionId = parseInt(req.body.sessionId);
    if (!sessionId || isNaN(sessionId)) return res.status(400).json({ error: "Session ID required" });

    const name = sanitizeString(req.body.name, 255);
    const email = sanitizeString(req.body.email, 254).toLowerCase();
    const phone = sanitizeString(req.body.phone, 20);
    const company = sanitizeString(req.body.company, 255);

    if (email && !validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (phone && !validatePhone(phone)) {
      return res.status(400).json({ error: "Invalid phone format" });
    }

    const session = await db.select().from(chatSessionsTable).where(eq(chatSessionsTable.id, sessionId)).limit(1);
    if (session.length === 0) return res.status(404).json({ error: "Session not found" });

    await db.update(chatSessionsTable).set({
      visitorName: name || null, visitorEmail: email || null, visitorPhone: phone || null, visitorCompany: company || null, updatedAt: new Date(),
    }).where(eq(chatSessionsTable.id, sessionId));

    if (name && email) {
      const messages = await db.select().from(chatMessagesTable).where(eq(chatMessagesTable.sessionId, sessionId)).limit(50);
      const chatHistory = messages.map(m => `${m.sender}: ${m.message}`).join("\n").slice(0, 5000);

      const [lead] = await db.insert(leadsTable).values({
        name, email, phone: phone || null, company: company || null,
        source: "chatbot",
        sourcePage: session[0]?.pageUrl || "",
        message: chatHistory,
        status: "new_lead",
      }).returning();

      await db.update(chatSessionsTable).set({ leadId: lead.id }).where(eq(chatSessionsTable.id, sessionId));
    }
    return res.json({ message: "Details updated" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

chatRouter.get("/admin/chat/sessions", authMiddleware, async (req, res) => {
  try {
    const { page, limit } = validatePaginationParams(req.query.page, req.query.limit);
    const offset = (page - 1) * limit;
    const sessions = await db.select().from(chatSessionsTable).orderBy(desc(chatSessionsTable.createdAt)).limit(limit).offset(offset);
    const [totalResult] = await db.select({ count: count() }).from(chatSessionsTable);
    return res.json({ sessions, total: totalResult.count, page, limit });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

chatRouter.get("/admin/chat/sessions/:id/messages", authMiddleware, validateIdParam, async (req, res) => {
  try {
    const sessionId = Number(req.params.id);
    const messages = await db.select().from(chatMessagesTable).where(eq(chatMessagesTable.sessionId, sessionId)).orderBy(chatMessagesTable.createdAt).limit(500);
    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

chatRouter.post("/admin/chat/reply", authMiddleware, async (req, res) => {
  try {
    const sessionId = parseInt(req.body.sessionId);
    const message = sanitizeString(req.body.message, 2000);
    if (!sessionId || isNaN(sessionId) || !message) {
      return res.status(400).json({ error: "Session ID and message required" });
    }
    const [msg] = await db.insert(chatMessagesTable).values({
      sessionId, message, sender: "admin",
    }).returning();
    return res.status(201).json(msg);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default chatRouter;
