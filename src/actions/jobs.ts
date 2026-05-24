"use server";

import { JobStage, JobType, SoilTestStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOrganization } from "@/lib/auth-helpers";
import { defaultChecklistItems } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

function toDate(value: FormDataEntryValue | null) {
  const text = String(value || "");
  return text ? new Date(`${text}T12:00:00`) : null;
}

function toInt(value: FormDataEntryValue | null) {
  const text = String(value || "").replace(/[^0-9]/g, "");
  return text ? Number(text) : null;
}

export async function createJob(formData: FormData) {
  const { organization, user } = await requireOrganization();
  const job = await prisma.job.create({
    data: {
      organizationId: organization.id,
      homeownerName: String(formData.get("homeownerName") || "New homeowner"),
      propertyAddress: String(formData.get("propertyAddress") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      county: String(formData.get("county") || ""),
      jobType: String(formData.get("jobType") || "NEW_INSTALL") as JobType,
      estimatedValue: toInt(formData.get("estimatedValue")),
      stage: String(formData.get("stage") || "NEW_INQUIRY") as JobStage,
      soilTestStatus: String(formData.get("soilTestStatus") || "NEEDS_SCHEDULING") as SoilTestStatus,
      soilTestScheduledDate: toDate(formData.get("soilTestScheduledDate")),
      soilTestProvider: String(formData.get("soilTestProvider") || ""),
      soilTestSummary: String(formData.get("soilTestSummary") || ""),
      nextFollowUpDate: toDate(formData.get("nextFollowUpDate")),
      assignedUserId: user.id,
      notes: String(formData.get("notes") || ""),
      checklistItems: {
        create: defaultChecklistItems.map((title, position) => ({ title, position })),
      },
    },
  });
  await prisma.activityLog.create({ data: { organizationId: organization.id, userId: user.id, action: "job_created", subject: job.homeownerName } });
  revalidatePath("/dashboard");
  redirect(`/jobs/${job.id}`);
}

export async function updateJob(jobId: string, formData: FormData) {
  const { organization, user } = await requireOrganization();
  await prisma.job.update({
    where: { id: jobId, organizationId: organization.id },
    data: {
      homeownerName: String(formData.get("homeownerName") || ""),
      propertyAddress: String(formData.get("propertyAddress") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      county: String(formData.get("county") || ""),
      jobType: String(formData.get("jobType") || "NEW_INSTALL") as JobType,
      estimatedValue: toInt(formData.get("estimatedValue")),
      stage: String(formData.get("stage") || "NEW_INQUIRY") as JobStage,
      soilTestStatus: String(formData.get("soilTestStatus") || "NEEDS_SCHEDULING") as SoilTestStatus,
      soilTestScheduledDate: toDate(formData.get("soilTestScheduledDate")),
      soilTestProvider: String(formData.get("soilTestProvider") || ""),
      soilTestSummary: String(formData.get("soilTestSummary") || ""),
      nextFollowUpDate: toDate(formData.get("nextFollowUpDate")),
      notes: String(formData.get("notes") || ""),
    },
  });
  await prisma.activityLog.create({ data: { organizationId: organization.id, userId: user.id, action: "job_updated", subject: jobId } });
  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/jobs");
}

export async function updateJobStage(jobId: string, formData: FormData) {
  const { organization, user } = await requireOrganization();
  const stage = String(formData.get("stage")) as JobStage;
  await prisma.job.update({ where: { id: jobId, organizationId: organization.id }, data: { stage } });
  await prisma.activityLog.create({ data: { organizationId: organization.id, userId: user.id, action: "job_stage_updated", subject: jobId, metadata: stage } });
  revalidatePath("/jobs");
  revalidatePath(`/jobs/${jobId}`);
}

export async function deleteJob(jobId: string) {
  const { organization } = await requireOrganization();
  await prisma.job.delete({ where: { id: jobId, organizationId: organization.id } });
  revalidatePath("/jobs");
  redirect("/jobs");
}
