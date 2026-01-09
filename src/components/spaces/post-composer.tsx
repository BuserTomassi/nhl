"use client";

import { useState, useTransition, useRef } from "react";
import { createPost } from "@/lib/actions/spaces";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TiptapEditor } from "@/components/editor";
import { Loader2, Send } from "lucide-react";

interface PostComposerProps {
  spaceId: string;
}

export function PostComposer({ spaceId }: PostComposerProps) {
  const [content, setContent] = useState<{ json: unknown; text: string }>({
    json: null,
    text: "",
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!content.text.trim()) return;

    const formData = new FormData();
    formData.append("spaceId", spaceId);
    formData.append("content", JSON.stringify(content.json));
    formData.append("contentText", content.text);

    startTransition(async () => {
      const result = await createPost(null, formData);
      if (result.success) {
        setContent({ json: null, text: "" });
        setError(null);
        // Force page refresh to show new post
        window.location.reload();
      } else {
        setError(result.error || "Failed to create post");
      }
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
          <TiptapEditor
            placeholder="Share something with the community..."
            onChange={setContent}
            onSubmit={handleSubmit}
            minHeight="100px"
          />

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              Press Cmd+Enter to post
            </p>
            <Button
              type="submit"
              disabled={isPending || !content.text.trim()}
              className="gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Post
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
