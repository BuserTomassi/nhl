import { redirect, notFound } from "next/navigation";
export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { getConversation, getMessages } from "@/lib/actions/messages";
import { MessageThread } from "@/components/messages/message-thread";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TierBadge } from "@/components/dashboard/tier-badge";
import type { MembershipTier } from "@/lib/supabase/types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ConversationPageProps {
  params: Promise<{ conversationId: string }>;
}

export default async function ConversationPage({ params }: ConversationPageProps) {
  const { conversationId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const conversation = await getConversation(conversationId);

  if (!conversation) {
    notFound();
  }

  const messages = await getMessages(conversationId);

  const otherUser = conversation.otherUser;
  const initials = otherUser?.full_name
    ? otherUser.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b">
        <Link
          href="/messages"
          className="lg:hidden p-2 hover:bg-muted rounded-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <Avatar className="h-10 w-10">
          <AvatarImage src={otherUser?.avatar_url || undefined} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold truncate">
              {otherUser?.full_name || "Member"}
            </h1>
            {otherUser?.tier && (
              <TierBadge tier={otherUser.tier as MembershipTier} size="sm" showIcon={false} />
            )}
          </div>
          {(otherUser?.title || otherUser?.company) && (
            <p className="text-sm text-muted-foreground truncate">
              {[otherUser?.title, otherUser?.company].filter(Boolean).join(" at ")}
            </p>
          )}
        </div>

        <Link
          href={`/members/${otherUser?.id}`}
          className="text-sm text-primary hover:underline"
        >
          View Profile
        </Link>
      </div>

      {/* Messages */}
      <MessageThread
        conversationId={conversationId}
        initialMessages={messages}
        currentUserId={user.id}
      />
    </div>
  );
}
