import type { Metadata } from "next";
import { MarketingShell } from "@/components/marketing-shell";
import { SeoPage } from "@/components/seo-page";
import { seoPages } from "@/lib/seo-pages";
export const metadata: Metadata = { title: "Septic Permit Packet | SepticPermitCRM", description: "Generate a septic permit packet summary from job records, checklist status, soil tests, document links, and notes." };
export default function Page() { return <MarketingShell><SeoPage data={seoPages["septic-permit-packet"]} /></MarketingShell>; }
