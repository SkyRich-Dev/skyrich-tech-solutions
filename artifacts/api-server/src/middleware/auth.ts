import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString("hex");

if (!process.env.JWT_SECRET) {
  console.warn("WARNING: JWT_SECRET not set. Using random secret — tokens will not persist across restarts. Set JWT_SECRET in environment variables for production.");
}

interface TokenPayload {
  id: number;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

function base64UrlEncode(data: string): string {
  return Buffer.from(data).toString("base64url");
}

function base64UrlDecode(data: string): string {
  return Buffer.from(data, "base64url").toString("utf-8");
}

export function generateToken(payload: Omit<TokenPayload, "exp" | "iat">): string {
  const now = Date.now();
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const tokenPayload = base64UrlEncode(
    JSON.stringify({ ...payload, iat: now, exp: now + 8 * 60 * 60 * 1000 })
  );
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${header}.${tokenPayload}`)
    .digest("base64url");
  return `${header}.${tokenPayload}.${signature}`;
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    if (!token || typeof token !== "string") return null;
    if (token.length > 2000) return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts;

    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest("base64url");

    const sigBuf = Buffer.from(signature, "utf-8");
    const expectedBuf = Buffer.from(expectedSignature, "utf-8");
    if (sigBuf.length !== expectedBuf.length) return null;
    if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return null;

    const decoded = JSON.parse(base64UrlDecode(payload)) as TokenPayload;
    if (typeof decoded.exp !== "number" || decoded.exp < Date.now()) return null;
    if (typeof decoded.id !== "number" || typeof decoded.email !== "string") return null;
    return decoded;
  } catch {
    return null;
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = authHeader.slice(7);
  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }
  (req as any).adminUser = payload;
  next();
}

export function roleMiddleware(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).adminUser;
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    next();
  };
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 310000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const parts = stored.split(":");
    if (parts.length !== 2) return false;
    const [salt, hash] = parts;

    const configs = [
      { iterations: 310000, keylen: 64 },
      { iterations: 100000, keylen: 64 },
    ];

    for (const cfg of configs) {
      const verify = crypto.pbkdf2Sync(password, salt, cfg.iterations, cfg.keylen, "sha512").toString("hex");
      const hashBuf = Buffer.from(hash, "utf-8");
      const verifyBuf = Buffer.from(verify, "utf-8");
      if (hashBuf.length === verifyBuf.length && crypto.timingSafeEqual(hashBuf, verifyBuf)) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

export function needsRehash(stored: string): boolean {
  const [salt] = stored.split(":");
  return salt.length !== 64;
}
