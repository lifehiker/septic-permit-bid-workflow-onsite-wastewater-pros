"use client";

import Link from "next/link";
import { Job, JobStage } from "@prisma/client";
import { useMemo, useState } from "react";
import { JobStageBadge } from "@/components/job-stage-badge";
import { Input, Select } from "@/components/ui/field";
import { jobTypeLabels, stageLabels } from "@/lib/constants";
import { money } from "@/lib/utils";

export function JobTable({ jobs }: { jobs: Job[] }) {
  const [county, setCounty] = useState("");
  const [stage, setStage] = useState("");
  const [followUp, setFollowUp] = useState("");
  const filtered = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return jobs.filter((job) => {
      const due = job.nextFollowUpDate ? new Date(job.nextFollowUpDate).toISOString().slice(0, 10) <= today : false;
      return (!county || job.county.toLowerCase().includes(county.toLowerCase())) && (!stage || job.stage === stage) && (!followUp || (followUp === "due" ? due : !due));
    });
  }, [jobs, county, stage, followUp]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        <Input placeholder="Filter county" value={county} onChange={(event) => setCounty(event.target.value)} />
        <Select value={stage} onChange={(event) => setStage(event.target.value)}>
          <option value="">All stages</option>
          {Object.values(JobStage).map((value) => <option key={value} value={value}>{stageLabels[value]}</option>)}
        </Select>
        <Select value={followUp} onChange={(event) => setFollowUp(event.target.value)}>
          <option value="">All follow-ups</option>
          <option value="due">Due or overdue</option>
          <option value="not-due">Not due</option>
        </Select>
      </div>
      <div className="overflow-hidden rounded-lg border border-[#d9ded6] bg-white">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead className="bg-[#eef1ec] text-left">
            <tr><th className="p-3">Homeowner</th><th className="p-3">County</th><th className="p-3">Type</th><th className="p-3">Value</th><th className="p-3">Stage</th><th className="p-3">Follow-up</th></tr>
          </thead>
          <tbody>
            {filtered.map((job) => (
              <tr key={job.id} className="border-t border-[#e1e6df]">
                <td className="p-3 font-medium"><Link href={`/jobs/${job.id}`} className="hover:underline">{job.homeownerName}</Link></td>
                <td className="p-3">{job.county}</td>
                <td className="p-3">{jobTypeLabels[job.jobType]}</td>
                <td className="p-3">{money(job.estimatedValue)}</td>
                <td className="p-3"><JobStageBadge stage={job.stage} /></td>
                <td className="p-3">{job.nextFollowUpDate ? new Date(job.nextFollowUpDate).toLocaleDateString() : "None"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
