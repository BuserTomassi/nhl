"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Json } from "@/lib/supabase/types";

// ============================================================================
// SCHEMAS
// ============================================================================

const createSpaceSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100),
  description: z.string().max(500).optional(),
  icon: z.string().max(10).optional(),
});

const createPostSchema = z.object({
  spaceId: z.string().uuid(),
  title: z.string().max(200).optional(),
  content: z.any(), // TipTap JSON
  contentText: z.string(),
});

// ============================================================================
// TYPES
// ============================================================================

export interface SpaceResult {
  success: boolean;
  error?: string;
  message?: string;
  data?: unknown;
}

// ============================================================================
// GET SPACES
// ============================================================================

/**
 * Get all spaces the current user can access
 */
export async function getSpaces() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("spaces")
    .select("*")
    .eq("is_archived", false)
    .order("name");

  if (error) {
    return { data: [], error: error.message };
  }

  return { data, error: null };
}

/**
 * Get a single space by slug
 */
export async function getSpaceBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("spaces")
    .select(
      `
      *,
      created_by:profiles!spaces_created_by_fkey(id, full_name, avatar_url)
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    return null;
  }

  return data;
}

// ============================================================================
// JOIN / LEAVE SPACE
// ============================================================================

/**
 * Join a space
 */
export async function joinSpace(spaceId: string): Promise<SpaceResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { error } = await supabase.from("space_members").insert({
    space_id: spaceId,
    profile_id: user.id,
  });

  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "Already a member of this space" };
    }
    return { success: false, error: error.message };
  }

  revalidatePath("/spaces");

  return { success: true, message: "Joined space successfully" };
}

/**
 * Leave a space
 */
export async function leaveSpace(spaceId: string): Promise<SpaceResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("space_members")
    .delete()
    .eq("space_id", spaceId)
    .eq("profile_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/spaces");

  return { success: true, message: "Left space successfully" };
}

// ============================================================================
// CHECK MEMBERSHIP
// ============================================================================

/**
 * Check if current user is a member of a space
 */
export async function isSpaceMember(spaceId: string): Promise<boolean> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { data } = await supabase
    .from("space_members")
    .select("id")
    .eq("space_id", spaceId)
    .eq("profile_id", user.id)
    .single();

  return !!data;
}

// ============================================================================
// POSTS
// ============================================================================

/**
 * Get posts for a space
 */
export async function getSpacePosts(spaceId: string, page = 1, limit = 20) {
  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      author:profiles!posts_author_id_fkey(id, full_name, avatar_url, tier, title, company)
    `,
      { count: "exact" }
    )
    .eq("space_id", spaceId)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return { data: [], total: 0, error: error.message };
  }

  return { data, total: count || 0, error: null };
}

/**
 * Create a new post
 */
export async function createPost(
  _prevState: SpaceResult | null,
  formData: FormData
): Promise<SpaceResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const rawData = {
    spaceId: formData.get("spaceId") as string,
    title: (formData.get("title") as string) || undefined,
    content: JSON.parse(formData.get("content") as string),
    contentText: formData.get("contentText") as string,
  };

  const parsed = createPostSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  // Check if user is a member
  const isMember = await isSpaceMember(parsed.data.spaceId);
  if (!isMember) {
    return { success: false, error: "You must be a member to post" };
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({
      space_id: parsed.data.spaceId,
      author_id: user.id,
      title: parsed.data.title || null,
      content: parsed.data.content,
      content_text: parsed.data.contentText,
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath(`/spaces`);

  return { success: true, message: "Post created", data };
}

/**
 * Get a single post with comments
 */
export async function getPost(postId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      author:profiles!posts_author_id_fkey(id, full_name, avatar_url, tier, title, company),
      space:spaces!posts_space_id_fkey(id, name, slug)
    `
    )
    .eq("id", postId)
    .single();

  if (error) {
    return null;
  }

  return data;
}

// ============================================================================
// COMMENTS
// ============================================================================

/**
 * Get comments for a post
 */
export async function getPostComments(postId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      *,
      author:profiles!comments_author_id_fkey(id, full_name, avatar_url, tier)
    `
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    return [];
  }

  return data;
}

/**
 * Create a comment
 */
export async function createComment(
  postId: string,
  content: Json,
  contentText: string,
  parentId?: string
): Promise<SpaceResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    author_id: user.id,
    parent_id: parentId || null,
    content,
    content_text: contentText,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/spaces");

  return { success: true, message: "Comment added" };
}

// ============================================================================
// LIKES
// ============================================================================

/**
 * Toggle like on a post
 */
export async function togglePostLike(postId: string): Promise<SpaceResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  // Check if already liked
  const { data: existing } = await supabase
    .from("likes")
    .select("id")
    .eq("post_id", postId)
    .eq("profile_id", user.id)
    .single();

  if (existing) {
    // Unlike
    await supabase.from("likes").delete().eq("id", existing.id);
    revalidatePath("/spaces");
    return { success: true, message: "Unliked" };
  } else {
    // Like
    await supabase.from("likes").insert({
      post_id: postId,
      profile_id: user.id,
    });
    revalidatePath("/spaces");
    return { success: true, message: "Liked" };
  }
}

/**
 * Check if user has liked a post
 */
export async function hasLikedPost(postId: string): Promise<boolean> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { data } = await supabase
    .from("likes")
    .select("id")
    .eq("post_id", postId)
    .eq("profile_id", user.id)
    .single();

  return !!data;
}
