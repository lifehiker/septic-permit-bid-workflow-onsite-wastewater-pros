import { JobForm } from "@/components/job-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewJobPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">New septic job</h1><p className="text-[#65706b]">Default permit checklist items are added automatically.</p></div>
      <Card><CardHeader><CardTitle>Job details</CardTitle></CardHeader><CardContent><JobForm /></CardContent></Card>
    </div>
  );
}
