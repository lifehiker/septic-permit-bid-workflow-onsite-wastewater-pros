import { loginAction } from "@/actions/auth";
import { MarketingShell } from "@/components/marketing-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";

export default function LoginPage() {
  return (
    <MarketingShell>
      <main className="mx-auto max-w-md px-4 py-14">
        <Card>
          <CardHeader><CardTitle>Log in</CardTitle></CardHeader>
          <CardContent>
            <form action={loginAction} className="space-y-4">
              <Field label="Email"><Input name="email" type="email" required /></Field>
              <Field label="Password"><Input name="password" type="password" required /></Field>
              <Button className="w-full">Log in</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </MarketingShell>
  );
}
