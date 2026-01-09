import { getInvitations } from "@/lib/actions/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InvitationForm } from "./invitation-form";
import { InvitationActions } from "./invitation-actions";
import { formatDistanceToNow } from "date-fns";

export default async function InvitationsPage() {
  const { data: invitations } = await getInvitations();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Invitations</h1>
        <p className="text-muted-foreground">
          Manage member invitations and access
        </p>
      </div>

      {/* Create invitation form */}
      <Card>
        <CardHeader>
          <CardTitle>Send Invitation</CardTitle>
        </CardHeader>
        <CardContent>
          <InvitationForm />
        </CardContent>
      </Card>

      {/* Invitations list */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Invitations</CardTitle>
        </CardHeader>
        <CardContent>
          {invitations.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No invitations yet
            </p>
          ) : (
            <div className="divide-y">
              {invitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="py-4 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{invitation.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={invitation.tier}>{invitation.tier}</Badge>
                      <StatusBadge status={invitation.status} />
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(invitation.created_at), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                  {invitation.status === "pending" && (
                    <InvitationActions invitation={invitation} />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variants = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    accepted: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    expired: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    revoked: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  return (
    <Badge
      className={`${variants[status as keyof typeof variants] || ""} border-0 capitalize`}
    >
      {status}
    </Badge>
  );
}
