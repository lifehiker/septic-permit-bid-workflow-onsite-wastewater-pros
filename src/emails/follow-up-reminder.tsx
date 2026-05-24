import { Job } from "@prisma/client";

export function followUpReminderHtml(jobs: Job[]) {
  const items = jobs.map((job) => `<li><strong>${job.homeownerName}</strong> - ${job.county} County - ${job.propertyAddress}</li>`).join("");
  return `<div style="font-family:system-ui,sans-serif"><h1>Follow-ups due today</h1><p>${jobs.length} septic jobs need attention.</p><ul>${items}</ul></div>`;
}
