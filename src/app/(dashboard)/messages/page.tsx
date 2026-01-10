import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { getConversations, getOrCreateConversation } from "@/lib/actions/messages";
import { ConversationList } from "@/components/messages/conversation-list";
import { DashboardPageHeader } from "@/components/dashboard";
import { MessageCircle } from "lucide-react";

interface MessagesPageProps {
  searchParams: Promise<{ to?: string }>;
}

export default async function MessagesPage({ searchParams }: MessagesPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // If 'to' param is present, create/get conversation and redirect
  if (params.to) {
    const result = await getOrCreateConversation(params.to);
    if (result.success && result.data) {
      const data = result.data as { conversationId: string };
      redirect(`/messages/${data.conversationId}`);
    }
  }

  const conversations = await getConversations();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <DashboardPageHeader
        title="Messages"
        description="Private conversations with other members"
      />

      {conversations.length === 0 ? (
        <div className="text-center py-16">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="font-medium text-lg">No conversations yet</h3>
          <p className="text-muted-foreground mt-1">
            Start a conversation by visiting a member&apos;s profile
          </p>
        </div>
      ) : (
        <ConversationList conversations={conversations} />
      )}
    </div>
  );
}
