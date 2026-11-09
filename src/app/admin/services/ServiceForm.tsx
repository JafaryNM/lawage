"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FlatIcon, type FlatIconName } from "@/components/site/FlatIcon";
import { useSaveService } from "@/lib/api/queries";
import type { CmsService } from "@/lib/cms-server";

const AVAILABLE_ICONS: { name: FlatIconName; label: string }[] = [
  { name: "building", label: "Corporate / Building" },
  { name: "gavel", label: "Litigation / Court" },
  { name: "compass-alt", label: "Mining / Natural Resources" },
  { name: "bullseye-arrow", label: "Energy / Strategy" },
  { name: "award", label: "Intellectual Property / Award" },
  { name: "balance-scale-right", label: "Privacy / Justice Scales" },
  { name: "calculator-math-tax", label: "Tax / Finance" },
  { name: "briefcase-blank", label: "Debt Recovery / Insolvency" },
  { name: "handshake-trust", label: "Insurance / Trust" },
  { name: "house-chimney", label: "Real Estate / Land" },
  { name: "user-headset", label: "Employment / HR" },
  { name: "users-alt", label: "NGOs / Public Sector" },
];

export function ServiceForm({ service }: { service: CmsService | null }) {
  const router = useRouter();
  const saveMutation = useSaveService(service ? service.id : null);

  const [title, setTitle] = useState(service?.title ?? "");
  const [slug, setSlug] = useState(service?.slug ?? "");
  const [icon, setIcon] = useState<FlatIconName>(service?.icon ?? "building");
  const [headline, setHeadline] = useState(service?.headline ?? "");
  const [text, setText] = useState(service?.text ?? "");
  const [approach, setApproach] = useState(service?.approach ?? "");
  const [image, setImage] = useState(service?.image ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(service?.image ?? "");
  const [introText, setIntroText] = useState(service?.intro ? service.intro.join("\n\n") : "");
  const [scopeText, setScopeText] = useState(service?.scope ? service.scope.join("\n") : "");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!service && !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      );
    }
    if (!service && !headline) {
      setHeadline(val);
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
    formData.append("icon", icon);
    formData.append("headline", headline);
    formData.append("text", text);
    formData.append("approach", approach);
    formData.append("intro", introText);
    formData.append("scope", scopeText);
    formData.append("image", image);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    saveMutation.mutate(formData, {
      onSuccess: () => {
        toast.success(
          service ? "Practice area updated successfully." : "Practice area added successfully.",
        );
        router.push("/admin/services");
        router.refresh();
      },
      onError: (err: any) => {
        if (err?.fieldErrors) {
          setFieldErrors(err.fieldErrors);
        }
        toast.error(err.message || "Failed to save practice area.");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between border-b border-black/5 pb-6">
        <div>
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-brand"
          >
            <ArrowLeft className="size-3.5" /> Back to Practice Areas
          </Link>
          <h1 className="mt-2 text-2xl font-normal text-foreground md:text-3xl">
            {service ? "Edit Practice Area" : "New Practice Area"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" type="button">
            <Link href="/admin/services">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={saveMutation.isPending}
            className="bg-brand text-white hover:bg-brand-deep"
          >
            {saveMutation.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {service ? "Save Changes" : "Save Practice Area"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 rounded-[8px] bg-white p-6 shadow-sm md:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">Practice Area Name *</label>
            <Input
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Corporate & Commercial Law"
              className="mt-2 text-base"
            />
            {fieldErrors["title"] && <p className="mt-1 text-xs text-destructive">{fieldErrors["title"]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">URL Slug *</label>
            <Input
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. corporate-commercial-law"
              className="mt-2 text-sm font-mono"
            />
            {fieldErrors["slug"] && <p className="mt-1 text-xs text-destructive">{fieldErrors["slug"]}</p>}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">Service Icon *</label>
            <div className="mt-2 flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-brand text-white">
                <FlatIcon name={icon} className="size-5 text-white" />
              </span>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value as FlatIconName)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {AVAILABLE_ICONS.map((i) => (
                  <option key={i.name} value={i.name}>
                    {i.label} ({i.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Page Headline *</label>
            <Input
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Strategic Corporate & Commercial Legal Advisory"
              className="mt-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">Card Summary Text *</label>
          <Textarea
            required
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="A concise 1-2 sentence description shown on overview cards..."
            className="mt-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">Practice Area Photo</label>
          <p className="mt-1 text-xs text-muted-foreground">
            Banner image shown on the service detail page and service card.
          </p>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Service preview"
                className="size-28 rounded-[4px] object-cover border border-border"
              />
            )}
            <div className="flex-1 space-y-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                <Upload className="size-4" />
                Upload New Image
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
            <label className="block text-sm font-medium text-foreground">Introduction &amp; Overview</label>
            <span className="text-xs text-muted-foreground">Separate paragraphs with blank lines</span>
          </div>
          <Textarea
            rows={6}
            value={introText}
            onChange={(e) => setIntroText(e.target.value)}
            placeholder="Detailed description of this practice area and firm capacity..."
            className="mt-2 text-sm leading-relaxed"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-foreground">Scope of Practice / Services Offered</label>
            <span className="text-xs text-muted-foreground">One item per line</span>
          </div>
          <Textarea
            rows={6}
            value={scopeText}
            onChange={(e) => setScopeText(e.target.value)}
            placeholder="Entity formation and corporate structuring&#10;Commercial contract drafting and negotiation&#10;Regulatory compliance and licensing"
            className="mt-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">Our Approach (Optional)</label>
          <Textarea
            rows={4}
            value={approach}
            onChange={(e) => setApproach(e.target.value)}
            placeholder="How LawAge approaches client matters in this practice area..."
            className="mt-2 text-sm"
          />
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-black/5 pt-6">
          <Button asChild variant="outline" type="button">
            <Link href="/admin/services">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={saveMutation.isPending}
            className="bg-brand text-white hover:bg-brand-deep"
          >
            {saveMutation.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {service ? "Save Changes" : "Save Practice Area"}
          </Button>
        </div>
      </div>
    </form>
  );
}

