import type { Metadata } from "next";
import { MarketingShell } from "@/components/marketing-shell";
import { SeoPage } from "@/components/seo-page";
import { seoPages } from "@/lib/seo-pages";
export const metadata: Metadata = { title: "Perc Test Checklist | SepticPermitCRM", description: "Track perc test status, providers, results, document links, and permit packet readiness for septic jobs." };
export default function Page() { return <MarketingShell><SeoPage data={seoPages["perc-test-checklist"]} /></MarketingShell>; }
