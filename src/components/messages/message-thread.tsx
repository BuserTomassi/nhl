"use client";

import { useState, useEffect, useRef, useTransition, useMemo } from "react";
import { sendMessage } from "@/lib/actions/messages";
import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { Send, Loader2 } from "lucide-react";
import type { Message } from "@/lib/supabase/types";

interface MessageWithSender extends Message {
  sender: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
}

interface MessageThreadProps {
  conversationId: string;
  initialMessages: MessageWithSender[];
  currentUserId: string;
}

export function MessageThread({
  conversationId,
  initialMessages,
  currentUserId,
}: MessageThreadProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Memoize the Supabase client to prevent creating new instances on every render
  const supabase = useMemo(() => createClient(), []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Subscribe to real-time messages
  useEffect(() => {
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          // Fetch the full message with sender
          const { data } = await supabase
            .from("messages")
            .select(
              `
              *,
              sender:profiles!messages_sender_id_fkey(id, full_name, avatar_url)
            `
            )
            .eq("id", payload.new.id)
            .single();

          if (data) {
            setMessages((prev) => [...prev, data as MessageWithSender]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, supabase]); // supabase is memoized, so this only re-runs when conversationId changes

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageText = newMessage;
    setNewMessage("");

    startTransition(async () => {
      const content = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: messageText }],
          },
        ],
      };
      await sendMessage(conversationId, content, messageText);
    });
  };

  return (
    <>
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No messages yet. Say hello!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isMe = message.sender_id === currentUserId;
            const initials = message.sender.full_name
              ? message.sender.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)
              : "?";

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={message.sender.avatar_url || undefined} />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div
                  className={`max-w-[70%] ${
                    isMe ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      isMe
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content_text}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {formatDistanceToNow(new Date(message.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={handleSend} className="pt-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="min-h-[44px] max-h-32 resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isPending || !newMessage.trim()}
            className="shrink-0 h-11 w-11"
            aria-label="Send message"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
