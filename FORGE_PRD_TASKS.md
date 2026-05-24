# FORGE PRD Tasks

Implementation order: foundation -> data/auth -> core workflows -> secondary workflows -> marketing/pages -> deployment -> QA.

## Foundation
- [x] Initialize Next.js 15 App Router with TypeScript, Tailwind, ESLint, and `src/`.
- [x] Add shadcn-style local UI primitives and lucide icons.
- [x] Configure `next.config.ts` with `output: "standalone"`.
- [x] Use system fonts only; no `next/font/google`.
- [x] Add `.env.example`, `.gitignore`, README, and provider-agnostic analytics helper.

## Data Model
- [x] Configure Prisma with SQLite safe default.
- [x] Define `User`, `Account`, `Session`, `VerificationToken`, `Organization`, `Membership`.
- [x] Define `Job` with homeowner, property, county, job type, value, stage, soil test, follow-up, assigned user, and notes fields.
- [x] Define `PermitChecklistItem`, `CountyTemplate`, `CountyTemplateItem`, `JobDocument`, `Subscription`, and `ActivityLog`.
- [x] Add required enums for job stages, job types, soil status, checklist status, document type, subscription status.
- [x] Add seed script with demo organization, user, jobs, checklist items, county templates, documents, and activity logs.

## Auth
- [x] Implement credentials signup/login with bcrypt and NextAuth v5 JWT sessions.
- [x] Create organization and owner membership on signup.
- [x] Keep marketing, pricing, login, and signup public.
- [x] Gate app routes behind session and trial/subscription access.
- [x] Preserve safe startup without OAuth credentials.

## App Pages
- [x] `/dashboard`: stage counts, attention list, follow-ups due today, overdue follow-ups, incomplete packets, county revisions.
- [x] `/jobs`: board and table tabs, filters by stage, county, follow-up status, permit status.
- [x] `/jobs/new`: create job form with default checklist creation.
- [x] `/jobs/[id]`: editable job details, soil/perc tracking, checklist, document links, notes, packet link.
- [x] `/jobs/[id]/packet`: print-friendly permit packet summary.
- [x] `/county-templates`: create/edit/delete county requirement templates and apply to jobs.
- [x] `/settings/billing`: trial/subscription status, pricing tiers, Stripe checkout fallback.

## Server Actions and APIs
- [x] `jobs`: create, update, delete, update stage.
- [x] `checklists`: update item, apply county template to job.
- [x] `county-templates`: create, update, delete.
- [x] `documents`: add and delete job document links.
- [x] `/api/stripe/checkout`: guarded Stripe checkout, graceful fallback without credentials.
- [x] `/api/webhooks/stripe`: guarded webhook and subscription update path.
- [x] `/api/cron/follow-up-reminders`: guarded daily Resend reminder path with skip response if not configured.

## Core Workflows
- [x] Create/edit septic job across septic-specific pipeline stages.
- [x] Kanban update stage workflow.
- [x] Table filtering workflow.
- [x] Soil/perc test status and details workflow.
- [x] Default permit checklist workflow.
- [x] County template creation and application workflow.
- [x] Document link management workflow.
- [x] Follow-up due/overdue workflow.
- [x] Packet summary browser print-to-PDF workflow.
- [x] Activity logging for major user actions.

## Billing, Email, Storage
- [x] Stripe subscription tiers: Solo $79, Team $149, Pro $249.
- [x] Stripe checkout and webhook are lazy-initialized and guarded.
- [x] Resend reminder emails are lazy-initialized and guarded.
- [x] External document storage uses URL links only; no file storage service required.
- [x] List missing production credentials in `HUMAN_INPUT_NEEDED.md`.

## Marketing and SEO Pages
- [x] `/`: polished homepage with SaaS positioning and product mockup.
- [x] `/pricing`: tiers, trial, and CTA.
- [x] `/login` and `/signup`: public auth entry.
- [x] `/septic-permit-checklist`.
- [x] `/septic-permit-tracking-software`.
- [x] `/septic-installer-crm`.
- [x] `/onsite-wastewater-contractor-software`.
- [x] `/septic-installation-estimate-follow-up`.
- [x] `/septic-proposal-template`.
- [x] `/perc-test-checklist`.
- [x] `/septic-system-design-forms`.
- [x] `/county-septic-permit-requirements-template`.
- [x] `/septic-permit-packet`.
- [x] Add metadata, OpenGraph data, sitemap, and robots.

## Docker and Deployment
- [x] Add production-ready Dockerfile only after checking project structure.
- [x] Ensure Dockerfile supports Prisma SQLite and standalone Next output.
- [x] Ensure app runs without configured environment variables.
- [x] Test `docker build .` if Docker is available. Docker CLI exists, but daemon access is denied in this environment.

## Verification
- [x] Run Prisma generate/db push.
- [x] Run `npm run lint`.
- [x] Run `npm run build` and fix all errors.
- [x] Start dev server and verify it does not crash.
- [x] Smoke-test public routes.
- [x] Smoke-test authenticated primary app routes using local credentials.
- [x] Visually review pages/components for professional, non-template UI.
- [x] Create `FORGE_COMPLETION_AUDIT.md` mapping requirements to files/routes/actions.
