import Link from "next/link";
import { Job } from "@prisma/client";
import { CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function FollowUpList({ jobs }: { jobs: Job[] }) {
  return (
    <div className="space-y-3">
      {jobs.map((job) => {
        const date = job.nextFollowUpDate ? new Date(job.nextFollowUpDate) : null;
        const overdue = date ? date.getTime() < new Date(new Date().toDateString()).getTime() : false;
        return (
          <Link key={job.id} href={`/jobs/${job.id}`} className="flex items-start justify-between gap-3 rounded-md border border-[#d9ded6] bg-white p-3 hover:bg-[#f9faf6]">
            <div>
              <p className="font-medium">{job.homeownerName}</p>
              <p className="text-sm text-[#65706b]">{job.county} County · {job.propertyAddress}</p>
            </div>
            <Badge variant={overdue ? "danger" : "warning"}><CalendarClock size={13} className="mr-1" /> {date ? date.toLocaleDateString() : "No date"}</Badge>
          </Link>
        );
      })}
      {jobs.length === 0 && <p className="rounded-md border border-dashed border-[#cfd6cc] p-4 text-sm text-[#65706b]">No follow-ups in this bucket.</p>}
    </div>
  );
}
