import { JobStage } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { stageLabels } from "@/lib/constants";

export function JobStageBadge({ stage }: { stage: JobStage }) {
  const variant = stage === "PERMIT_APPROVED" || stage === "CLOSED_WON" ? "success" : stage === "COUNTY_REVISIONS_REQUESTED" ? "danger" : stage.includes("PENDING") || stage.includes("INCOMPLETE") ? "warning" : "default";
  return <Badge variant={variant}>{stageLabels[stage]}</Badge>;
}
