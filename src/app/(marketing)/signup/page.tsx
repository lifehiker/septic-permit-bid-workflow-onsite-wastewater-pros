import { signupAction } from "@/actions/auth";
import { MarketingShell } from "@/components/marketing-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";

export default function SignupPage() {
  return (
    <MarketingShell>
      <main className="mx-auto max-w-xl px-4 py-14">
        <Card>
          <CardHeader>
            <CardTitle>Start your 14-day beta trial</CardTitle>
            <p className="text-sm text-[#65706b]">No card required. Create your organization and first job after signup.</p>
          </CardHeader>
          <CardContent>
            <form action={signupAction} className="space-y-4">
              <Field label="Your name"><Input name="name" required /></Field>
              <Field label="Company"><Input name="company" required /></Field>
              <Field label="Email"><Input name="email" type="email" required /></Field>
              <Field label="Password"><Input name="password" type="password" minLength={8} required /></Field>
              <Button className="w-full">Create account</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </MarketingShell>
  );
}
