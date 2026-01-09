"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TierBadge } from "@/components/dashboard/tier-badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Pin } from "lucide-react";
import { togglePostLike } from "@/lib/actions/spaces";
import { useState, useTransition } from "react";

interface PostCardProps {
  post: {
    id: string;
    title: string | null;
    content: unknown;
    content_text: string;
    is_pinned: boolean;
    like_count: number;
    comment_count: number;
    created_at: string;
    author: {
      id: string;
      full_name: string | null;
      avatar_url: string | null;
      tier: "silver" | "gold" | "platinum" | "diamond";
      title: string | null;
      company: string | null;
    };
  };
  showSpace?: boolean;
}

export function PostCard({ post, showSpace }: PostCardProps) {
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [isLiked, setIsLiked] = useState(false);
  const [isPending, startTransition] = useTransition();

  const initials = post.author.full_name
    ? post.author.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const handleLike = () => {
    startTransition(async () => {
      const result = await togglePostLike(post.id);
      if (result.success) {
        setIsLiked(!isLiked);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      }
    });
  };

  return (
    <Card className={post.is_pinned ? "border-primary/50" : ""}>
      <CardContent className="p-5">
        {/* Author header */}
        <div className="flex items-start gap-3">
          <Link href={`/members/${post.author.id}`}>
            <Avatar>
              <AvatarImage src={post.author.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/members/${post.author.id}`}
                className="font-medium hover:underline"
              >
                {post.author.full_name || "Member"}
              </Link>
              <TierBadge tier={post.author.tier} size="sm" showIcon={false} />
              {post.is_pinned && (
                <span className="flex items-center gap-1 text-xs text-primary">
                  <Pin className="h-3 w-3" />
                  Pinned
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {post.author.title && post.author.company
                ? `${post.author.title} at ${post.author.company}`
                : post.author.title || post.author.company || "Member"}
              {" · "}
              {formatDistanceToNow(new Date(post.created_at), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>

        {/* Post content */}
        <div className="mt-4">
          {post.title && (
            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
          )}
          <p className="text-foreground whitespace-pre-wrap">
            {post.content_text}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            disabled={isPending}
            className={isLiked ? "text-red-500" : "text-muted-foreground"}
          >
            <Heart
              className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`}
            />
            {likeCount}
          </Button>

          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MessageCircle className="h-4 w-4 mr-1" />
            {post.comment_count}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
