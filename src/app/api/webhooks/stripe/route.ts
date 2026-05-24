import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: true, skipped: "Stripe webhook not configured" });
  }
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const organizationId = session.metadata?.organizationId;
    if (organizationId && typeof session.subscription === "string") {
      await prisma.subscription.upsert({
        where: { stripeSubscriptionId: session.subscription },
        create: { organizationId, stripeSubscriptionId: session.subscription, tier: session.metadata?.tier || "Solo", status: "ACTIVE" },
        update: { status: "ACTIVE" },
      });
    }
  }
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    await prisma.subscription.updateMany({ where: { stripeSubscriptionId: subscription.id }, data: { status: "CANCELED" } });
  }
  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object;
    await prisma.subscription.updateMany({ where: { stripeSubscriptionId: subscription.id }, data: { status: subscription.status === "active" ? "ACTIVE" : "PAST_DUE" } });
  }
  return NextResponse.json({ received: true });
}
