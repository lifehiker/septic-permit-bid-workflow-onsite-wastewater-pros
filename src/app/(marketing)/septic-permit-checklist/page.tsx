import type { Metadata } from "next";
import { MarketingShell } from "@/components/marketing-shell";
import { SeoPage } from "@/components/seo-page";
import { seoPages } from "@/lib/seo-pages";
export const metadata: Metadata = { title: "Septic Permit Checklist for Installers | SepticPermitCRM", description: "Track septic permit checklists across estimates, perc tests, county requirements, permit packets, and follow-ups. Built for septic installers and onsite wastewater pros." };
export default function Page() { return <MarketingShell><SeoPage data={seoPages["septic-permit-checklist"]} /></MarketingShell>; }
