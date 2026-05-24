import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, FileStack, MailCheck, MapPinned } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  const features = [
    { title: "Pipeline", text: "Septic-specific stages from inquiry to install.", icon: ClipboardCheck },
    { title: "County templates", text: "Reusable permit requirements by county.", icon: MapPinned },
    { title: "Packet export", text: "Browser print-to-PDF job summaries.", icon: FileStack },
    { title: "Follow-ups", text: "Daily due and overdue proposal reminders.", icon: MailCheck },
  ];

  return (
    <MarketingShell>
      <main>
        <section className="border-b border-[#d9ded6] bg-[#fffdf8]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#205d4a]">Septic permit and bid workflow</p>
              <h1 className="mt-4 text-5xl font-bold leading-tight">SepticPermitCRM</h1>
              <p className="mt-5 max-w-2xl text-lg text-[#55635d]">Move jobs from inquiry to approved permit with septic-specific stages, perc-test tracking, county checklists, proposal follow-ups, and print-ready packet summaries.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg"><Link href="/signup">Start 14-day trial <ArrowRight size={17} /></Link></Button>
                <Button asChild variant="outline" size="lg"><Link href="/septic-permit-tracking-software">See workflow</Link></Button>
              </div>
            </div>
            <div className="rounded-lg border border-[#d9ded6] bg-[#f8faf6] p-4 shadow-sm">
              {["New inquiry", "Site visit scheduled", "Soil/perc test pending", "Permit packet incomplete", "Submitted to county", "Permit approved"].map((stage, index) => (
                <div key={stage} className="mb-3 flex items-center justify-between rounded-md bg-white p-4 last:mb-0">
                  <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#205d4a] text-sm font-bold text-white">{index + 1}</span><span className="font-medium">{stage}</span></div>
                  <span className="text-sm text-[#65706b]">{index + 2} jobs</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader><CardTitle className="flex items-center gap-2"><feature.icon size={19} /> {feature.title}</CardTitle></CardHeader>
              <CardContent className="text-sm text-[#55635d]">{feature.text}</CardContent>
            </Card>
          ))}
        </section>
        <section className="border-t border-[#d9ded6] bg-[#eef1ec]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold">Built around pre-install septic work.</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {["Track perc tests separately from permit packet status.", "Apply county-specific requirement templates to any job.", "Store Drive or Dropbox links without managing file storage.", "See proposal follow-ups due today before revenue leaks away."].map((item) => (
                <p key={item} className="flex gap-2 rounded-md bg-white p-4"><CheckCircle2 className="mt-0.5 text-[#205d4a]" size={18} /> {item}</p>
              ))}
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
