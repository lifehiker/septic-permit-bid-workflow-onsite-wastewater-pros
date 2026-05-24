# FORGE Completion Audit

## Foundation and Data
- Next.js 15 App Router, TypeScript, Tailwind, standalone output: `package.json`, `tsconfig.json`, `postcss.config.mjs`, `next.config.ts`, `src/app/layout.tsx`, `src/app/globals.css`.
- Prisma SQLite data model with auth, organization, jobs, checklists, county templates, document links, subscriptions, and activity logs: `prisma/schema.prisma`.
- Demo seed data for beta account, sample jobs, templates, checklist items, documents, and activity logs: `prisma/seed.ts`.

## Authentication and Access
- Deployment-safe email/password auth with bcrypt and NextAuth JWT sessions: `src/auth.ts`, `src/actions/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`.
- Organization and owner membership are created during signup: `src/actions/auth.ts`.
- App route gating with trial/subscription access and public marketing routes left open: `src/lib/auth-helpers.ts`, `src/app/(app)/layout.tsx`.
- Google OAuth from the PRD is intentionally replaced by credentials auth per `BUILD_INSTRUCTIONS.md` zero-config deployment rules.

## App Pages
- Dashboard counts, follow-ups due today, overdue follow-ups, incomplete packets, and county revisions: `src/app/(app)/dashboard/page.tsx`, `src/components/follow-up-list.tsx`.
- Jobs board and table with filters and kanban stage updates: `src/app/(app)/jobs/page.tsx`, `src/components/job-kanban.tsx`, `src/components/job-table.tsx`.
- Job creation with default checklist items: `src/app/(app)/jobs/new/page.tsx`, `src/components/job-form.tsx`, `src/actions/jobs.ts`.
- Job detail with editable fields, soil/perc tracking, checklist, document links, county template application, notes, and packet link: `src/app/(app)/jobs/[id]/page.tsx`, `src/components/permit-checklist.tsx`, `src/components/document-links.tsx`.
- Print-ready permit packet summary: `src/app/(app)/jobs/[id]/packet/page.tsx`, `src/components/print-button.tsx`, print CSS in `src/app/globals.css`.
- County template create/edit/delete and application workflow: `src/app/(app)/county-templates/page.tsx`, `src/actions/county-templates.ts`, `src/actions/checklists.ts`.
- Billing status and pricing tiers: `src/app/(app)/settings/billing/page.tsx`, `src/components/pricing-cards.tsx`.

## Server Actions and APIs
- Job CRUD and stage updates: `src/actions/jobs.ts`.
- Checklist updates and county-template application: `src/actions/checklists.ts`.
- County template CRUD: `src/actions/county-templates.ts`.
- Document link add/delete: `src/actions/documents.ts`.
- Stripe checkout and webhook with lazy SDK initialization and no-key fallback: `src/app/api/stripe/checkout/route.ts`, `src/app/api/webhooks/stripe/route.ts`.
- Daily follow-up reminders with lazy Resend initialization and no-key fallback: `src/app/api/cron/follow-up-reminders/route.ts`, `src/emails/follow-up-reminder.tsx`.
- Provider-agnostic analytics helper: `src/lib/analytics.ts`.

## Marketing and SEO
- Homepage, pricing, login, signup: `src/app/(marketing)/page.tsx`, `src/app/(marketing)/pricing/page.tsx`, `src/app/(marketing)/login/page.tsx`, `src/app/(marketing)/signup/page.tsx`.
- Ten PRD SEO pages: routes under `src/app/(marketing)/*/page.tsx`, content in `src/lib/seo-pages.ts`, renderer in `src/components/seo-page.tsx`.
- Sitemap and robots: `src/app/sitemap.ts`, `src/app/robots.ts`.

## Billing, Email, Storage Fallbacks
- Stripe credentials are optional. Without them, checkout redirects back to billing with a setup notice instead of crashing.
- Resend credentials are optional. Without them, the reminder endpoint returns `{ ok: true, skipped: "RESEND_API_KEY not set" }`.
- File storage is intentionally implemented as external document URLs through `JobDocument`; no external storage account is required.
- Credential requirements are documented in `HUMAN_INPUT_NEEDED.md`.

## Deployment
- Standalone Next output configured in `next.config.ts`.
- Production Dockerfile uses `node:20-slim`, Prisma Debian binary target, SQLite `/data/app.db`, and startup `prisma db push`: `Dockerfile`.
- Docker build was attempted, but the local Docker daemon socket is not accessible from this environment.

## Verification
- `npx prisma db push`: passed.
- `npm run db:seed`: passed.
- `npm run lint`: passed via `tsc --noEmit`.
- `npm run build`: passed.
- Dev server: started successfully on `http://localhost:3000`.
- Smoke-tested unauthenticated public routes: `/`, `/pricing`, `/septic-permit-tracking-software` returned 200.
- Smoke-tested auth redirect: `/dashboard` redirects to `/login` when unauthenticated.
- Smoke-tested authenticated routes with seeded demo credentials: `/dashboard`, `/jobs`, `/jobs/[id]`, `/jobs/[id]/packet`, `/county-templates`, `/settings/billing` returned 200.
- Smoke-tested email fallback endpoint: `/api/cron/follow-up-reminders` returned a safe skipped response without Resend credentials.
