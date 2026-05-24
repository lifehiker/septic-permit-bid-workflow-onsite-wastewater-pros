import Link from "next/link";
import { ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f4ee]">
      <header className="border-b border-[#d9ded6] bg-[#fffdf8]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold"><span className="grid h-9 w-9 place-items-center rounded-md bg-[#205d4a] text-white"><ClipboardCheck size={18} /></span> SepticPermitCRM</Link>
          <nav className="hidden items-center gap-5 text-sm md:flex">
            <Link href="/septic-permit-tracking-software">Permit tracking</Link>
            <Link href="/septic-installer-crm">CRM</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>
          <div className="flex items-center gap-2"><Button asChild variant="ghost"><Link href="/login">Login</Link></Button><Button asChild><Link href="/signup">Start trial</Link></Button></div>
        </div>
      </header>
      {children}
    </div>
  );
}
