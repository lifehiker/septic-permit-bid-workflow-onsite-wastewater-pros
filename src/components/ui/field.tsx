import * as React from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("block text-sm font-medium text-[#26352f]", className)} {...props} />;
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("h-10 w-full rounded-md border border-[#cbd4ca] bg-white px-3 text-sm outline-none focus:border-[#205d4a] focus:ring-2 focus:ring-[#205d4a]/15", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("min-h-24 w-full rounded-md border border-[#cbd4ca] bg-white px-3 py-2 text-sm outline-none focus:border-[#205d4a] focus:ring-2 focus:ring-[#205d4a]/15", className)} {...props} />;
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn("h-10 w-full rounded-md border border-[#cbd4ca] bg-white px-3 text-sm outline-none focus:border-[#205d4a] focus:ring-2 focus:ring-[#205d4a]/15", className)} {...props}>{children}</select>;
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
