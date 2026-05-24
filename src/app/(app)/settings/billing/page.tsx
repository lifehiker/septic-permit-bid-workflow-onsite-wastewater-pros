import { PricingCards } from "@/components/pricing-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireOrganization } from "@/lib/auth-helpers";

export default async function BillingPage() {
  const { organization } = await requireOrganization({ allowBilling: true });
  const trialDays = Math.max(0, Math.ceil((organization.trialEndsAt.getTime() - Date.now()) / (24 * 60 * 60 * 1000)));
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">Billing</h1><p className="text-[#65706b]">Manage your beta trial and subscription.</p></div>
      <Card><CardHeader><CardTitle>Current access</CardTitle></CardHeader><CardContent><p>{trialDays > 0 ? `${trialDays} trial days remaining.` : "Trial expired. Choose a plan to continue."}</p><p className="mt-2 text-sm text-[#65706b]">If Stripe credentials are not configured, checkout returns a clear setup message and the app remains usable during beta.</p></CardContent></Card>
      <PricingCards billing />
    </div>
  );
}
