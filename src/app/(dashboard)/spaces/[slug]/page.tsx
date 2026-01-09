import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { getSpacePosts, isSpaceMember } from "@/lib/actions/spaces";
import { PostCard } from "@/components/spaces/post-card";
import { PostComposer } from "@/components/spaces/post-composer";
import { JoinSpaceButton } from "@/components/spaces/join-space-button";
import { TierBadge } from "@/components/dashboard/tier-badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Users, MessageSquare, Lock } from "lucide-react";

interface SpaceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SpaceDetailPage({ params }: SpaceDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // Get space
  const { data: space } = await supabase
    .from("spaces")
    .select(
      `
      *,
      created_by:profiles!spaces_created_by_fkey(id, full_name, avatar_url)
    `
    )
    .eq("slug", slug)
    .single();

  if (!space) {
    notFound();
  }

  // Check membership
  const isMember = await isSpaceMember(space.id);

  // Get posts
  const { data: posts } = await getSpacePosts(space.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/spaces"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Spaces
      </Link>

      {/* Space header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-3xl">
              {space.icon || "💬"}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold">{space.name}</h1>
                {space.visibility === "private" && (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                )}
                {space.tier_required !== "silver" && (
                  <TierBadge tier={space.tier_required} />
                )}
              </div>

              {space.description && (
                <p className="mt-2 text-muted-foreground">{space.description}</p>
              )}

              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {space.member_count} members
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {space.post_count} posts
                </span>
              </div>
            </div>

            <JoinSpaceButton spaceId={space.id} isMember={isMember} />
          </div>
        </CardContent>
      </Card>

      {/* Post composer (if member) */}
      {isMember && <PostComposer spaceId={space.id} />}

      {/* Posts feed */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">No posts yet</p>
              {isMember ? (
                <p className="text-sm mt-1">Be the first to start a discussion!</p>
              ) : (
                <p className="text-sm mt-1">Join this space to start posting</p>
              )}
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
