import { ChecklistStatus, DocumentType, JobStage, JobType, SoilTestStatus } from "@prisma/client";

export const stageLabels: Record<JobStage, string> = {
  NEW_INQUIRY: "New inquiry",
  SITE_VISIT_SCHEDULED: "Site visit scheduled",
  SOIL_TEST_PENDING: "Soil/perc test pending",
  DESIGN_DRAWINGS_NEEDED: "Design/drawings needed",
  PERMIT_PACKET_INCOMPLETE: "Permit packet incomplete",
  SUBMITTED_TO_COUNTY: "Submitted to county",
  COUNTY_REVISIONS_REQUESTED: "County revisions requested",
  PERMIT_APPROVED: "Permit approved",
  INSTALL_SCHEDULED: "Install scheduled",
  CLOSED_WON: "Closed won",
  CLOSED_LOST: "Closed lost",
};

export const jobTypeLabels: Record<JobType, string> = {
  NEW_INSTALL: "New install",
  REPLACEMENT: "Replacement",
  REPAIR: "Repair",
  DESIGN_ONLY: "Design-only",
  INSPECTION_SUPPORT: "Inspection support",
};

export const soilStatusLabels: Record<SoilTestStatus, string> = {
  NOT_REQUIRED: "Not required",
  NEEDS_SCHEDULING: "Needs scheduling",
  SCHEDULED: "Scheduled",
  COMPLETED: "Completed",
  REPORT_RECEIVED: "Report received",
};

export const checklistStatusLabels: Record<ChecklistStatus, string> = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  COMPLETE: "Complete",
  NOT_APPLICABLE: "Not applicable",
};

export const documentTypeLabels: Record<DocumentType, string> = {
  SOIL_REPORT: "Soil report",
  SITE_PLAN: "Site plan",
  DESIGN_DRAWING: "Design drawing",
  APPLICATION_FORM: "Application form",
  PROPOSAL: "Proposal",
  OTHER: "Other",
};

export const defaultChecklistItems = [
  "Homeowner/application form",
  "Site plan",
  "Soil/perc report",
  "System design/drawings",
  "Installer/designer license info",
  "Fee/payment confirmation",
  "County-specific supplemental forms",
  "Revision response",
];

export const pricingTiers = [
  { id: "solo", name: "Solo", price: 79, users: "1 user", templates: "5 county templates", priceEnv: "STRIPE_PRICE_SOLO" },
  { id: "team", name: "Team", price: 149, users: "Up to 5 users", templates: "25 county templates", priceEnv: "STRIPE_PRICE_TEAM" },
  { id: "pro", name: "Pro", price: 249, users: "Up to 15 users", templates: "Unlimited templates", priceEnv: "STRIPE_PRICE_PRO" },
];
