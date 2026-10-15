"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, ImageUp, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ApiError } from "@/lib/api/client";
import { useSaveSlide } from "@/lib/api/queries";
import type { AdminSlide } from "@/lib/slides";
import type { SlideFocus } from "@/lib/slides-data";
import { SlideFieldsSchema } from "@/lib/validation/schemas";

type Builtin = { key: string; label: string; url: string };
type SlideValues = z.input<typeof SlideFieldsSchema>;

const FOCUS_OPTIONS: { value: SlideFocus; label: string; className: string }[] = [
  { value: "center", label: "Centre", className: "object-center" },
  { value: "top", label: "Top (keeps faces in view)", className: "object-[center_15%]" },
  { value: "bottom", label: "Bottom", className: "object-[center_85%]" },
];

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const labelClass = "text-xs font-normal uppercase tracking-[0.16em] text-muted-foreground";
const inputClass = "h-11 bg-white shadow-none focus-visible:ring-1";
const messageClass = "text-gold";

const NEW_SLIDE: SlideValues = {
  title: "",
  description: "",
  imageAlt: "",
  focus: "center",
  primaryLabel: "Practice Areas",
  primaryHref: "/#practice",
  secondaryLabel: "Contact Us",
  secondaryHref: "/contact",
  isActive: true,
};

