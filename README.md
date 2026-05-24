# SepticPermitCRM

SepticPermitCRM is a Next.js SaaS for septic installers, designers, and onsite wastewater professionals. It tracks septic-specific job stages, perc/soil test status, county permit requirement templates, proposal follow-ups, document links, and print-ready permit packet summaries.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Prisma with SQLite
- NextAuth credentials auth
- Stripe and Resend guarded behind optional environment variables

## Local Setup

```bash
npm install
cp .env.example .env.local
npx prisma db push
npm run db:seed
npm run dev
```

Demo credentials after seeding:

- Email: `demo@septicpermitcrm.test`
- Password: `demo-password`

## Verification

```bash
npm run lint
npm run build
```

External integrations are safe by default. Without Stripe or Resend credentials, checkout and reminder endpoints return graceful setup messages instead of crashing.
