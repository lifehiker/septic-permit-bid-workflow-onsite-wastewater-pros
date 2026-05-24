import { AppShell } from "@/components/app-shell";
import { requireOrganization } from "@/lib/auth-helpers";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { organization } = await requireOrganization({ allowBilling: true });
  return <AppShell organizationName={organization.name}>{children}</AppShell>;
}
