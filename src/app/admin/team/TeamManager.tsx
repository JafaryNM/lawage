"use client";

import Link from "next/link";
import { AlertCircle, ExternalLink, Mail, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteTeamMember, useTeam } from "@/lib/api/queries";
import type { CmsTeamMember } from "@/lib/cms-server";

export function TeamManager() {
  const teamQuery = useTeam();
  const deleteMutation = useDeleteTeamMember();
  const list = teamQuery.data ?? [];

  const handleDelete = (id: number, name: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success(`"${name}" has been removed from the team.`),
      onError: (err) => toast.error(err.message || "Failed to remove team member."),
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl text-foreground md:text-4xl">
            Our <span className="text-brand">Team</span>
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Manage partners, advocates, consultants, and administrative staff profiles.
          </p>
        </div>
        <Button asChild className="h-11 px-5 text-xs font-normal uppercase tracking-[0.15em] hover:bg-brand-deep">
          <Link href="/admin/team/new">
            <Plus className="size-4" /> Add Team Member
          </Link>
        </Button>
      </div>

      {teamQuery.error && (
        <Alert variant="destructive" className="mt-8 border-gold/40 bg-white [&>svg]:text-gold">
          <AlertCircle className="size-4" />
          <AlertDescription className="text-foreground">{teamQuery.error.message}</AlertDescription>
        </Alert>
      )}

      {teamQuery.isLoading && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-44 w-full rounded-none bg-white" />
          ))}
        </div>
      )}

      {teamQuery.isSuccess && list.length === 0 && (
        <div className="mt-8 bg-white p-12 text-center text-muted-foreground shadow-sm">
          <p className="text-lg">No team members found.</p>
          <p className="mt-1 text-sm">Click "Add Team Member" above to add the first profile.</p>
        </div>
      )}

      {teamQuery.isSuccess && list.length > 0 && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onDelete={() => handleDelete(member.id, member.name)}
              isDeleting={deleteMutation.isPending}
            />
          ))}
        </div>
      )}
    </>
  );
}

function TeamMemberCard({
  member,
  onDelete,
  isDeleting,
}: {
  member: CmsTeamMember;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <article className="flex flex-col justify-between bg-white p-5 shadow-[0_12px_32px_rgba(33,28,79,0.05)]">
      <div>
        <div className="flex items-start gap-4">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="size-16 shrink-0 rounded-[4px] object-cover object-top"
            />
          ) : (
            <div className="flex size-16 shrink-0 items-center justify-center rounded-[4px] bg-muted text-xs text-muted-foreground">
              No photo
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="text-base font-medium text-foreground hover:text-brand">
              <Link href={`/admin/team/${member.id}`}>{member.name}</Link>
            </h2>
            <p className="mt-0.5 text-xs text-gold font-medium">{member.title}</p>
          </div>
        </div>

        <div className="mt-4">
          <Badge variant="outline" className="border-brand/20 bg-brand/5 text-[0.7rem] text-brand">
            {member.department}
          </Badge>
          {member.email && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="size-3.5" /> {member.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2 border-t border-black/5 pt-3">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="size-9 p-0 border-brand/15 text-brand shadow-none hover:border-brand hover:bg-brand hover:text-white"
          title="View profile on site"
        >
          <Link href={`/team/${member.slug}`} target="_blank">
            <ExternalLink className="size-4" />
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="size-9 p-0 border-brand/15 text-brand shadow-none hover:border-brand hover:bg-brand hover:text-white"
          title="Edit profile"
        >
          <Link href={`/admin/team/${member.id}`}>
            <Pencil className="size-4" />
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={isDeleting}
              className="size-9 p-0 border-gold/30 text-gold shadow-none hover:border-gold hover:bg-gold hover:text-white"
              title="Delete member"
            >
              <Trash2 className="size-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove <strong className="text-foreground">{member.name}</strong>? This will delete their profile from the website.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-destructive hover:bg-destructive/90 text-white">
                Delete Profile
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </article>
  );
}

