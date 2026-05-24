import type { Metadata } from "next";
import { MarketingShell } from "@/components/marketing-shell";
import { PricingCards } from "@/components/pricing-cards";

export const metadata: Metadata = {
  title: "Pricing | SepticPermitCRM",
  description: "Solo, Team, and Pro pricing for septic permit tracking, county templates, proposal follow-ups, and packet summaries.",
};

export default function PricingPage() {
  return (
    <MarketingShell>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">Pricing that fits small septic teams</h1>
        <p className="mt-3 max-w-2xl text-[#55635d]">Start with a 14-day trial. Upgrade when the workflow is saving missed follow-ups and permit packet delays.</p>
        <div className="mt-8"><PricingCards /></div>
      </main>
    </MarketingShell>
  );
}
