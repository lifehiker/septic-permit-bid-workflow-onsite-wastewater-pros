import { Job, JobStage, JobType, SoilTestStatus } from "@prisma/client";
import { Save } from "lucide-react";
import { createJob, updateJob } from "@/actions/jobs";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { jobTypeLabels, soilStatusLabels, stageLabels } from "@/lib/constants";

function dateValue(date?: Date | null) {
  return date ? date.toISOString().slice(0, 10) : "";
}

export function JobForm({ job }: { job?: Job }) {
  const action = job ? updateJob.bind(null, job.id) : createJob;
  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <Field label="Homeowner name"><Input name="homeownerName" required defaultValue={job?.homeownerName} /></Field>
      <Field label="County"><Input name="county" required defaultValue={job?.county} /></Field>
      <Field label="Property address"><Input name="propertyAddress" required defaultValue={job?.propertyAddress} /></Field>
      <Field label="Estimated job value"><Input name="estimatedValue" inputMode="numeric" defaultValue={job?.estimatedValue ?? ""} /></Field>
      <Field label="Phone"><Input name="phone" defaultValue={job?.phone ?? ""} /></Field>
      <Field label="Email"><Input name="email" type="email" defaultValue={job?.email ?? ""} /></Field>
      <Field label="Job type">
        <Select name="jobType" defaultValue={job?.jobType ?? "NEW_INSTALL"}>
          {Object.values(JobType).map((value) => <option key={value} value={value}>{jobTypeLabels[value]}</option>)}
        </Select>
      </Field>
      <Field label="Pipeline stage">
        <Select name="stage" defaultValue={job?.stage ?? "NEW_INQUIRY"}>
          {Object.values(JobStage).map((value) => <option key={value} value={value}>{stageLabels[value]}</option>)}
        </Select>
      </Field>
      <Field label="Next follow-up date"><Input name="nextFollowUpDate" type="date" defaultValue={dateValue(job?.nextFollowUpDate)} /></Field>
      <Field label="Soil/perc test status">
        <Select name="soilTestStatus" defaultValue={job?.soilTestStatus ?? "NEEDS_SCHEDULING"}>
          {Object.values(SoilTestStatus).map((value) => <option key={value} value={value}>{soilStatusLabels[value]}</option>)}
        </Select>
      </Field>
      <Field label="Soil/perc scheduled date"><Input name="soilTestScheduledDate" type="date" defaultValue={dateValue(job?.soilTestScheduledDate)} /></Field>
      <Field label="Test provider"><Input name="soilTestProvider" defaultValue={job?.soilTestProvider ?? ""} /></Field>
      <div className="md:col-span-2"><Field label="Result summary"><Textarea name="soilTestSummary" defaultValue={job?.soilTestSummary ?? ""} /></Field></div>
      <div className="md:col-span-2"><Field label="Notes"><Textarea name="notes" defaultValue={job?.notes ?? ""} /></Field></div>
      <div className="md:col-span-2"><Button><Save size={16} /> {job ? "Save job" : "Create job"}</Button></div>
    </form>
  );
}
