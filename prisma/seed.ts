import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { defaultChecklistItems } from "../src/lib/constants";

const prisma = new PrismaClient();

async function main() {
  const email = "demo@septicpermitcrm.test";
  const passwordHash = await hash("demo-password", 12);
  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, name: "Demo Owner", passwordHash },
  });
  const organization = await prisma.organization.create({
    data: {
      name: "Clearwater Onsite Wastewater",
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      memberships: { create: { userId: user.id, role: "OWNER" } },
      subscriptions: { create: { tier: "Beta trial", status: "TRIALING" } },
    },
  });
  const template = await prisma.countyTemplate.create({
    data: {
      organizationId: organization.id,
      county: "Wake",
      description: "Common packet requirements for Wake County jobs.",
      items: { create: ["County supplemental form", "Setback worksheet", "Permit fee receipt"].map((title, position) => ({ title, position })) },
    },
  });
  const jobs = [
    { homeownerName: "Mara Jensen", propertyAddress: "1840 Cedar Ridge Rd", county: "Wake", stage: "SOIL_TEST_PENDING" as const, estimatedValue: 18500, nextFollowUpDate: new Date() },
    { homeownerName: "Luis Ortega", propertyAddress: "92 North Mill Lane", county: "Orange", stage: "PERMIT_PACKET_INCOMPLETE" as const, estimatedValue: 24000, nextFollowUpDate: new Date(Date.now() - 86400000) },
    { homeownerName: "Kim Patel", propertyAddress: "710 Briar Hollow", county: "Durham", stage: "COUNTY_REVISIONS_REQUESTED" as const, estimatedValue: 9500, nextFollowUpDate: new Date(Date.now() + 86400000) },
  ];
  for (const jobData of jobs) {
    await prisma.job.create({
      data: {
        ...jobData,
        organizationId: organization.id,
        jobType: "REPLACEMENT",
        soilTestStatus: "SCHEDULED",
        soilTestProvider: "Triangle Soil Services",
        notes: "Demo job created for screenshots and workflow smoke tests.",
        assignedUserId: user.id,
        checklistItems: { create: defaultChecklistItems.map((title, position) => ({ title, position, status: position < 2 ? "COMPLETE" : "NOT_STARTED" })) },
        documents: { create: [{ name: "Shared permit folder", url: "https://drive.google.com/", type: "OTHER" }] },
      },
    });
  }
  await prisma.activityLog.create({ data: { organizationId: organization.id, userId: user.id, action: "county_template_created", subject: template.county } });
}

main().finally(async () => prisma.$disconnect());
