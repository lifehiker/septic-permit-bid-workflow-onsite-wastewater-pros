"use client";

import Link from "next/link";
import { Job, JobStage } from "@prisma/client";
import { updateJobStage } from "@/actions/jobs";
import { JobStageBadge } from "@/components/job-stage-badge";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/field";
import { stageLabels } from "@/lib/constants";
import { money } from "@/lib/utils";

export function JobKanban({ jobs }: { jobs: Job[] }) {
  const stages = Object.values(JobStage).filter((stage) => !["CLOSED_WON", "CLOSED_LOST"].includes(stage));
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {stages.map((stage) => {
        const stageJobs = jobs.filter((job) => job.stage === stage);
        return (
          <section key={stage} className="rounded-lg border border-[#d9ded6] bg-[#f9faf6] p-3">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">{stageLabels[stage]}</h3>
              <span className="text-xs text-[#65706b]">{stageJobs.length}</span>
            </div>
            <div className="space-y-3">
              {stageJobs.map((job) => (
                <Card key={job.id} className="p-3">
                  <Link href={`/jobs/${job.id}`} className="font-medium hover:underline">{job.homeownerName}</Link>
                  <p className="mt-1 text-sm text-[#65706b]">{job.county} County · {money(job.estimatedValue)}</p>
                  <form action={updateJobStage.bind(null, job.id)} className="mt-3">
                    <Select name="stage" defaultValue={job.stage} onChange={(event) => event.currentTarget.form?.requestSubmit()}>
                      {Object.values(JobStage).map((value) => <option key={value} value={value}>{stageLabels[value]}</option>)}
                    </Select>
                  </form>
                </Card>
              ))}
              {stageJobs.length === 0 && <p className="rounded-md border border-dashed border-[#cfd6cc] p-3 text-sm text-[#65706b]">No jobs in this stage.</p>}
            </div>
          </section>
        );
      })}
    </div>
  );
}
