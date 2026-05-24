"use server";

import { revalidatePath } from "next/cache";
import { requireOrganization } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

function lines(value: FormDataEntryValue | null) {
  return String(value || "").split("\n").map((line) => line.trim()).filter(Boolean);
}

export async function createCountyTemplate(formData: FormData) {
  const { organization, user } = await requireOrganization();
  const county = String(formData.get("county") || "").trim();
  const items = lines(formData.get("items"));
  if (!county || items.length === 0) return;
  await prisma.countyTemplate.create({
    data: {
      organizationId: organization.id,
      county,
      description: String(formData.get("description") || ""),
      items: { create: items.map((title, position) => ({ title, position })) },
    },
  });
  await prisma.activityLog.create({ data: { organizationId: organization.id, userId: user.id, action: "county_template_created", subject: county } });
  revalidatePath("/county-templates");
}

export async function updateCountyTemplate(templateId: string, formData: FormData) {
  const { organization } = await requireOrganization();
  const items = lines(formData.get("items"));
  await prisma.$transaction([
    prisma.countyTemplate.update({ where: { id: templateId, organizationId: organization.id }, data: { county: String(formData.get("county") || ""), description: String(formData.get("description") || "") } }),
    prisma.countyTemplateItem.deleteMany({ where: { templateId } }),
    prisma.countyTemplateItem.createMany({ data: items.map((title, position) => ({ templateId, title, position })) }),
  ]);
  revalidatePath("/county-templates");
}

export async function deleteCountyTemplate(templateId: string) {
  const { organization } = await requireOrganization();
  await prisma.countyTemplate.delete({ where: { id: templateId, organizationId: organization.id } });
  revalidatePath("/county-templates");
}
