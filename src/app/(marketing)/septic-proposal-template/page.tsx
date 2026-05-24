import type { Metadata } from "next";
import { MarketingShell } from "@/components/marketing-shell";
import { SeoPage } from "@/components/seo-page";
import { seoPages } from "@/lib/seo-pages";
export const metadata: Metadata = { title: "Septic Proposal Template | SepticPermitCRM", description: "Use a septic proposal template tied to estimates, perc tests, county requirements, permit packets, and follow-ups." };
export default function Page() { return <MarketingShell><SeoPage data={seoPages["septic-proposal-template"]} /></MarketingShell>; }
