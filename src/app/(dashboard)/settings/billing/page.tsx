import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TierBadge } from "@/components/dashboard/tier-badge";
import { isStripeConfigured } from "@/lib/stripe";
import { Check, CreditCard, Sparkles } from "lucide-react";

export default async function BillingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/auth/login");
  }

  const stripeEnabled = isStripeConfigured();
  const isPaidTier = ["gold", "platinum", "diamond"].includes(profile.tier);

  return (
    <div className="space-y-6">
      {/* Current plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <TierBadge tier={profile.tier} size="lg" />
                <span className="font-medium">Membership</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {isPaidTier
                  ? "You have full access to NHL features"
                  : "Upgrade to unlock more features"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade options (only for Silver tier) */}
      {profile.tier === "silver" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Upgrade to Gold
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stripeEnabled ? (
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Get full access to the NHL community with a Gold membership.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <PricingCard
                    name="Monthly"
                    price="$49"
                    period="/month"
                    features={[
                      "Full community access",
                      "All events",
                      "Resource library",
                      "Partner directory",
                      "Member networking",
                    ]}
                  />
                  <PricingCard
                    name="Annual"
                    price="$470"
                    period="/year"
                    badge="Save 20%"
                    features={[
                      "Full community access",
                      "All events",
                      "Resource library",
                      "Partner directory",
                      "Member networking",
                      "Priority support",
                    ]}
                    highlighted
                  />
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  Platinum and Diamond memberships are invite-only.
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  Payment processing is not yet configured.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Contact us to upgrade your membership.
                </p>
                <Button className="mt-4" asChild>
                  <a href="mailto:hello@nexthorizonleadership.com">
                    Contact Us
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Payment history placeholder */}
      {isPaidTier && (
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Your membership is managed by NHL administration.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function PricingCard({
  name,
  price,
  period,
  badge,
  features,
  highlighted,
}: {
  name: string;
  price: string;
  period: string;
  badge?: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`relative rounded-xl border p-6 ${
        highlighted ? "border-primary bg-primary/5" : ""
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
          {badge}
        </span>
      )}
      <div className="text-center mb-4">
        <h3 className="font-medium">{name}</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-primary shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        className={`w-full ${highlighted ? "" : "variant-outline"}`}
        variant={highlighted ? "default" : "outline"}
        disabled
      >
        Coming Soon
      </Button>
    </div>
  );
}
