import { DocumentType, JobDocument } from "@prisma/client";
import { ExternalLink, Trash2 } from "lucide-react";
import { addJobDocument, deleteJobDocument } from "@/actions/documents";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/field";
import { documentTypeLabels } from "@/lib/constants";

export function DocumentLinks({ jobId, documents }: { jobId: string; documents: JobDocument[] }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Document links</h2>
        <p className="text-sm text-[#65706b]">Store Drive, Dropbox, county portal, and proposal URLs without managing files.</p>
      </div>
      <form action={addJobDocument.bind(null, jobId)} className="grid gap-3 rounded-md border border-[#d9ded6] bg-[#f9faf6] p-3 md:grid-cols-[1fr_1fr_180px_auto]">
        <Field label="Name"><Input name="name" required placeholder="Soil report PDF" /></Field>
        <Field label="URL"><Input name="url" required type="url" placeholder="https://..." /></Field>
        <Field label="Type"><Select name="type">{Object.values(DocumentType).map((type) => <option key={type} value={type}>{documentTypeLabels[type]}</option>)}</Select></Field>
        <div className="flex items-end"><Button>Add link</Button></div>
      </form>
      <div className="space-y-2">
        {documents.map((document) => (
          <div key={document.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-[#d9ded6] bg-white p-3">
            <div>
              <a href={document.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-medium hover:underline">{document.name}<ExternalLink size={14} /></a>
              <p className="text-xs text-[#65706b]">{documentTypeLabels[document.type]}</p>
            </div>
            <form action={deleteJobDocument.bind(null, document.id, jobId)}><Button variant="ghost" size="icon" aria-label="Delete document"><Trash2 size={16} /></Button></form>
          </div>
        ))}
        {documents.length === 0 && <p className="rounded-md border border-dashed border-[#cfd6cc] p-4 text-sm text-[#65706b]">No document links yet.</p>}
      </div>
    </div>
  );
}
