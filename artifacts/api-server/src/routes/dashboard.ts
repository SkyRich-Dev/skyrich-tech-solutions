import { Router } from "express";
import { db, leadsTable, visitorAnalyticsTable, pageViewsTable, blogPostsTable, chatSessionsTable } from "@workspace/db";
import { desc, count, gte, sql } from "drizzle-orm";
import { authMiddleware } from "../middleware/auth";

const dashboardRouter = Router();

dashboardRouter.get("/admin/dashboard", authMiddleware, async (req, res) => {
  try {
    const [totalVisitors] = await db.select({ count: count() }).from(visitorAnalyticsTable);
    const [totalLeads] = await db.select({ count: count() }).from(leadsTable);
    const [totalBlogPosts] = await db.select({ count: count() }).from(blogPostsTable);
    const [totalChatSessions] = await db.select({ count: count() }).from(chatSessionsTable);
    const [totalPageViews] = await db.select({ count: count() }).from(pageViewsTable);

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const [weeklyVisitors] = await db.select({ count: count() }).from(visitorAnalyticsTable).where(gte(visitorAnalyticsTable.createdAt, sevenDaysAgo));
    const [weeklyLeads] = await db.select({ count: count() }).from(leadsTable).where(gte(leadsTable.createdAt, sevenDaysAgo));

    const recentLeads = await db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt)).limit(10);

    const topPages = await db.select({
      pageUrl: pageViewsTable.pageUrl,
      views: count(),
    }).from(pageViewsTable).groupBy(pageViewsTable.pageUrl).orderBy(desc(count())).limit(5);

    const leadsBySource = await db.select({
      source: leadsTable.source,
      count: count(),
    }).from(leadsTable).groupBy(leadsTable.source);

    const dailyTraffic = await db.select({
      date: sql<string>`TO_CHAR(${visitorAnalyticsTable.createdAt}, 'YYYY-MM-DD')`,
      count: count(),
    }).from(visitorAnalyticsTable)
      .where(gte(visitorAnalyticsTable.createdAt, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)))
      .groupBy(sql`TO_CHAR(${visitorAnalyticsTable.createdAt}, 'YYYY-MM-DD')`)
      .orderBy(sql`TO_CHAR(${visitorAnalyticsTable.createdAt}, 'YYYY-MM-DD')`);

    const dailyLeads = await db.select({
      date: sql<string>`TO_CHAR(${leadsTable.createdAt}, 'YYYY-MM-DD')`,
      count: count(),
    }).from(leadsTable)
      .where(gte(leadsTable.createdAt, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)))
      .groupBy(sql`TO_CHAR(${leadsTable.createdAt}, 'YYYY-MM-DD')`)
      .orderBy(sql`TO_CHAR(${leadsTable.createdAt}, 'YYYY-MM-DD')`);

    return res.json({
      stats: {
        totalVisitors: totalVisitors.count,
        totalLeads: totalLeads.count,
        totalBlogPosts: totalBlogPosts.count,
        totalChatSessions: totalChatSessions.count,
        totalPageViews: totalPageViews.count,
        weeklyVisitors: weeklyVisitors.count,
        weeklyLeads: weeklyLeads.count,
      },
      recentLeads,
      topPages,
      leadsBySource,
      dailyTraffic,
      dailyLeads,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default dashboardRouter;
