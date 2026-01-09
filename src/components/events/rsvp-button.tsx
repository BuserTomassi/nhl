"use client";

import { useState, useTransition } from "react";
import { rsvpToEvent, cancelRsvp } from "@/lib/actions/events";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, CalendarX, CheckCircle } from "lucide-react";

interface RsvpButtonProps {
  eventId: string;
  isRegistered: boolean;
  isPast: boolean;
  isFull: boolean;
}

export function RsvpButton({
  eventId,
  isRegistered,
  isPast,
  isFull,
}: RsvpButtonProps) {
  const [registered, setRegistered] = useState(isRegistered);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setError(null);
    startTransition(async () => {
      if (registered) {
        const result = await cancelRsvp(eventId);
        if (result.success) {
          setRegistered(false);
        } else {
          setError(result.error || "Failed to cancel");
        }
      } else {
        const result = await rsvpToEvent(eventId);
        if (result.success) {
          setRegistered(true);
        } else {
          setError(result.error || "Failed to register");
        }
      }
    });
  };

  if (isPast) {
    return (
      <Button disabled className="w-full">
        <CalendarX className="mr-2 h-4 w-4" />
        Event Ended
      </Button>
    );
  }

  if (registered) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2 py-2 text-green-600 dark:text-green-400">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">You're registered!</span>
        </div>
        <Button
          variant="outline"
          onClick={handleClick}
          disabled={isPending}
          className="w-full"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <CalendarX className="mr-2 h-4 w-4" />
              Cancel Registration
            </>
          )}
        </Button>
        {error && <p className="text-sm text-destructive text-center">{error}</p>}
      </div>
    );
  }

  if (isFull) {
    return (
      <Button disabled className="w-full">
        Event Full
      </Button>
    );
  }

  return (
    <div className="space-y-2">
      <Button onClick={handleClick} disabled={isPending} className="w-full">
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Calendar className="mr-2 h-4 w-4" />
            Register for Event
          </>
        )}
      </Button>
      {error && <p className="text-sm text-destructive text-center">{error}</p>}
    </div>
  );
}
