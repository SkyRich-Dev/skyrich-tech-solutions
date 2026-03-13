# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── web/                # SkyRich Tech Solutions website (React + Vite + TailwindCSS)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (admin-users, blog-posts, leads, chat-messages, visitor-analytics)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `artifacts/web` (`@workspace/web`)

SkyRich Tech Solutions enterprise website built with React + Vite + TailwindCSS + Framer Motion.

- Pages: Home, Services, Industries, Products, Insights, About, Careers, Contact, Privacy Policy, Terms of Service
- Product pages: AIDA, AIVA, Orbit CRM
- Blog: 40 SEO-optimized articles (10 in `src/data/blog-articles.ts` + 30 in `src/data/blog-articles-new.ts`), rendered at `/insights/:slug`
- Blog categories: Industry 4.0, Smart Manufacturing, AI & Data Analytics, AI & ML, Vision & Quality, Plant & Process, Digital Transformation
- Insights page: Category filter tabs with state-driven filtering
- Routing: wouter (client-side)
- Animations: framer-motion
- Forms: react-hook-form + zod validation
- Styling: TailwindCSS with custom CSS variables for brand colors
- Brand colors: Deep Blue (#0A1F3C), Tech Blue (#2D7FF9), Innovation Orange (#FF7A1A)
- Logo: `public/images/skyrich-logo.png` (transparent PNG, referenced via BASE_URL)
- Hero: 2-column layout with auto-rotating carousel (4 slides, 6s interval), animated stats panel, progress indicators
- SEO: Reusable `SEOHead.tsx` component with per-page meta titles, descriptions, keywords, canonical URLs, OpenGraph/Twitter cards, and JSON-LD structured data (Organization, LocalBusiness, Product, BreadcrumbList, BlogPosting)
- Static SEO files: `public/sitemap.xml`, `public/robots.txt`
- Admin Console: `/admin/login`, `/admin`, `/admin/leads`, `/admin/blog`, `/admin/chat`, `/admin/analytics`
- Frontend widgets: ChatWidget (chatbot), CookieConsent (GDPR), VisitorTracker (analytics)
- Admin API helper: `src/lib/admin-api.ts`
- `pnpm --filter @workspace/web run dev` — run the dev server

### Admin Console & CRM System

The admin console is accessible at `/admin/login` with JWT-based authentication.

**Default admin credentials:**
- Email: `admin@skyrichtechsolutions.com`
- Password: `admin123`
- Role: `super_admin`

**Admin Modules:**
1. **Dashboard** (`/admin`) — Overview with total visitors, enquiries, page views, blog posts, chat sessions, recent leads, top pages, leads by source
2. **Leads/CRM** (`/admin/leads`) — Lead management with status tracking (New Lead, Contacted, Follow-up, Converted, Closed), source filtering, lead details
3. **Blog Manager** (`/admin/blog`) — Full CMS with create/edit/delete posts, SEO score indicator, draft/publish/scheduled status, SEO fields (meta title, description, keywords, OG tags, canonical URL)
4. **Chat Messages** (`/admin/chat`) — View chat sessions, read chat history, reply to visitors
5. **Analytics** (`/admin/analytics`) — Visitor analytics with traffic charts (daily/weekly/monthly), traffic sources, device types, browser stats, top pages, visitor locations

**Frontend Widgets (integrated into all public pages):**
- **ChatWidget** — Smart chatbot in bottom-right corner, collects visitor details, auto-creates CRM leads, context-aware responses about AIDA/AIVA/Orbit products
- **CookieConsent** — GDPR-compliant cookie banner with Accept All/Reject All/Customize options
- **VisitorTracker** — Tracks page views, time on page, device type, browser, traffic source, UTM parameters

**Database Tables:**
- `admin_users` — Admin accounts with roles (super_admin, content_manager, sales_manager)
- `blog_posts` — CMS blog articles with SEO fields
- `blog_categories` — Blog categories
- `leads` — CRM leads with status tracking
- `chat_sessions` — Chat session records
- `chat_messages` — Individual chat messages
- `visitor_analytics` — Visitor session data (device, browser, traffic source)
- `page_views` — Page view records with time spent
- `cookie_tracking` — Cookie consent and return visitor tracking

**Security Hardening:**
- Rate limiting: 5 login attempts per IP (15-min lockout), 30 req/min on public endpoints
- Security headers: CSP, HSTS, X-Frame-Options (DENY), X-Content-Type-Options, X-XSS-Protection, Referrer-Policy
- Password hashing: PBKDF2 with 310,000 iterations, 32-byte salt, SHA-512
- JWT: 8-hour token duration, timing-safe comparison, persistent JWT_SECRET env var
- Input sanitization: HTML tag stripping on all text inputs, 2000-char message limit
- Email validation: regex whitelist on lead submissions
- Mass-assignment prevention: explicit field whitelisting on all create/update operations
- Body size limit: 1MB max request body
- Middleware: `security.ts` (rate limiting, headers), `auth.ts` (JWT verification)

**API Routes (all prefixed with `/api`):**
- Auth: `POST /auth/login`, `GET /auth/me`, `POST /auth/setup`
- Leads (public): `POST /leads`
- Leads (admin): `GET /admin/leads`, `PUT /admin/leads/:id`, `DELETE /admin/leads/:id`, `GET /admin/leads/stats`
- Blog (admin): `GET/POST /admin/blog/posts`, `PUT/DELETE /admin/blog/posts/:id`, `GET/POST /admin/blog/categories`
- Chat (public): `POST /chat/session`, `POST /chat/message`, `POST /chat/details`
- Chat (admin): `GET /admin/chat/sessions`, `GET /admin/chat/sessions/:id/messages`, `POST /admin/chat/reply`
- Analytics (public): `POST /analytics/track`, `POST /analytics/page-time`, `POST /analytics/cookie-consent`
- Analytics (admin): `GET /admin/analytics/overview`, `GET /admin/analytics/traffic`, `GET /admin/analytics/locations`
- Dashboard: `GET /admin/dashboard`

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.
