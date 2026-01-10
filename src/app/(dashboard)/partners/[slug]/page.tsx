import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Mail,
  CheckCircle2,
  Globe,
} from "lucide-react";

const categoryLabels = {
  search_firm: "Executive Search",
  ai_vendor: "AI & Technology",
  consultant: "Consulting",
};

interface PartnerDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PartnerDetailPage({
  params,
}: PartnerDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: partner } = await supabase
    .from("partners")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!partner) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back link */}
      <Link
        href="/partners"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Partners
      </Link>

      <Card>
        <CardContent className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Logo */}
            <div className="shrink-0 w-24 h-24 rounded-xl bg-muted flex items-center justify-center overflow-hidden">
              {partner.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-muted-foreground">
                  {partner.name.charAt(0)}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold">{partner.name}</h1>
                {partner.is_verified && (
                  <div className="flex items-center gap-1 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                )}
                {partner.is_featured && (
                  <Badge variant="secondary">Featured Partner</Badge>
                )}
              </div>

              <Badge className="mt-2">
                {categoryLabels[partner.category]}
              </Badge>

              {/* Contact actions */}
              <div className="flex gap-3 mt-4">
                {partner.website_url && (
                  <a
                    href={partner.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button>
                      <Globe className="mr-2 h-4 w-4" />
                      Visit Website
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </a>
                )}
                {partner.contact_email && (
                  <a href={`mailto:${partner.contact_email}`}>
                    <Button variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {partner.description && (
            <div className="mt-8">
              <h2 className="font-semibold mb-3">About</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {partner.description}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
