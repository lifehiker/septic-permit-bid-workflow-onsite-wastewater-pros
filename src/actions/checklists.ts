"use server";

import { ChecklistStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireOrganization } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export async function updateChecklistItem(itemId: string, formData: FormData) {
  const { organization, user } = await requireOrganization();
  const item = await prisma.permitChecklistItem.update({
    where: { id: itemId, job: { organizationId: organization.id } },
    data: { status: String(formData.get("status")) as ChecklistStatus, notes: String(formData.get("notes") || "") },
    include: { job: true },
  });
  if (item.status === "COMPLETE") {
    await prisma.activityLog.create({ data: { organizationId: organization.id, userId: user.id, action: "checklist_item_completed", subject: item.title } });
  }
  revalidatePath(`/jobs/${item.jobId}`);
}

export async function applyCountyTemplateToJob(jobId: string, templateId: string) {
  const { organization, user } = await requireOrganization();
  const template = await prisma.countyTemplate.findFirst({ where: { id: templateId, organizationId: organization.id }, include: { items: true } });
  if (!template) return;
  await prisma.permitChecklistItem.createMany({
    data: template.items.map((item, index) => ({ jobId, title: item.title, section: item.section, position: 100 + index })),
  });
  await prisma.activityLog.create({ data: { organizationId: organization.id, userId: user.id, action: "county_template_applied", subject: template.county } });
  revalidatePath(`/jobs/${jobId}`);
}
