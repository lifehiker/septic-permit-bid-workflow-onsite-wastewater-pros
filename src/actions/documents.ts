"use server";

import { DocumentType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireOrganization } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export async function addJobDocument(jobId: string, formData: FormData) {
  const { organization } = await requireOrganization();
  const job = await prisma.job.findFirst({ where: { id: jobId, organizationId: organization.id } });
  if (!job) return;
  await prisma.jobDocument.create({
    data: {
      jobId,
      name: String(formData.get("name") || "Document"),
      url: String(formData.get("url") || ""),
      type: String(formData.get("type") || "OTHER") as DocumentType,
    },
  });
  revalidatePath(`/jobs/${jobId}`);
}

export async function deleteJobDocument(documentId: string, jobId: string) {
  const { organization } = await requireOrganization();
  await prisma.jobDocument.delete({ where: { id: documentId, job: { organizationId: organization.id } } });
  revalidatePath(`/jobs/${jobId}`);
}
