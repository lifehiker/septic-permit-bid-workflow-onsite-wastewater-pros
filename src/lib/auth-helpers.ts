import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function requireOrganization({ allowBilling = false } = {}) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { memberships: { include: { organization: { include: { subscriptions: true } } } } },
  });
  const membership = user?.memberships[0];
  if (!user || !membership) redirect("/login");

  const organization = membership.organization;
  const activeSubscription = organization.subscriptions.some((sub) => ["ACTIVE", "TRIALING"].includes(sub.status));
  const trialActive = organization.trialEndsAt.getTime() > Date.now();
  if (!allowBilling && !trialActive && !activeSubscription) redirect("/settings/billing");

  return { user, organization, membership };
}
