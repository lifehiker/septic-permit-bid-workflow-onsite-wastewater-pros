import Link from "next/link";
import { Plus } from "lucide-react";
import { JobKanban } from "@/components/job-kanban";
import { JobTable } from "@/components/job-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { requireOrganization } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export default async function JobsPage() {
  const { organization } = await requireOrganization();
  const jobs = await prisma.job.findMany({ where: { organizationId: organization.id }, orderBy: { updatedAt: "desc" } });
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-3xl font-bold">Jobs</h1><p className="text-[#65706b]">Board and table views for septic permit work.</p></div>
        <Button asChild><Link href="/jobs/new"><Plus size={16} /> New job</Link></Button>
      </div>
      <Tabs defaultValue="board">
        <TabsList><TabsTrigger value="board">Board</TabsTrigger><TabsTrigger value="table">Table</TabsTrigger></TabsList>
        <TabsContent value="board" className="mt-5"><JobKanban jobs={jobs} /></TabsContent>
        <TabsContent value="table" className="mt-5"><JobTable jobs={jobs} /></TabsContent>
      </Tabs>
    </div>
  );
}
