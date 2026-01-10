import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
import { ResourceCard } from "@/components/resources/resource-card";
import { DashboardPageHeader } from "@/components/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";
import type { ResourceType } from "@/lib/supabase/types";

interface ResourcesPageProps {
  searchParams: Promise<{ type?: ResourceType }>;
}

export default async function ResourcesPage({ searchParams }: ResourcesPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  // Get resources
  let query = supabase
    .from("resources")
    .select(
      `
      *,
      created_by:profiles!resources_created_by_fkey(id, full_name, avatar_url)
    `
    )
    .order("created_at", { ascending: false });

  if (params.type) {
    query = query.eq("type", params.type);
  }

  const { data: resources } = await query;

  // Group by type
  const documents = resources?.filter((r) => r.type === "document") || [];
  const videos = resources?.filter((r) => r.type === "video") || [];
  const templates = resources?.filter((r) => r.type === "template") || [];
  const links = resources?.filter((r) => r.type === "link") || [];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <DashboardPageHeader
        title="Resource Library"
        description="Access exclusive content, templates, and learning materials curated for leaders."
      />

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({resources?.length || 0})</TabsTrigger>
          <TabsTrigger value="documents">
            Documents ({documents.length})
          </TabsTrigger>
          <TabsTrigger value="videos">Videos ({videos.length})</TabsTrigger>
          <TabsTrigger value="templates">
            Templates ({templates.length})
          </TabsTrigger>
          <TabsTrigger value="links">Links ({links.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <ResourceGrid resources={resources || []} />
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <ResourceGrid resources={documents} />
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <ResourceGrid resources={videos} />
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <ResourceGrid resources={templates} />
        </TabsContent>

        <TabsContent value="links" className="mt-6">
          <ResourceGrid resources={links} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ResourceGrid({ resources }: { resources: unknown[] }) {
  if (resources.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
        <p className="text-muted-foreground">No resources found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource: unknown) => (
        <ResourceCard key={(resource as { id: string }).id} resource={resource as Parameters<typeof ResourceCard>[0]['resource']} />
      ))}
    </div>
  );
}
