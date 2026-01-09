"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { Json } from "@/lib/supabase/types";

// ============================================================================
// TYPES
// ============================================================================

export interface MessageResult {
  success: boolean;
  error?: string;
  data?: unknown;
}

// ============================================================================
// CONVERSATIONS
// ============================================================================

/**
 * Get all conversations for the current user
 */
export async function getConversations() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  // Get conversations the user is part of
  const { data: participations } = await supabase
    .from("conversation_participants")
    .select("conversation_id")
    .eq("profile_id", user.id);

  if (!participations || participations.length === 0) {
    return [];
  }

  const conversationIds = participations.map((p) => p.conversation_id);

  // Get conversations with other participants and last message
  const { data: conversations } = await supabase
    .from("conversations")
    .select(
      `
      *,
      participants:conversation_participants(
        profile:profiles(id, full_name, avatar_url, tier)
      ),
      messages(id, content_text, created_at, sender_id)
    `
    )
    .in("id", conversationIds)
    .order("updated_at", { ascending: false });

  // Transform to include other participant and last message
  return (
    conversations?.map((conv) => {
      const otherParticipant = conv.participants.find(
        (p: { profile: { id: string } }) => p.profile.id !== user.id
      );
      const lastMessage = conv.messages?.[conv.messages.length - 1];

      return {
        id: conv.id,
        updatedAt: conv.updated_at,
        otherUser: otherParticipant?.profile || null,
        lastMessage: lastMessage
          ? {
              text: lastMessage.content_text,
              createdAt: lastMessage.created_at,
              isFromMe: lastMessage.sender_id === user.id,
            }
          : null,
      };
    }) || []
  );
}

/**
 * Get or create a conversation with another user
 */
export async function getOrCreateConversation(
  otherUserId: string
): Promise<MessageResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  if (otherUserId === user.id) {
    return { success: false, error: "Cannot message yourself" };
  }

  // Check if conversation already exists
  const { data: myConvs } = await supabase
    .from("conversation_participants")
    .select("conversation_id")
    .eq("profile_id", user.id);

  const { data: theirConvs } = await supabase
    .from("conversation_participants")
    .select("conversation_id")
    .eq("profile_id", otherUserId);

  const myConvIds = new Set(myConvs?.map((c) => c.conversation_id) || []);
  const existingConv = theirConvs?.find((c) => myConvIds.has(c.conversation_id));

  if (existingConv) {
    return { success: true, data: { conversationId: existingConv.conversation_id } };
  }

  // Create new conversation
  const { data: newConv, error: convError } = await supabase
    .from("conversations")
    .insert({})
    .select()
    .single();

  if (convError) {
    return { success: false, error: convError.message };
  }

  // Add participants
  const { error: partError } = await supabase
    .from("conversation_participants")
    .insert([
      { conversation_id: newConv.id, profile_id: user.id },
      { conversation_id: newConv.id, profile_id: otherUserId },
    ]);

  if (partError) {
    return { success: false, error: partError.message };
  }

  return { success: true, data: { conversationId: newConv.id } };
}

/**
 * Get messages for a conversation
 */
export async function getMessages(conversationId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("messages")
    .select(
      `
      *,
      sender:profiles!messages_sender_id_fkey(id, full_name, avatar_url)
    `
    )
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  return data || [];
}

/**
 * Send a message
 */
export async function sendMessage(
  conversationId: string,
  content: Json,
  contentText: string
): Promise<MessageResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  // Verify user is in conversation
  const { data: participation } = await supabase
    .from("conversation_participants")
    .select("id")
    .eq("conversation_id", conversationId)
    .eq("profile_id", user.id)
    .single();

  if (!participation) {
    return { success: false, error: "Not authorized" };
  }

  const { error } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    sender_id: user.id,
    content,
    content_text: contentText,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/messages");

  return { success: true };
}

/**
 * Get conversation details
 */
export async function getConversation(conversationId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from("conversations")
    .select(
      `
      *,
      participants:conversation_participants(
        profile:profiles(id, full_name, avatar_url, tier, title, company)
      )
    `
    )
    .eq("id", conversationId)
    .single();

  if (!data) {
    return null;
  }

  const otherParticipant = data.participants.find(
    (p: { profile: { id: string } }) => p.profile.id !== user.id
  );

  return {
    id: data.id,
    otherUser: otherParticipant?.profile || null,
  };
}
