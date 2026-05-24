import type { Metadata } from "next";
import { MarketingShell } from "@/components/marketing-shell";
import { SeoPage } from "@/components/seo-page";
import { seoPages } from "@/lib/seo-pages";
export const metadata: Metadata = { title: "County Septic Permit Requirements Template | SepticPermitCRM", description: "Build reusable county septic permit requirement templates for forms, drawings, fees, reports, and revisions." };
export default function Page() { return <MarketingShell><SeoPage data={seoPages["county-septic-permit-requirements-template"]} /></MarketingShell>; }
