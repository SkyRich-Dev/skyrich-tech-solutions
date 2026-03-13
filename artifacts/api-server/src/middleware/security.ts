import { Request, Response, NextFunction } from "express";

const loginAttempts = new Map<string, { count: number; lastAttempt: number; lockedUntil: number }>();
const publicEndpointAttempts = new Map<string, { count: number; windowStart: number }>();

const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_LOCKOUT_MS = 15 * 60 * 1000;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

const PUBLIC_RATE_LIMIT = 30;
const PUBLIC_WINDOW_MS = 60 * 1000;

function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.ip || "unknown";
}

export function loginRateLimiter(req: Request, res: Response, next: NextFunction): void {
  const ip = getClientIp(req);
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (record) {
    if (record.lockedUntil > now) {
      const waitMinutes = Math.ceil((record.lockedUntil - now) / 60000);
      res.status(429).json({ error: `Too many login attempts. Try again in ${waitMinutes} minutes.` });
      return;
    }
    if (now - record.lastAttempt > LOGIN_WINDOW_MS) {
      loginAttempts.delete(ip);
    }
  }
  next();
}

export function recordLoginAttempt(ip: string, success: boolean): void {
  if (success) {
    loginAttempts.delete(ip);
    return;
  }
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, lastAttempt: now, lockedUntil: 0 };
  record.count += 1;
  record.lastAttempt = now;
  if (record.count >= LOGIN_MAX_ATTEMPTS) {
    record.lockedUntil = now + LOGIN_LOCKOUT_MS;
    record.count = 0;
  }
  loginAttempts.set(ip, record);
}

export function publicRateLimiter(req: Request, res: Response, next: NextFunction): void {
  const ip = getClientIp(req);
  const now = Date.now();
  const record = publicEndpointAttempts.get(ip);

  if (record) {
    if (now - record.windowStart > PUBLIC_WINDOW_MS) {
      publicEndpointAttempts.set(ip, { count: 1, windowStart: now });
    } else if (record.count >= PUBLIC_RATE_LIMIT) {
      res.status(429).json({ error: "Too many requests. Please slow down." });
      return;
    } else {
      record.count += 1;
    }
  } else {
    publicEndpointAttempts.set(ip, { count: 1, windowStart: now });
  }
  next();
}

setInterval(() => {
  const now = Date.now();
  for (const [key, record] of loginAttempts.entries()) {
    if (now - record.lastAttempt > LOGIN_WINDOW_MS && record.lockedUntil < now) {
      loginAttempts.delete(key);
    }
  }
  for (const [key, record] of publicEndpointAttempts.entries()) {
    if (now - record.windowStart > PUBLIC_WINDOW_MS * 2) {
      publicEndpointAttempts.delete(key);
    }
  }
}, 60000);

export function sanitizeString(input: unknown, maxLength: number = 500): string {
  if (typeof input !== "string") return "";
  return input
    .slice(0, maxLength)
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/data:/gi, "d_ata:")
    .trim();
}

export function sanitizeHtml(input: unknown, maxLength: number = 50000): string {
  if (typeof input !== "string") return "";
  return input
    .slice(0, maxLength)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[\s\S]*?>/gi, "")
    .replace(/<form[\s\S]*?<\/form>/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/on\w+\s*=\s*[^\s>]*/gi, "")
    .replace(/javascript\s*:/gi, "")
    .replace(/vbscript\s*:/gi, "")
    .trim();
}

export function validateEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return re.test(email);
}

export function validatePhone(phone: string): boolean {
  if (!phone) return true;
  if (phone.length > 20) return false;
  return /^[+\d\s\-()]{0,20}$/.test(phone);
}

export function validateUrl(url: string): boolean {
  if (!url) return true;
  if (url.length > 2000) return false;
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return url.startsWith("/") && !url.includes("//");
  }
}

export function validatePaginationParams(page: unknown, limit: unknown): { page: number; limit: number } {
  let p = typeof page === "string" ? parseInt(page) : 1;
  let l = typeof limit === "string" ? parseInt(limit) : 20;
  if (isNaN(p) || p < 1) p = 1;
  if (p > 1000) p = 1000;
  if (isNaN(l) || l < 1) l = 20;
  if (l > 100) l = 100;
  return { page: p, limit: l };
}

export function securityHeaders(_req: Request, res: Response, next: NextFunction): void {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:;");
  next();
}

export function validateIdParam(req: Request, res: Response, next: NextFunction): void {
  const id = req.params.id;
  if (id !== undefined) {
    const parsed = parseInt(id);
    if (isNaN(parsed) || parsed < 1 || parsed > 2147483647) {
      res.status(400).json({ error: "Invalid ID parameter" });
      return;
    }
  }
  next();
}
