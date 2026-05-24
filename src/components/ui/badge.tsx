import { cn } from "@/lib/utils";

export function Badge({ className, variant = "default", children }: { className?: string; variant?: "default" | "muted" | "warning" | "success" | "danger"; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variant === "default" && "bg-[#dfe9e4] text-[#205d4a]",
        variant === "muted" && "bg-[#eef1ec] text-[#65706b]",
        variant === "warning" && "bg-[#fff1d6] text-[#8b520d]",
        variant === "success" && "bg-[#dff3e8] text-[#17633f]",
        variant === "danger" && "bg-[#ffe4df] text-[#b42318]",
        className,
      )}
    >
      {children}
    </span>
  );
}
