import { ChecklistStatus, PermitChecklistItem } from "@prisma/client";
import { updateChecklistItem } from "@/actions/checklists";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, Textarea } from "@/components/ui/field";
import { checklistStatusLabels } from "@/lib/constants";

export function PermitChecklist({ items }: { items: PermitChecklistItem[] }) {
  const done = items.filter((item) => item.status === "COMPLETE" || item.status === "NOT_APPLICABLE").length;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Permit checklist</h2>
          <p className="text-sm text-[#65706b]">{done} of {items.length} items complete or not applicable</p>
        </div>
        <Badge variant={done === items.length ? "success" : "warning"}>{done === items.length ? "Packet ready" : "Packet incomplete"}</Badge>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <form key={item.id} action={updateChecklistItem.bind(null, item.id)} className="grid gap-3 rounded-md border border-[#d9ded6] bg-white p-3 md:grid-cols-[1fr_180px_1fr_auto]">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-[#65706b]">{item.section}</p>
            </div>
            <Select name="status" defaultValue={item.status}>
              {Object.values(ChecklistStatus).map((status) => <option key={status} value={status}>{checklistStatusLabels[status]}</option>)}
            </Select>
            <Textarea name="notes" defaultValue={item.notes ?? ""} className="min-h-10" placeholder="Notes" />
            <Button size="sm">Save</Button>
          </form>
        ))}
      </div>
    </div>
  );
}
