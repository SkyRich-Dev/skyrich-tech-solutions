import { Router } from "express";
import { db, leadsTable } from "../../../../lib/db/src/index.ts";
import { eq, desc, count } from "drizzle-orm";
import { authMiddleware } from "../middleware/auth";
import { publicRateLimiter, sanitizeString, validateEmail, validatePhone, validatePaginationParams, validateIdParam } from "../middleware/security";

const leadsRouter = Router();

const VALID_STATUSES = ["new_lead", "contacted", "follow_up", "converted", "closed"];
const VALID_SOURCES = ["contact_form", "talk_to_expert", "chatbot", "newsletter", "blog_contact"];

leadsRouter.post("/leads", publicRateLimiter, async (req, res) => {
  try {
    const name = sanitizeString(req.body.name, 255);
    const email = sanitizeString(req.body.email, 254).toLowerCase();
    const phone = sanitizeString(req.body.phone, 20);
    const company = sanitizeString(req.body.company, 255);
    const location = sanitizeString(req.body.location, 255);
    const sourcePage = sanitizeString(req.body.sourcePage, 500);
    const source = sanitizeString(req.body.source, 50);
    const message = sanitizeString(req.body.message, 2000);

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (phone && !validatePhone(phone)) {
      return res.status(400).json({ error: "Invalid phone format" });
    }

    const [lead] = await db.insert(leadsTable).values({
      name, email, phone: phone || null, company: company || null, location: location || null, sourcePage: sourcePage || null,
      source: VALID_SOURCES.includes(source) ? source : "contact_form",
      message: message || null,
      status: "new_lead",
    }).returning();

    return res.status(201).json({ id: lead.id, message: "Enquiry submitted successfully" });
  } catch (error) {
    console.error("Lead creation error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

leadsRouter.get("/admin/leads", authMiddleware, async (req, res) => {
  try {
    const { page, limit } = validatePaginationParams(req.query.page, req.query.limit);
    const status = sanitizeString(req.query.status as string, 50);
    const offset = (page - 1) * limit;
    const leads = status && VALID_STATUSES.includes(status)
      ? await db.select().from(leadsTable).where(eq(leadsTable.status, status)).orderBy(desc(leadsTable.createdAt)).limit(limit).offset(offset)
      : await db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt)).limit(limit).offset(offset);
    const [totalResult] = await db.select({ count: count() }).from(leadsTable);
    return res.json({ leads, total: totalResult.count, page, limit });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

leadsRouter.put("/admin/leads/:id", authMiddleware, validateIdParam, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const status = sanitizeString(req.body.status, 50);
    const notes = sanitizeString(req.body.notes, 2000);
    const assignedTo = sanitizeString(req.body.assignedTo, 255);

    const updates: any = { updatedAt: new Date() };
    if (status && VALID_STATUSES.includes(status)) updates.status = status;
    if (notes !== undefined) updates.notes = notes || null;
    if (assignedTo !== undefined) updates.assignedTo = assignedTo || null;
    if (status === "contacted") updates.lastContactedAt = new Date();

    const [lead] = await db.update(leadsTable).set(updates).where(eq(leadsTable.id, id)).returning();
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    return res.json(lead);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

leadsRouter.delete("/admin/leads/:id", authMiddleware, validateIdParam, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await db.delete(leadsTable).where(eq(leadsTable.id, id)).returning();
    if (result.length === 0) return res.status(404).json({ error: "Lead not found" });
    return res.json({ message: "Lead deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

leadsRouter.get("/admin/leads/stats", authMiddleware, async (req, res) => {
  try {
    const [total] = await db.select({ count: count() }).from(leadsTable);
    const statusCounts = await db.select({
      status: leadsTable.status,
      count: count(),
    }).from(leadsTable).groupBy(leadsTable.status);
    const sourceCounts = await db.select({
      source: leadsTable.source,
      count: count(),
    }).from(leadsTable).groupBy(leadsTable.source);
    return res.json({ total: total.count, byStatus: statusCounts, bySource: sourceCounts });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default leadsRouter;
