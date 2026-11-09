"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSavePost } from "@/lib/api/queries";
import type { CmsPost } from "@/lib/cms-server";
import { SERVICES } from "@/lib/services";

export function PostForm({ post }: { post: CmsPost | null }) {
  const router = useRouter();
  const saveMutation = useSavePost(post ? post.id : null);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [area, setArea] = useState(post?.area ?? (SERVICES[0]?.slug ?? ""));
  const [author, setAuthor] = useState(post?.author ?? "LawAge Advocates");
  const [date, setDate] = useState(post?.date ?? new Date().toISOString().split("T")[0]!);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [bodyText, setBodyText] = useState(post?.body ? post.body.join("\n\n") : "");
  const [image, setImage] = useState(post?.image ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(post?.image ?? "");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!post && !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("area", area);
    formData.append("author", author);
    formData.append("date", date);
    formData.append("excerpt", excerpt);
    formData.append("body", bodyText);
    formData.append("image", image);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    saveMutation.mutate(formData, {
      onSuccess: () => {
        toast.success(post ? "Article updated successfully." : "Article published successfully.");
        router.push("/admin/posts");
        router.refresh();
      },
      onError: (err: any) => {
        if (err?.fieldErrors) {
          setFieldErrors(err.fieldErrors);
        }
        toast.error(err.message || "Failed to save article.");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between border-b border-black/5 pb-6">
        <div>
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-brand"
          >
            <ArrowLeft className="size-3.5" /> Back to Legal Updates
          </Link>
          <h1 className="mt-2 text-2xl font-normal text-foreground md:text-3xl">
            {post ? "Edit Article" : "New Article"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" type="button">
            <Link href="/admin/posts">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={saveMutation.isPending}
            className="bg-brand text-white hover:bg-brand-deep"
          >
            {saveMutation.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {post ? "Save Changes" : "Publish Article"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 rounded-[8px] bg-white p-6 shadow-sm md:p-8">
        <div>
          <label className="block text-sm font-medium text-foreground">Article Title *</label>
          <Input
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. Regularise Your Land Transfer Before 31 December 2026"
            className="mt-2 text-base"
          />
          {fieldErrors["title"] && <p className="mt-1 text-xs text-destructive">{fieldErrors["title"]}</p>}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">URL Slug *</label>
            <Input
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. regularise-land-transfer-tanzania"
              className="mt-2 text-sm font-mono"
            />
            {fieldErrors["slug"] && <p className="mt-1 text-xs text-destructive">{fieldErrors["slug"]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Practice Area *</label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {SERVICES.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
            {fieldErrors["area"] && <p className="mt-1 text-xs text-destructive">{fieldErrors["area"]}</p>}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">Author</label>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="LawAge Advocates"
              className="mt-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Publication Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">Excerpt / Summary *</label>
          <Textarea
            required
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A short summary of the article that appears in preview cards and search results..."
            className="mt-2 text-sm"
          />
          {fieldErrors["excerpt"] && <p className="mt-1 text-xs text-destructive">{fieldErrors["excerpt"]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">Featured Image</label>
          <p className="mt-1 text-xs text-muted-foreground">
            Upload a banner photo for this article, or leave as is to keep the current photo.
          </p>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Article preview"
                className="size-32 rounded-[6px] object-cover border border-border"
              />
            )}
            <div className="flex-1 space-y-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                <Upload className="size-4" />
                Upload New Photo
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <div className="text-xs text-muted-foreground">Or enter an image URL:</div>
              <Input
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  setPreviewUrl(e.target.value);
                }}
                placeholder="https://... or /assets/..."
                className="text-xs font-mono"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-foreground">Article Content *</label>
            <span className="text-xs text-muted-foreground">Separate paragraphs with blank lines</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Tip: You can start lines with "1. Title" for numbered section headers, "A. Subtitle" for lettered subheadings, or "Disclaimer" for a disclaimer callout.
          </p>
          <Textarea
            required
            rows={15}
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            placeholder="Enter the full text of the article..."
            className="mt-2 font-mono text-sm leading-relaxed"
          />
          {fieldErrors["body"] && <p className="mt-1 text-xs text-destructive">{fieldErrors["body"]}</p>}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-black/5 pt-6">
          <Button asChild variant="outline" type="button">
            <Link href="/admin/posts">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={saveMutation.isPending}
            className="bg-brand text-white hover:bg-brand-deep"
          >
            {saveMutation.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {post ? "Save Changes" : "Publish Article"}
          </Button>
        </div>
      </div>
    </form>
  );
}

