import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, Trash2 } from "lucide-react";
import { applyCountyTemplateToJob } from "@/actions/checklists";
import { deleteJob } from "@/actions/jobs";
import { DocumentLinks } from "@/components/document-links";
import { JobForm } from "@/components/job-form";
import { JobStageBadge } from "@/components/job-stage-badge";
import { PermitChecklist } from "@/components/permit-checklist";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/field";
import { soilStatusLabels } from "@/lib/constants";
import { requireOrganization } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { money } from "@/lib/utils";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { organization } = await requireOrganization();
  const [job, templates] = await Promise.all([
    prisma.job.findFirst({ where: { id, organizationId: organization.id }, include: { checklistItems: { orderBy: { position: "asc" } }, documents: true } }),
    prisma.countyTemplate.findMany({ where: { organizationId: organization.id }, include: { items: true }, orderBy: { county: "asc" } }),
  ]);
  if (!job) notFound();
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-2"><JobStageBadge stage={job.stage} /></div>
          <h1 className="text-3xl font-bold">{job.homeownerName}</h1>
          <p className="text-[#65706b]">{job.propertyAddress} · {job.county} County · {money(job.estimatedValue)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline"><Link href={`/jobs/${job.id}/packet`}><FileText size={16} /> Packet summary</Link></Button>
          <form action={deleteJob.bind(null, job.id)}><Button variant="danger"><Trash2 size={16} /> Delete</Button></form>
        </div>
      </div>
      <Card><CardHeader><CardTitle>Edit job and soil/perc tracking</CardTitle><p className="text-sm text-[#65706b]">Current soil status: {soilStatusLabels[job.soilTestStatus]}</p></CardHeader><CardContent><JobForm job={job} /></CardContent></Card>
      <Card>
        <CardHeader><CardTitle>Apply county template</CardTitle></CardHeader>
        <CardContent>
          <form action={async (formData) => { "use server"; await applyCountyTemplateToJob(job.id, String(formData.get("templateId"))); }} className="flex flex-wrap gap-3">
            <Select name="templateId" className="max-w-sm">{templates.map((template) => <option key={template.id} value={template.id}>{template.county} ({template.items.length} items)</option>)}</Select>
            <Button disabled={templates.length === 0}>Apply template</Button>
          </form>
        </CardContent>
      </Card>
      <Card><CardContent><PermitChecklist items={job.checklistItems} /></CardContent></Card>
      <Card><CardContent><DocumentLinks jobId={job.id} documents={job.documents} /></CardContent></Card>
    </div>
  );
}
