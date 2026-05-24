import type { Metadata } from "next";
import { MarketingShell } from "@/components/marketing-shell";
import { SeoPage } from "@/components/seo-page";
import { seoPages } from "@/lib/seo-pages";
export const metadata: Metadata = { title: "Septic System Design Forms | SepticPermitCRM", description: "Organize septic system design forms, drawings, site plans, county requirements, and permit packet checklists." };
export default function Page() { return <MarketingShell><SeoPage data={seoPages["septic-system-design-forms"]} /></MarketingShell>; }
