import Link from "next/link";
import { ClipboardCheck, ClipboardList, CreditCard, LayoutDashboard, LogOut, MapPinned } from "lucide-react";
import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/jobs", label: "Jobs", icon: ClipboardList },
  { href: "/county-templates", label: "County templates", icon: MapPinned },
  { href: "/settings/billing", label: "Billing", icon: CreditCard },
];

export function AppShell({ children, organizationName }: { children: React.ReactNode; organizationName: string }) {
  return (
    <div className="min-h-screen bg-[#f7f4ee]">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[#d9ded6] bg-[#fffdf8] p-5 lg:block">
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-[#205d4a] text-white"><ClipboardCheck size={19} /></span>
          SepticPermitCRM
        </Link>
        <p className="mt-2 text-sm text-[#65706b]">{organizationName}</p>
        <nav className="mt-8 space-y-1">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-[#eef1ec]">
              <item.icon size={17} />
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="absolute bottom-5 left-5 right-5">
          <Button variant="outline" className="w-full"><LogOut size={16} /> Sign out</Button>
        </form>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-[#d9ded6] bg-[#fffdf8]/95 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="font-bold">SepticPermitCRM</Link>
            <form action={logoutAction}><Button variant="ghost" size="sm">Sign out</Button></form>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 text-sm">
            {nav.map((item) => <Link className="whitespace-nowrap rounded-md border border-[#d9ded6] px-3 py-1.5" key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
