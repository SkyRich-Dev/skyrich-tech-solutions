import { Router } from "express";
import { db, blogPostsTable, blogCategoriesTable } from "../../../../lib/db/src/index.ts";
import { eq, desc, count } from "drizzle-orm";
import { authMiddleware } from "../middleware/auth";
import { sanitizeString, sanitizeHtml, validateUrl, validatePaginationParams, validateIdParam } from "../middleware/security";

const blogAdminRouter = Router();

const VALID_STATUSES = ["draft", "published", "scheduled"];

const ALLOWED_BLOG_FIELDS = ["title", "slug", "seoTitle", "seoDescription", "focusKeywords", "content", "excerpt", "featuredImage", "tags", "categoryId", "author", "status", "ogTitle", "ogDescription", "ogImage", "canonicalUrl", "schemaMarkup", "publishDate"];

blogAdminRouter.get("/admin/blog/posts", authMiddleware, async (req, res) => {
  try {
    const { page, limit } = validatePaginationParams(req.query.page, req.query.limit);
    const offset = (page - 1) * limit;
    const posts = await db.select().from(blogPostsTable).orderBy(desc(blogPostsTable.createdAt)).limit(limit).offset(offset);
    const [totalResult] = await db.select({ count: count() }).from(blogPostsTable);
    return res.json({ posts, total: totalResult.count, page, limit });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

blogAdminRouter.post("/admin/blog/posts", authMiddleware, async (req, res) => {
  try {
    const title = sanitizeString(req.body.title, 500);
    const slug = sanitizeString(req.body.slug, 500).toLowerCase().replace(/[^a-z0-9-]/g, "");
    const seoTitle = sanitizeString(req.body.seoTitle, 500);
    const seoDescription = sanitizeString(req.body.seoDescription, 1000);
    const focusKeywords = sanitizeString(req.body.focusKeywords, 500);
    const content = sanitizeHtml(req.body.content, 100000);
    const excerpt = sanitizeString(req.body.excerpt, 1000);
    const featuredImage = req.body.featuredImage ? sanitizeString(req.body.featuredImage, 2000) : null;
    const tags = sanitizeString(req.body.tags, 500);
    const categoryId = req.body.categoryId ? parseInt(req.body.categoryId) : null;
    const author = sanitizeString(req.body.author, 255);
    const status = VALID_STATUSES.includes(req.body.status) ? req.body.status : "draft";
    const ogTitle = sanitizeString(req.body.ogTitle, 500);
    const ogDescription = sanitizeString(req.body.ogDescription, 1000);
    const ogImage = req.body.ogImage ? sanitizeString(req.body.ogImage, 2000) : null;
    const canonicalUrl = req.body.canonicalUrl ? sanitizeString(req.body.canonicalUrl, 2000) : null;
    const schemaMarkup = sanitizeString(req.body.schemaMarkup, 10000);
    const publishDate = req.body.publishDate ? new Date(req.body.publishDate) : null;

    if (!title || !slug || !content || !author) {
      return res.status(400).json({ error: "Title, slug, content and author required" });
    }
    if (featuredImage && !validateUrl(featuredImage)) {
      return res.status(400).json({ error: "Invalid featured image URL" });
    }
    if (canonicalUrl && !validateUrl(canonicalUrl)) {
      return res.status(400).json({ error: "Invalid canonical URL" });
    }

    let seoScore = 0;
    if (seoTitle) seoScore += 15;
    if (seoDescription) seoScore += 15;
    if (focusKeywords) seoScore += 15;
    if (ogTitle) seoScore += 10;
    if (ogDescription) seoScore += 10;
    if (canonicalUrl) seoScore += 10;
    if (excerpt) seoScore += 10;
    if (featuredImage) seoScore += 10;
    if (schemaMarkup) seoScore += 5;

    const [post] = await db.insert(blogPostsTable).values({
      title, slug, seoTitle: seoTitle || null, seoDescription: seoDescription || null, focusKeywords: focusKeywords || null, content, excerpt: excerpt || null, featuredImage, tags: tags || null, categoryId, author, status, ogTitle: ogTitle || null, ogDescription: ogDescription || null, ogImage, canonicalUrl, schemaMarkup: schemaMarkup || null, seoScore, publishDate,
    }).returning();
    return res.status(201).json(post);
  } catch (error) {
    console.error("Blog create error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

blogAdminRouter.put("/admin/blog/posts/:id", authMiddleware, validateIdParam, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updates: any = { updatedAt: new Date() };

    if (req.body.title) updates.title = sanitizeString(req.body.title, 500);
    if (req.body.slug) updates.slug = sanitizeString(req.body.slug, 500).toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (req.body.seoTitle !== undefined) updates.seoTitle = sanitizeString(req.body.seoTitle, 500) || null;
    if (req.body.seoDescription !== undefined) updates.seoDescription = sanitizeString(req.body.seoDescription, 1000) || null;
    if (req.body.focusKeywords !== undefined) updates.focusKeywords = sanitizeString(req.body.focusKeywords, 500) || null;
    if (req.body.content) updates.content = sanitizeHtml(req.body.content, 100000);
    if (req.body.excerpt !== undefined) updates.excerpt = sanitizeString(req.body.excerpt, 1000) || null;
    if (req.body.featuredImage !== undefined) {
      const img = sanitizeString(req.body.featuredImage, 2000);
      if (img && !validateUrl(img)) return res.status(400).json({ error: "Invalid featured image URL" });
      updates.featuredImage = img || null;
    }
    if (req.body.tags !== undefined) updates.tags = sanitizeString(req.body.tags, 500) || null;
    if (req.body.categoryId !== undefined) updates.categoryId = req.body.categoryId ? parseInt(req.body.categoryId) : null;
    if (req.body.author) updates.author = sanitizeString(req.body.author, 255);
    if (req.body.status && VALID_STATUSES.includes(req.body.status)) updates.status = req.body.status;
    if (req.body.ogTitle !== undefined) updates.ogTitle = sanitizeString(req.body.ogTitle, 500) || null;
    if (req.body.ogDescription !== undefined) updates.ogDescription = sanitizeString(req.body.ogDescription, 1000) || null;
    if (req.body.ogImage !== undefined) updates.ogImage = req.body.ogImage ? sanitizeString(req.body.ogImage, 2000) : null;
    if (req.body.canonicalUrl !== undefined) {
      const url = sanitizeString(req.body.canonicalUrl, 2000);
      if (url && !validateUrl(url)) return res.status(400).json({ error: "Invalid canonical URL" });
      updates.canonicalUrl = url || null;
    }
    if (req.body.schemaMarkup !== undefined) updates.schemaMarkup = sanitizeString(req.body.schemaMarkup, 10000) || null;
    if (req.body.publishDate) updates.publishDate = new Date(req.body.publishDate);

    let seoScore = 0;
    const finalTitle = updates.seoTitle;
    const finalDesc = updates.seoDescription;
    if (finalTitle) seoScore += 15;
    if (finalDesc) seoScore += 15;
    if (updates.focusKeywords) seoScore += 15;
    if (updates.ogTitle) seoScore += 10;
    if (updates.ogDescription) seoScore += 10;
    if (updates.canonicalUrl) seoScore += 10;
    if (updates.excerpt) seoScore += 10;
    if (updates.featuredImage) seoScore += 10;
    if (updates.schemaMarkup) seoScore += 5;
    updates.seoScore = seoScore;

    const [post] = await db.update(blogPostsTable).set(updates).where(eq(blogPostsTable.id, id)).returning();
    if (!post) return res.status(404).json({ error: "Post not found" });
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

blogAdminRouter.delete("/admin/blog/posts/:id", authMiddleware, validateIdParam, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await db.delete(blogPostsTable).where(eq(blogPostsTable.id, id)).returning();
    if (result.length === 0) return res.status(404).json({ error: "Post not found" });
    return res.json({ message: "Post deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

blogAdminRouter.get("/admin/blog/categories", authMiddleware, async (req, res) => {
  try {
    const categories = await db.select().from(blogCategoriesTable).limit(100);
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

blogAdminRouter.post("/admin/blog/categories", authMiddleware, async (req, res) => {
  try {
    const name = sanitizeString(req.body.name, 100);
    const slug = sanitizeString(req.body.slug, 100).toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!name || !slug) return res.status(400).json({ error: "Name and slug required" });
    const [category] = await db.insert(blogCategoriesTable).values({ name, slug }).returning();
    return res.json(category);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default blogAdminRouter;
