import Link from "next/link";
import { JobStage } from "@prisma/client";
import { format } from "date-fns";
import { AlertTriangle, ClipboardList, FileWarning, Plus, RefreshCw } from "lucide-react";
import { FollowUpList } from "@/components/follow-up-list";
import { JobStageBadge } from "@/components/job-stage-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stageLabels } from "@/lib/constants";
import { requireOrganization } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const { organization } = await requireOrganization();
  const jobs = await prisma.job.findMany({ where: { organizationId: organization.id }, orderBy: { updatedAt: "desc" } });
  const today = new Date(new Date().toDateString());
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const dueToday = jobs.filter((job) => job.nextFollowUpDate && job.nextFollowUpDate >= today && job.nextFollowUpDate < tomorrow);
  const overdue = jobs.filter((job) => job.nextFollowUpDate && job.nextFollowUpDate < today);
  const incomplete = jobs.filter((job) => job.stage === "PERMIT_PACKET_INCOMPLETE");
  const revisions = jobs.filter((job) => job.stage === "COUNTY_REVISIONS_REQUESTED");
  const stageCards = Object.values(JobStage).slice(0, 9);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-3xl font-bold">Dashboard</h1><p className="text-[#65706b]">Today is {format(today, "MMMM d, yyyy")}.</p></div>
        <Button asChild><Link href="/jobs/new"><Plus size={16} /> New job</Link></Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stageCards.map((stage) => <Card key={stage}><CardContent className="p-4"><p className="text-2xl font-bold">{jobs.filter((job) => job.stage === stage).length}</p><p className="mt-1 text-sm text-[#65706b]">{stageLabels[stage]}</p></CardContent></Card>)}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><ClipboardList size={19} /> Follow-ups due today</CardTitle></CardHeader><CardContent><FollowUpList jobs={dueToday} /></CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle size={19} /> Overdue follow-ups</CardTitle></CardHeader><CardContent><FollowUpList jobs={overdue} /></CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><FileWarning size={19} /> Permit packets incomplete</CardTitle></CardHeader><CardContent className="space-y-2">{incomplete.map((job) => <Link className="flex items-center justify-between rounded-md bg-white p-3" href={`/jobs/${job.id}`} key={job.id}><span>{job.homeownerName}</span><JobStageBadge stage={job.stage} /></Link>)}{incomplete.length === 0 && <p className="text-sm text-[#65706b]">No incomplete packets.</p>}</CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><RefreshCw size={19} /> County revisions requested</CardTitle></CardHeader><CardContent className="space-y-2">{revisions.map((job) => <Link className="flex items-center justify-between rounded-md bg-white p-3" href={`/jobs/${job.id}`} key={job.id}><span>{job.homeownerName}</span><JobStageBadge stage={job.stage} /></Link>)}{revisions.length === 0 && <p className="text-sm text-[#65706b]">No open revision requests.</p>}</CardContent></Card>
      </div>
    </div>
  );
}
