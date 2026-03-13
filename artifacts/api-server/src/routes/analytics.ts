import { Router } from "express";
import { db, visitorAnalyticsTable, pageViewsTable, cookieTrackingTable } from "../../../../lib/db/src/index.ts";
import { eq, desc, sql, count, gte } from "drizzle-orm";
import { authMiddleware } from "../middleware/auth";
import { publicRateLimiter, sanitizeString } from "../middleware/security";

const analyticsRouter = Router();

const VALID_PERIODS = ["daily", "weekly", "monthly"];

analyticsRouter.post("/analytics/track", publicRateLimiter, async (req, res) => {
  try {
    const sessionId = sanitizeString(req.body.sessionId, 100);
    const pageUrl = sanitizeString(req.body.pageUrl, 500);
    const pageTitle = sanitizeString(req.body.pageTitle, 500);
    const deviceType = sanitizeString(req.body.deviceType, 50);
    const browser = sanitizeString(req.body.browser, 100);
    const os = sanitizeString(req.body.os, 100);
    const screenResolution = sanitizeString(req.body.screenResolution, 30);
    const referrer = sanitizeString(req.body.referrer, 2000);
    const trafficSource = sanitizeString(req.body.trafficSource, 50);
    const utmSource = sanitizeString(req.body.utmSource, 255);
    const utmMedium = sanitizeString(req.body.utmMedium, 255);
    const utmCampaign = sanitizeString(req.body.utmCampaign, 255);

    if (!sessionId) return res.status(400).json({ error: "Session ID required" });

    const existing = await db.select().from(visitorAnalyticsTable).where(eq(visitorAnalyticsTable.sessionId, sessionId)).limit(1);
    if (existing.length === 0) {
      const ip = req.headers["x-forwarded-for"] as string || req.ip || "";
      const cleanIp = ip.split(",")[0].trim().slice(0, 50);
      await db.insert(visitorAnalyticsTable).values({
        sessionId,
        ipAddress: cleanIp,
        deviceType: deviceType || null,
        browser: browser || null,
        os: os || null,
        screenResolution: screenResolution || null,
        referrer: referrer || null,
        trafficSource: trafficSource || detectTrafficSource(referrer || ""),
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
      });
    }

    if (pageUrl) {
      await db.insert(pageViewsTable).values({
        sessionId,
        pageUrl,
        pageTitle: pageTitle || null,
      });
    }
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

analyticsRouter.post("/analytics/page-time", publicRateLimiter, async (req, res) => {
  try {
    const sessionId = sanitizeString(req.body.sessionId, 100);
    const pageUrl = sanitizeString(req.body.pageUrl, 500);
    const timeSpent = parseInt(req.body.timeSpent);

    if (sessionId && pageUrl && !isNaN(timeSpent) && timeSpent > 0 && timeSpent < 86400) {
      const existing = await db.select().from(pageViewsTable)
        .where(eq(pageViewsTable.sessionId, sessionId))
        .orderBy(desc(pageViewsTable.createdAt)).limit(1);
      if (existing.length > 0) {
        await db.update(pageViewsTable).set({ timeSpent }).where(eq(pageViewsTable.id, existing[0].id));
      }
    }
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

analyticsRouter.post("/analytics/cookie-consent", publicRateLimiter, async (req, res) => {
  try {
    const visitorId = sanitizeString(req.body.visitorId, 100);
    const sessionId = sanitizeString(req.body.sessionId, 100);
    const consentGiven = sanitizeString(req.body.consentGiven, 20);

    if (!visitorId || !sessionId) return res.status(400).json({ error: "Visitor ID and session ID required" });
    if (!["accepted", "rejected", "partial", "pending"].includes(consentGiven)) {
      return res.status(400).json({ error: "Invalid consent value" });
    }

    const existing = await db.select().from(cookieTrackingTable).where(eq(cookieTrackingTable.visitorId, visitorId)).limit(1);
    if (existing.length > 0) {
      await db.update(cookieTrackingTable).set({
        consentGiven, sessionId, lastVisit: new Date(),
        visitCount: sql`${cookieTrackingTable.visitCount} + 1`,
      }).where(eq(cookieTrackingTable.visitorId, visitorId));
    } else {
      await db.insert(cookieTrackingTable).values({ visitorId, sessionId, consentGiven });
    }
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

analyticsRouter.get("/admin/analytics/overview", authMiddleware, async (req, res) => {
  try {
    const [totalVisitors] = await db.select({ count: count() }).from(visitorAnalyticsTable);
    const [totalPageViews] = await db.select({ count: count() }).from(pageViewsTable);

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const [recentVisitors] = await db.select({ count: count() }).from(visitorAnalyticsTable).where(gte(visitorAnalyticsTable.createdAt, thirtyDaysAgo));

    const topPages = await db.select({
      pageUrl: pageViewsTable.pageUrl,
      views: count(),
    }).from(pageViewsTable).groupBy(pageViewsTable.pageUrl).orderBy(desc(count())).limit(10);

    const avgTimeOnPage = await db.select({
      pageUrl: pageViewsTable.pageUrl,
      avgTime: sql<number>`COALESCE(AVG(${pageViewsTable.timeSpent}), 0)`,
    }).from(pageViewsTable).groupBy(pageViewsTable.pageUrl).orderBy(desc(sql`AVG(${pageViewsTable.timeSpent})`)).limit(10);

    const trafficSources = await db.select({
      source: visitorAnalyticsTable.trafficSource,
      count: count(),
    }).from(visitorAnalyticsTable).groupBy(visitorAnalyticsTable.trafficSource);

    const deviceTypes = await db.select({
      device: visitorAnalyticsTable.deviceType,
      count: count(),
    }).from(visitorAnalyticsTable).groupBy(visitorAnalyticsTable.deviceType);

    const browserStats = await db.select({
      browser: visitorAnalyticsTable.browser,
      count: count(),
    }).from(visitorAnalyticsTable).groupBy(visitorAnalyticsTable.browser);

    const returnVisitors = await db.select({ count: count() }).from(cookieTrackingTable).where(gte(cookieTrackingTable.visitCount, 2));

    return res.json({
      totalVisitors: totalVisitors.count,
      totalPageViews: totalPageViews.count,
      recentVisitors: recentVisitors.count,
      returnVisitors: returnVisitors[0]?.count || 0,
      topPages,
      avgTimeOnPage,
      trafficSources,
      deviceTypes,
      browserStats,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

analyticsRouter.get("/admin/analytics/traffic", authMiddleware, async (req, res) => {
  try {
    const period = VALID_PERIODS.includes(req.query.period as string) ? req.query.period as string : "daily";
    let traffic;
    if (period === "weekly") {
      traffic = await db.select({
        date: sql<string>`TO_CHAR(${visitorAnalyticsTable.createdAt}, 'IYYY-IW')`,
        count: count(),
      }).from(visitorAnalyticsTable).groupBy(sql`TO_CHAR(${visitorAnalyticsTable.createdAt}, 'IYYY-IW')`).orderBy(sql`TO_CHAR(${visitorAnalyticsTable.createdAt}, 'IYYY-IW')`).limit(90);
    } else if (period === "monthly") {
      traffic = await db.select({
        date: sql<string>`TO_CHAR(${visitorAnalyticsTable.createdAt}, 'YYYY-MM')`,
        count: count(),
      }).from(visitorAnalyticsTable).groupBy(sql`TO_CHAR(${visitorAnalyticsTable.createdAt}, 'YYYY-MM')`).orderBy(sql`TO_CHAR(${visitorAnalyticsTable.createdAt}, 'YYYY-MM')`).limit(90);
    } else {
      traffic = await db.select({
        date: sql<string>`TO_CHAR(${visitorAnalyticsTable.createdAt}, 'YYYY-MM-DD')`,
        count: count(),
      }).from(visitorAnalyticsTable).groupBy(sql`TO_CHAR(${visitorAnalyticsTable.createdAt}, 'YYYY-MM-DD')`).orderBy(sql`TO_CHAR(${visitorAnalyticsTable.createdAt}, 'YYYY-MM-DD')`).limit(90);
    }
    return res.json(traffic);
  } catch (error) {
    console.error("Traffic error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

analyticsRouter.get("/admin/analytics/locations", authMiddleware, async (req, res) => {
  try {
    const locations = await db.select({
      country: visitorAnalyticsTable.country,
      city: visitorAnalyticsTable.city,
      count: count(),
    }).from(visitorAnalyticsTable).groupBy(visitorAnalyticsTable.country, visitorAnalyticsTable.city).orderBy(desc(count())).limit(50);
    return res.json(locations);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

function detectTrafficSource(referrer: string): string {
  if (!referrer) return "direct";
  const r = referrer.toLowerCase();
  if (r.includes("google")) return "google";
  if (r.includes("linkedin")) return "linkedin";
  if (r.includes("facebook") || r.includes("fb.com")) return "facebook";
  if (r.includes("twitter") || r.includes("t.co")) return "twitter";
  if (r.includes("instagram")) return "instagram";
  if (r.includes("youtube")) return "youtube";
  return "referral";
}

export default analyticsRouter;
