import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type SeoPageData = {
  title: string;
  keyword: string;
  description: string;
  cta: string;
  checklist: string[];
  sections: string[];
};

export function SeoPage({ data }: { data: SeoPageData }) {
  return (
    <main>
      <section className="border-b border-[#d9ded6] bg-[#fffdf8]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#205d4a]">{data.keyword}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">{data.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-[#55635d]">{data.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/signup">{data.cta}<ArrowRight size={17} /></Link></Button>
              <Button asChild variant="outline" size="lg"><a href="#checklist">Copy checklist</a></Button>
            </div>
          </div>
          <Card className="self-start">
            <CardHeader><CardTitle>Workflow snapshot</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {["Inquiry received", "Perc test pending", "Packet incomplete", "Submitted to county", "Permit approved"].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-md bg-[#f4f6f2] p-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#205d4a] text-xs font-bold text-white">{index + 1}</span>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
      <section id="checklist" className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><FileText size={20} /> Practical checklist</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.checklist.map((item) => <li key={item} className="flex gap-2 text-sm"><CheckCircle2 size={17} className="mt-0.5 text-[#205d4a]" /> {item}</li>)}
            </ul>
          </CardContent>
        </Card>
        <div className="space-y-5">
          {data.sections.map((section) => (
            <div key={section} className="rounded-lg border border-[#d9ded6] bg-white p-5">
              <h2 className="text-xl font-semibold">{section}</h2>
              <p className="mt-2 text-[#55635d]">Use this as a reusable process inside SepticPermitCRM so each job keeps county requirements, homeowner communication, perc-test status, and missing packet items in one place.</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t border-[#d9ded6] bg-[#205d4a] px-4 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div><h2 className="text-2xl font-bold">Built for septic installers and onsite wastewater pros.</h2><p className="mt-1 text-white/80">Not a generic contractor CRM that needs weeks of customization.</p></div>
          <Button asChild variant="secondary" size="lg"><Link href="/signup">Track this in the app</Link></Button>
        </div>
      </section>
    </main>
  );
}
