import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TierBadge } from "@/components/dashboard/tier-badge";
import { formatDistanceToNow } from "date-fns";

interface ConversationListProps {
  conversations: Array<{
    id: string;
    updatedAt: string;
    otherUser: {
      id: string;
      full_name: string | null;
      avatar_url: string | null;
      tier: "silver" | "gold" | "platinum" | "diamond";
    } | null;
    lastMessage: {
      text: string;
      createdAt: string;
      isFromMe: boolean;
    } | null;
  }>;
}

export function ConversationList({ conversations }: ConversationListProps) {
  return (
    <div className="space-y-2">
      {conversations.map((conv) => {
        const initials = conv.otherUser?.full_name
          ? conv.otherUser.full_name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
          : "?";

        return (
          <Link key={conv.id} href={`/messages/${conv.id}`}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conv.otherUser?.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">
                        {conv.otherUser?.full_name || "Member"}
                      </h3>
                      {conv.otherUser?.tier && (
                        <TierBadge
                          tier={conv.otherUser.tier}
                          size="sm"
                          showIcon={false}
                        />
                      )}
                    </div>
                    {conv.lastMessage && (
                      <p className="text-sm text-muted-foreground truncate">
                        {conv.lastMessage.isFromMe && "You: "}
                        {conv.lastMessage.text}
                      </p>
                    )}
                  </div>

                  {conv.lastMessage && (
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatDistanceToNow(new Date(conv.lastMessage.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
