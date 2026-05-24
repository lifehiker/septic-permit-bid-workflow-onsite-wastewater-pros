import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { pricingTiers } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.redirect(new URL("/login", request.url));
  const formData = await request.formData();
  const tier = pricingTiers.find((item) => item.id === String(formData.get("tier"))) ?? pricingTiers[0];
  const priceId = process.env[tier.priceEnv];
  if (!process.env.STRIPE_SECRET_KEY || !priceId) {
    return NextResponse.redirect(new URL(`/settings/billing?notice=${encodeURIComponent("Stripe is not configured yet. Add Stripe keys to enable checkout.")}`, request.url));
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, include: { memberships: true } });
  const membership = user?.memberships[0];
  if (!membership) return NextResponse.redirect(new URL("/login", request.url));
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: session.user.email,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin}/settings/billing?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin}/settings/billing?checkout=cancelled`,
    metadata: { organizationId: membership.organizationId, tier: tier.name },
  });
  return NextResponse.redirect(checkout.url || new URL("/settings/billing", request.url));
}
