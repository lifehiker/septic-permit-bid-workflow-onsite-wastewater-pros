import type { Metadata } from "next";
import { MarketingShell } from "@/components/marketing-shell";
import { SeoPage } from "@/components/seo-page";
import { seoPages } from "@/lib/seo-pages";
export const metadata: Metadata = { title: "Septic Installation Estimate Follow Up | SepticPermitCRM", description: "Track septic estimate follow-up across bids, perc tests, county requirements, permit packets, and homeowner communication." };
export default function Page() { return <MarketingShell><SeoPage data={seoPages["septic-installation-estimate-follow-up"]} /></MarketingShell>; }
