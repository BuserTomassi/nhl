"use client";

import { useState, useTransition } from "react";
import { joinSpace, leaveSpace } from "@/lib/actions/spaces";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus, UserMinus } from "lucide-react";

interface JoinSpaceButtonProps {
  spaceId: string;
  isMember: boolean;
}

export function JoinSpaceButton({ spaceId, isMember }: JoinSpaceButtonProps) {
  const [joined, setJoined] = useState(isMember);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      if (joined) {
        const result = await leaveSpace(spaceId);
        if (result.success) {
          setJoined(false);
        }
      } else {
        const result = await joinSpace(spaceId);
        if (result.success) {
          setJoined(true);
        }
      }
    });
  };

  if (joined) {
    return (
      <Button
        variant="outline"
        onClick={handleClick}
        disabled={isPending}
        className="shrink-0"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <UserMinus className="h-4 w-4 mr-2" />
            Leave
          </>
        )}
      </Button>
    );
  }

  return (
    <Button onClick={handleClick} disabled={isPending} className="shrink-0">
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <UserPlus className="h-4 w-4 mr-2" />
          Join Space
        </>
      )}
    </Button>
  );
}
