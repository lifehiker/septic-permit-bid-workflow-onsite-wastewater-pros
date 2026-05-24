import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "default" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
};

export function Button({ className, variant = "default", size = "md", asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-[#205d4a] disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-[#205d4a] text-white hover:bg-[#184b3b]",
        variant === "secondary" && "bg-[#e5eadf] text-[#16211d] hover:bg-[#d8dfd1]",
        variant === "outline" && "border border-[#c9d0c6] bg-white hover:bg-[#f4f6f2]",
        variant === "ghost" && "hover:bg-[#edf1ea]",
        variant === "danger" && "bg-[#b42318] text-white hover:bg-[#971d14]",
        size === "sm" && "h-8 px-3 text-sm",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-12 px-5",
        size === "icon" && "h-9 w-9",
        className,
      )}
      {...props}
    />
  );
}
