"use client";

import Link from "next/link";
import { AlertCircle, Calendar, ExternalLink, Pencil, Plus, Trash2, User } from "lucide-react";
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
import { useDeletePost, usePosts } from "@/lib/api/queries";
import { formatPostDate } from "@/lib/posts";
import type { CmsPost } from "@/lib/cms-server";

export function PostsManager() {
  const postsQuery = usePosts();
  const deleteMutation = useDeletePost();
  const list = postsQuery.data ?? [];

  const handleDelete = (id: number, title: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success(`"${title}" has been deleted.`),
      onError: (err) => toast.error(err.message || "Failed to delete article."),
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl text-foreground md:text-4xl">
            Legal <span className="text-brand">Updates</span>
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Manage legal updates, briefings, articles and insights published on the website.
          </p>
        </div>
        <Button asChild className="h-11 px-5 text-xs font-normal uppercase tracking-[0.15em] hover:bg-brand-deep">
          <Link href="/admin/posts/new">
            <Plus className="size-4" /> New Article
          </Link>
        </Button>
      </div>

      {postsQuery.error && (
        <Alert variant="destructive" className="mt-8 border-gold/40 bg-white [&>svg]:text-gold">
          <AlertCircle className="size-4" />
          <AlertDescription className="text-foreground">{postsQuery.error.message}</AlertDescription>
        </Alert>
      )}

      {postsQuery.isLoading && (
        <div className="mt-8 space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-none bg-white" />
          ))}
        </div>
      )}

      {postsQuery.isSuccess && list.length === 0 && (
        <div className="mt-8 bg-white p-12 text-center text-muted-foreground shadow-sm">
          <p className="text-lg">No articles found.</p>
          <p className="mt-1 text-sm">Click "New Article" above to publish your first legal briefing.</p>
        </div>
      )}

      {postsQuery.isSuccess && list.length > 0 && (
        <div className="mt-8 space-y-4">
          {list.map((post) => (
            <PostCardRow
              key={post.id}
              post={post}
              onDelete={() => handleDelete(post.id, post.title)}
              isDeleting={deleteMutation.isPending}
            />
          ))}
        </div>
      )}
    </>
  );
}

function PostCardRow({
  post,
  onDelete,
  isDeleting,
}: {
  post: CmsPost;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <article className="flex flex-col gap-4 bg-white p-5 shadow-[0_12px_32px_rgba(33,28,79,0.05)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-start gap-4">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="size-20 shrink-0 rounded-[4px] object-cover sm:size-24"
          />
        ) : (
          <div className="flex size-20 shrink-0 items-center justify-center rounded-[4px] bg-muted text-xs text-muted-foreground sm:size-24">
            No image
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-brand/20 bg-brand/5 text-[0.7rem] text-brand uppercase tracking-wider">
              {post.area}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="size-3.5" />
              {formatPostDate(post.date)}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="size-3.5" />
              {post.author}
            </span>
          </div>

          <h2 className="mt-2 text-lg font-normal text-foreground hover:text-brand">
            <Link href={`/admin/posts/${post.id}`}>{post.title}</Link>
          </h2>

          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{post.excerpt}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-black/5 pt-3 sm:border-t-0 sm:pt-0">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="size-9 p-0 border-brand/15 text-brand shadow-none hover:border-brand hover:bg-brand hover:text-white"
          title="View on public site"
        >
          <Link href={`/blog/${post.slug}`} target="_blank">
            <ExternalLink className="size-4" />
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="size-9 p-0 border-brand/15 text-brand shadow-none hover:border-brand hover:bg-brand hover:text-white"
          title="Edit article"
        >
          <Link href={`/admin/posts/${post.id}`}>
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
              title="Delete article"
            >
              <Trash2 className="size-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Article</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete <strong className="text-foreground">{post.title}</strong>? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-destructive hover:bg-destructive/90 text-white">
                Delete Article
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </article>
  );
}

