import { Router } from "express";
import { db, adminUsersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { generateToken, hashPassword, verifyPassword, needsRehash, authMiddleware } from "../middleware/auth";
import { loginRateLimiter, recordLoginAttempt, sanitizeString, validateEmail } from "../middleware/security";

const authRouter = Router();

function getClientIp(req: any): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.ip || "unknown";
}

authRouter.post("/auth/login", loginRateLimiter, async (req, res) => {
  try {
    const email = sanitizeString(req.body.email, 254).toLowerCase();
    const password = req.body.password;
    const ip = getClientIp(req);

    if (!email || !password || typeof password !== "string") {
      return res.status(400).json({ error: "Email and password required" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (password.length > 128) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const users = await db.select().from(adminUsersTable).where(eq(adminUsersTable.email, email)).limit(1);
    if (users.length === 0) {
      recordLoginAttempt(ip, false);
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const user = users[0];
    if (!user.isActive) {
      recordLoginAttempt(ip, false);
      return res.status(401).json({ error: "Account disabled" });
    }
    if (!verifyPassword(password, user.password)) {
      recordLoginAttempt(ip, false);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    recordLoginAttempt(ip, true);
    if (needsRehash(user.password)) {
      const newHash = hashPassword(password);
      await db.update(adminUsersTable).set({ password: newHash, lastLogin: new Date() }).where(eq(adminUsersTable.id, user.id));
    } else {
      await db.update(adminUsersTable).set({ lastLogin: new Date() }).where(eq(adminUsersTable.id, user.id));
    }
    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.get("/auth/me", authMiddleware, async (req, res) => {
  try {
    const adminUser = (req as any).adminUser;
    const users = await db.select().from(adminUsersTable).where(eq(adminUsersTable.id, adminUser.id)).limit(1);
    if (users.length === 0) return res.status(404).json({ error: "User not found" });
    const user = users[0];
    return res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/auth/setup", async (req, res) => {
  try {
    const existing = await db.select().from(adminUsersTable).limit(1);
    if (existing.length > 0) {
      return res.status(403).json({ error: "Setup already completed" });
    }
    const hashedPassword = hashPassword("admin123");
    const [user] = await db.insert(adminUsersTable).values({
      email: "admin@skyrichtechsolutions.com",
      password: hashedPassword,
      name: "Super Admin",
      role: "super_admin",
    }).returning();
    return res.json({ message: "Admin created. Change your password immediately.", email: user.email });
  } catch (error) {
    console.error("Setup error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.put("/auth/change-password", authMiddleware, async (req, res) => {
  try {
    const adminUser = (req as any).adminUser;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword || typeof currentPassword !== "string" || typeof newPassword !== "string") {
      return res.status(400).json({ error: "Current and new password required" });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
    if (newPassword.length > 128) {
      return res.status(400).json({ error: "Password too long" });
    }

    const users = await db.select().from(adminUsersTable).where(eq(adminUsersTable.id, adminUser.id)).limit(1);
    if (users.length === 0) return res.status(404).json({ error: "User not found" });

    if (!verifyPassword(currentPassword, users[0].password)) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    const hashedPassword = hashPassword(newPassword);
    await db.update(adminUsersTable).set({ password: hashedPassword, updatedAt: new Date() }).where(eq(adminUsersTable.id, adminUser.id));
    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default authRouter;
