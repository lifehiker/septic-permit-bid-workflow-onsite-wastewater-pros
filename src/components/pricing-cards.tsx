import { Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingTiers } from "@/lib/constants";

export function PricingCards({ billing = false }: { billing?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {pricingTiers.map((tier) => (
        <Card key={tier.id} className={tier.id === "team" ? "border-[#205d4a] shadow-md" : ""}>
          <CardHeader>
            <CardTitle>{tier.name}</CardTitle>
            <p className="text-3xl font-bold">${tier.price}<span className="text-sm font-normal text-[#65706b]">/month</span></p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              {[tier.users, "Unlimited jobs", "Septic-specific pipeline", "Soil/perc test tracking", "Daily follow-up reminders", tier.templates, "Permit packet export"].map((item) => (
                <li key={item} className="flex gap-2"><Check size={16} className="mt-0.5 text-[#205d4a]" /> {item}</li>
              ))}
            </ul>
            {billing ? (
              <form action="/api/stripe/checkout" method="post">
                <input type="hidden" name="tier" value={tier.id} />
                <Button className="w-full"><CreditCard size={16} /> Start checkout</Button>
              </form>
            ) : (
              <Button asChild className="w-full"><a href="/signup">Start 14-day trial</a></Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
