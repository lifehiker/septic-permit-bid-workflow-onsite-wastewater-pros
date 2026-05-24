import type { Metadata } from "next";
import { MarketingShell } from "@/components/marketing-shell";
import { SeoPage } from "@/components/seo-page";
import { seoPages } from "@/lib/seo-pages";
export const metadata: Metadata = { title: "Onsite Wastewater Contractor Software | SepticPermitCRM", description: "Track onsite wastewater contractor work across estimates, perc tests, county requirements, permit packets, and follow-ups." };
export default function Page() { return <MarketingShell><SeoPage data={seoPages["onsite-wastewater-contractor-software"]} /></MarketingShell>; }
