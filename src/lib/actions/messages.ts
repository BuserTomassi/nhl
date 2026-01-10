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

  // Use SECURITY DEFINER function to get conversations with participant details
  const { data, error } = await supabase.rpc("get_user_conversations");

  if (error) {
    console.error("[getConversations] Error:", error);
    return [];
  }

  // Transform to match expected format
  return (
    data?.map((conv: {
      conversation_id: string;
      updated_at: string;
      other_user_id: string;
      other_user_name: string | null;
      other_user_avatar: string | null;
      other_user_tier: string | null;
      last_message_text: string | null;
      last_message_at: string | null;
      last_message_is_mine: boolean | null;
    }) => ({
      id: conv.conversation_id,
      updatedAt: conv.updated_at,
      otherUser: {
        id: conv.other_user_id,
        full_name: conv.other_user_name,
        avatar_url: conv.other_user_avatar,
        tier: conv.other_user_tier,
      },
      lastMessage: conv.last_message_text
        ? {
            text: conv.last_message_text,
            createdAt: conv.last_message_at,
            isFromMe: conv.last_message_is_mine,
          }
        : null,
    })) || []
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
    console.log("[getConversation] No user");
    return null;
  }

  // Use SECURITY DEFINER function to get conversation with participant details
  const { data, error } = await supabase.rpc("get_conversation_details", {
    conv_id: conversationId,
  });

  console.log("[getConversation] conv_id:", conversationId, "data:", data, "error:", error);

  if (error || !data || data.length === 0) {
    return null;
  }

  const conv = data[0] as {
    conversation_id: string;
    other_user_id: string;
    other_user_name: string | null;
    other_user_avatar: string | null;
    other_user_tier: string | null;
    other_user_title: string | null;
    other_user_company: string | null;
  };

  return {
    id: conv.conversation_id,
    otherUser: {
      id: conv.other_user_id,
      full_name: conv.other_user_name,
      avatar_url: conv.other_user_avatar,
      tier: conv.other_user_tier,
      title: conv.other_user_title,
      company: conv.other_user_company,
    },
  };
}
