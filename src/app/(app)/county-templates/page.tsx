import { createCountyTemplate, deleteCountyTemplate, updateCountyTemplate } from "@/actions/county-templates";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/field";
import { requireOrganization } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export default async function CountyTemplatesPage() {
  const { organization } = await requireOrganization();
  const templates = await prisma.countyTemplate.findMany({ where: { organizationId: organization.id }, include: { items: { orderBy: { position: "asc" } } }, orderBy: { county: "asc" } });
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">County requirement templates</h1><p className="text-[#65706b]">Reusable permit checklist items for counties you work in repeatedly.</p></div>
      <Card><CardHeader><CardTitle>Create template</CardTitle></CardHeader><CardContent><form action={createCountyTemplate} className="grid gap-4 md:grid-cols-2"><Field label="County"><Input name="county" required /></Field><Field label="Description"><Input name="description" /></Field><div className="md:col-span-2"><Field label="Checklist items, one per line"><Textarea name="items" required placeholder="County supplemental form&#10;Permit fee receipt&#10;Setback worksheet" /></Field></div><Button>Create template</Button></form></CardContent></Card>
      <div className="grid gap-4 lg:grid-cols-2">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader><CardTitle>{template.county} County</CardTitle><p className="text-sm text-[#65706b]">{template.description || "No description"}</p></CardHeader>
            <CardContent>
              <form action={updateCountyTemplate.bind(null, template.id)} className="space-y-3">
                <Field label="County"><Input name="county" defaultValue={template.county} /></Field>
                <Field label="Description"><Input name="description" defaultValue={template.description ?? ""} /></Field>
                <Field label="Checklist items"><Textarea name="items" defaultValue={template.items.map((item) => item.title).join("\n")} /></Field>
                <div className="flex gap-2"><Button size="sm">Save</Button><Button formAction={deleteCountyTemplate.bind(null, template.id)} variant="danger" size="sm">Delete</Button></div>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
