# Human Input Needed

The app runs without these credentials, but production integrations require them:

1. **Stripe**
   - Create products/prices for Solo ($79/month), Team ($149/month), and Pro ($249/month).
   - Set `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_SOLO`, `STRIPE_PRICE_TEAM`, and `STRIPE_PRICE_PRO`.
   - Point Stripe webhooks to `/api/webhooks/stripe`.

2. **Resend**
   - Verify a sending domain.
   - Set `RESEND_API_KEY` and `EMAIL_FROM`.
   - Configure a daily cron to call `/api/cron/follow-up-reminders?secret=...` and set `CRON_SECRET`.

3. **Production auth secret**
   - Set `AUTH_SECRET` to a strong value generated with `openssl rand -base64 32`.

No Google OAuth credential is needed because the deployment-safe implementation uses email/password credentials auth.
