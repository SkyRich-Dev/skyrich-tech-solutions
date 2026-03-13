import express, { type Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes";
import { securityHeaders } from "./middleware/security";

const app: Express = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : undefined;

app.use(cors(allowedOrigins ? {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => origin.includes(o))) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
} : undefined));

app.use(securityHeaders);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.disable("x-powered-by");

app.use("/api", router);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