/** Add (slide = null) or edit a hero slide; saves through POST/PUT /api/admin/slides */
export function SlideForm({ slide, builtins }: { slide: AdminSlide | null; builtins: Builtin[] }) {
  const router = useRouter();
  const save = useSaveSlide(slide?.id ?? null);

  // Same schema the API validates with (src/lib/validation/schemas.ts)
  const form = useForm<SlideValues>({
    resolver: zodResolver(SlideFieldsSchema),
    defaultValues: slide
      ? {
          title: slide.title,
          description: slide.description,
          imageAlt: slide.imageAlt,
          focus: slide.focus,
          primaryLabel: slide.primaryLabel,
          primaryHref: slide.primaryHref,
          secondaryLabel: slide.secondaryLabel,
          secondaryHref: slide.secondaryHref,
          isActive: slide.isActive,
        }
      : NEW_SLIDE,
  });

  // The photo is either a new upload or a built-in choice; an existing slide keeps its photo otherwise
  const [file, setFile] = useState<File | null>(null);
  const [builtin, setBuiltin] = useState<string | null>(slide ? null : (builtins[0]?.key ?? null));
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!file) return setUploadUrl(null);
    const url = URL.createObjectURL(file);
    setUploadUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const values = form.watch();
  const builtinUrl = builtins.find((b) => b.key === builtin)?.url;
  const previewUrl = uploadUrl ?? builtinUrl ?? slide?.imageUrl;
  const currentBuiltin = slide?.image.startsWith("builtin:") ? slide.image : null;
  const focusClass = FOCUS_OPTIONS.find((f) => f.value === values.focus)?.className ?? "object-center";

  const chooseFile = (next: File | undefined) => {
    setImageError(null);
    if (!next) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(next.type)) {
      setImageError("Upload a JPG, PNG or WebP image.");
    } else if (next.size > MAX_UPLOAD_BYTES) {
      setImageError("The image must be 5 MB or smaller.");
    } else {
      setFile(next);
      setBuiltin(null);
      return;
    }
    if (fileInput.current) fileInput.current.value = "";
  };

  const onSubmit = (data: SlideValues) => {
    if (!slide && !file && !builtin) return setImageError("Choose a photo for this slide.");

    const body = new FormData();
    for (const [key, value] of Object.entries(data)) body.set(key, String(value ?? ""));
    if (file) body.set("imageFile", file);
    else if (builtin) body.set("builtinImage", builtin);

    save.mutate(body, {
      onSuccess: () => {
        toast.success(slide ? "Slide updated" : "Slide added");
        router.push("/admin/slides");
      },
      onError: (error) => {
        if (!(error instanceof ApiError)) return;
        for (const [field, message] of Object.entries(error.fieldErrors)) {
          if (field === "image") setImageError(message);
          else form.setError(field as keyof SlideValues, { message });
        }
      },
    });
  };

  const formError =
    save.error && !(save.error instanceof ApiError && Object.keys(save.error.fieldErrors).length)
      ? save.error.message
      : form.formState.submitCount > 0 && Object.keys(form.formState.errors).length
        ? "Please fix the highlighted fields."
        : null;
  const pending = save.isPending || save.isSuccess;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_420px]"
      >
        <div className="grid gap-6 bg-white p-6 shadow-[0_16px_40px_rgba(33,28,79,0.06)] sm:p-8">
          {formError && (
            <Alert variant="destructive" className="border-gold/40 bg-gold/5 [&>svg]:text-gold">
              <AlertCircle className="size-4" />
              <AlertDescription className="text-foreground">{formError}</AlertDescription>
            </Alert>
          )}

          {/* PHOTO */}
          <section className="grid gap-4">
            <h2 className="text-lg text-foreground">Photo</h2>

            <Label
              htmlFor="slide-image-file"
              className="flex cursor-pointer items-center gap-4 border border-dashed border-brand/30 bg-[#f7f7fa] px-5 py-4 font-normal transition-colors hover:border-brand"
            >
              <ImageUp className="size-6 shrink-0 text-brand" strokeWidth={1.5} />
              <span className="text-sm">
                <span className="text-brand">{file ? file.name : "Upload a photo"}</span>
                <span className="block text-xs text-muted-foreground">
                  JPG, PNG or WebP, up to 5 MB. Wide photos work best.
                </span>
              </span>
            </Label>
            <input
              id="slide-image-file"
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(e) => chooseFile(e.target.files?.[0])}
            />

            <div className="grid gap-2">
              <span className={labelClass}>Or use a built-in photo</span>
              <RadioGroup
                value={builtin ?? (file ? "" : (currentBuiltin ?? ""))}
                onValueChange={(key) => {
                  setBuiltin(key);
                  setFile(null);
                  setImageError(null);
                  if (fileInput.current) fileInput.current.value = "";
                }}
                className="grid grid-cols-3 gap-3"
              >
                {builtins.map((b) => (
                  <Label key={b.key} htmlFor={b.key} className="group relative cursor-pointer" title={b.label}>
                    <RadioGroupItem id={b.key} value={b.key} className="peer sr-only" />
                    <img
                      src={b.url}
                      alt={b.label}
                      className="aspect-video w-full object-cover ring-2 ring-transparent ring-offset-2 transition-all group-hover:ring-brand/30 peer-data-[state=checked]:ring-brand peer-focus-visible:ring-brand"
                    />
                  </Label>
                ))}
              </RadioGroup>
            </div>
            {imageError && <p className="text-sm font-medium text-gold">{imageError}</p>}

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="focus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Photo position</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className={`${inputClass} w-full`}>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {FOCUS_OPTIONS.map((f) => (
                          <SelectItem key={f.value} value={f.value}>
                            {f.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs">
                      Which part of the photo stays in view on narrow screens.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageAlt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Photo description</FormLabel>
                    <FormControl>
                      <Input {...field} maxLength={160} className={inputClass} />
                    </FormControl>
                    <FormDescription className="text-xs">For screen readers. Defaults to the title.</FormDescription>
                    <FormMessage className={messageClass} />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <Separator />

          {/* TEXT */}
          <section className="grid gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Title</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={120} className={inputClass} />
                  </FormControl>
                  <FormMessage className={messageClass} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Text ({field.value?.length ?? 0}/300)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      maxLength={300}
                      rows={3}
                      className="resize-y bg-white shadow-none focus-visible:ring-1"
                    />
                  </FormControl>
                  <FormMessage className={messageClass} />
                </FormItem>
              )}
            />
          </section>

          <Separator />

          {/* BUTTONS */}
          <section className="grid gap-4">
            <div>
              <h2 className="text-lg text-foreground">Buttons</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Leave both boxes empty to hide a button. Links can be /contact, /#practice or https://….
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["primaryLabel", "Main button text"],
                  ["primaryHref", "Main button link"],
                  ["secondaryLabel", "Second button text"],
                  ["secondaryHref", "Second button link"],
                ] as const
              ).map(([name, label]) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>{label}</FormLabel>
                      <FormControl>
                        <Input {...field} maxLength={name.endsWith("Label") ? 30 : 300} className={inputClass} />
                      </FormControl>
                      <FormMessage className={messageClass} />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </section>

          <Separator />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 space-y-0">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="font-normal text-foreground">Show this slide on the website</FormLabel>
              </FormItem>
            )}
          />

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="submit"
              disabled={pending}
              className="h-12 px-6 text-xs font-normal uppercase tracking-[0.18em] hover:bg-brand-deep"
            >
              {pending && <Loader2 className="size-4 animate-spin" />}
              {pending ? "Saving…" : slide ? "Save changes" : "Add slide"}
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-12 text-xs font-normal uppercase tracking-[0.18em] text-muted-foreground hover:bg-transparent hover:text-brand"
            >
              <Link href="/admin/slides">Cancel</Link>
            </Button>
          </div>
        </div>

        {/* LIVE PREVIEW — a scaled-down copy of the home page slide */}
        <aside className="lg:sticky lg:top-8">
          <span className={labelClass}>Preview</span>
          <div className="relative mt-2 aspect-[4/3] overflow-hidden bg-black">
            {previewUrl && (
              <img src={previewUrl} alt="" className={`absolute inset-0 size-full object-cover ${focusClass}`} />
            )}
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-x-3 bottom-3 bg-white p-4">
              <span className="block h-0.5 w-6 bg-gold" />
              <p className="mt-2 text-base leading-tight text-brand">{values.title || "Slide title"}</p>
              {values.description && (
                <p className="mt-1.5 line-clamp-2 text-[0.65rem] leading-relaxed text-muted-foreground">
                  {values.description}
                </p>
              )}
              {(values.primaryLabel || values.secondaryLabel) && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {values.primaryLabel && (
                    <span className="truncate rounded-full bg-gold px-2 py-1.5 text-center text-[0.5rem] uppercase tracking-[0.15em] text-white">
                      {values.primaryLabel}
                    </span>
                  )}
                  {values.secondaryLabel && (
                    <span className="inline-flex items-center justify-center gap-1 truncate rounded-full border border-brand/30 px-2 py-1.5 text-[0.5rem] uppercase tracking-[0.15em] text-brand">
                      {values.secondaryLabel} <ArrowRight className="size-2.5" />
                    </span>
                  )}
                </div>
              )}
            </div>
            {!values.isActive && (
              <span className="absolute top-3 right-3 bg-brand-deep/85 px-2 py-1 text-[0.6rem] uppercase tracking-[0.15em] text-white">
                Hidden
              </span>
            )}
          </div>
        </aside>
      </form>
    </Form>
  );
}
