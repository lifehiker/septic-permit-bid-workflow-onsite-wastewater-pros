import Link from "next/link";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/print-button";
import { Button } from "@/components/ui/button";
import { checklistStatusLabels, jobTypeLabels, soilStatusLabels } from "@/lib/constants";
import { requireOrganization } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export default async function PacketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { organization } = await requireOrganization();
  const job = await prisma.job.findFirst({ where: { id, organizationId: organization.id }, include: { checklistItems: { orderBy: { position: "asc" } }, documents: true } });
  if (!job) notFound();
  const missing = job.checklistItems.filter((item) => item.status !== "COMPLETE" && item.status !== "NOT_APPLICABLE");
  return (
    <div className="mx-auto max-w-4xl">
      <div className="no-print mb-4 flex justify-between"><Button asChild variant="outline"><Link href={`/jobs/${job.id}`}>Back to job</Link></Button><PrintButton /></div>
      <article className="print-page rounded-lg border border-[#d9ded6] bg-white p-8 shadow-sm">
        <header className="border-b border-[#d9ded6] pb-5">
          <p className="text-sm font-semibold uppercase text-[#205d4a]">Permit packet summary</p>
          <h1 className="mt-2 text-3xl font-bold">{job.homeownerName}</h1>
          <p className="mt-1 text-[#65706b]">{job.propertyAddress}</p>
        </header>
        <section className="grid gap-4 border-b border-[#d9ded6] py-5 md:grid-cols-2">
          <p><strong>County:</strong> {job.county}</p>
          <p><strong>Job type:</strong> {jobTypeLabels[job.jobType]}</p>
          <p><strong>Phone:</strong> {job.phone || "Not provided"}</p>
          <p><strong>Email:</strong> {job.email || "Not provided"}</p>
          <p><strong>Soil/perc status:</strong> {soilStatusLabels[job.soilTestStatus]}</p>
          <p><strong>Soil/perc date:</strong> {job.soilTestScheduledDate ? job.soilTestScheduledDate.toLocaleDateString() : "Not scheduled"}</p>
        </section>
        <section className="border-b border-[#d9ded6] py-5">
          <h2 className="text-xl font-semibold">Checklist status</h2>
          <table className="mt-3 w-full border-collapse text-sm">
            <tbody>{job.checklistItems.map((item) => <tr key={item.id} className="border-t border-[#e1e6df]"><td className="py-2 pr-3">{item.title}</td><td className="py-2">{checklistStatusLabels[item.status]}</td><td className="py-2 text-[#65706b]">{item.notes}</td></tr>)}</tbody>
          </table>
        </section>
        <section className="border-b border-[#d9ded6] py-5">
          <h2 className="text-xl font-semibold">Missing items</h2>
          <ul className="mt-2 list-disc pl-5">{missing.map((item) => <li key={item.id}>{item.title}</li>)}{missing.length === 0 && <li>No missing items.</li>}</ul>
        </section>
        <section className="border-b border-[#d9ded6] py-5">
          <h2 className="text-xl font-semibold">Document links</h2>
          <ul className="mt-2 list-disc pl-5">{job.documents.map((document) => <li key={document.id}>{document.name}: {document.url}</li>)}{job.documents.length === 0 && <li>No document links.</li>}</ul>
        </section>
        <section className="py-5"><h2 className="text-xl font-semibold">Notes</h2><p className="mt-2 whitespace-pre-wrap text-[#33413c]">{job.notes || "No notes."}</p></section>
      </article>
    </div>
  );
}
