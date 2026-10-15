"use client";

import Link from "next/link";
import { AlertCircle, ArrowDown, ArrowUp, Eye, EyeOff, Info, Pencil, Plus, Trash2 } from "lucide-react";
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
import { useDeleteSlide, useMoveSlide, useSlides, useToggleSlide } from "@/lib/api/queries";
import type { AdminSlide } from "@/lib/slides";

const iconButton = "size-9 border-brand/15 text-brand shadow-none hover:border-brand hover:bg-brand hover:text-white";
const showError = (error: Error) => toast.error(error.message);

export function SlidesManager() {
  const slides = useSlides();
  const list = slides.data ?? [];
  const activeCount = list.filter((s) => s.isActive).length;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl text-foreground md:text-4xl">
            Hero <span className="text-brand">Slideshow</span>
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            The large rotating slides at the top of the home page. Visible slides play in this order.
          </p>
        </div>
        <Button asChild className="h-11 px-5 text-xs font-normal uppercase tracking-[0.15em] hover:bg-brand-deep">
          <Link href="/admin/slides/new">
            <Plus className="size-4" /> Add slide
          </Link>
        </Button>
      </div>

      {slides.error && (
        <Alert variant="destructive" className="mt-8 border-gold/40 bg-white [&>svg]:text-gold">
          <AlertCircle className="size-4" />
          <AlertDescription className="text-foreground">{slides.error.message}</AlertDescription>
        </Alert>
      )}

      {slides.isSuccess && activeCount === 0 && list.length > 0 && (
        <Alert className="mt-8 border-l-4 border-gold bg-white [&>svg]:text-gold">
          <Info className="size-4" />
          <AlertDescription className="text-foreground">
            No slides are visible, so the home page is showing the original built-in slides. Show at least one
            slide to use your own.
          </AlertDescription>
        </Alert>
      )}

      {slides.isPending ? (
        <div className="mt-8 grid gap-4" aria-busy="true" aria-label="Loading slides">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-36 bg-white/70" />
          ))}
        </div>
      ) : (
        <ol className="mt-8 grid gap-4">
          {list.map((slide, i) => (
            <SlideRow key={slide.id} slide={slide} position={i} total={list.length} />
          ))}
        </ol>
      )}

      {slides.isSuccess && list.length === 0 && (
        <p className="mt-8 bg-white px-6 py-10 text-center text-muted-foreground">
          No slides yet. Add one to get started.
        </p>
      )}
    </>
  );
}

function SlideRow({ slide, position, total }: { slide: AdminSlide; position: number; total: number }) {
  const toggle = useToggleSlide();
  const move = useMoveSlide();
  const remove = useDeleteSlide();

  return (
    <li
      className={`grid gap-5 bg-white p-4 shadow-[0_16px_40px_rgba(33,28,79,0.06)] transition-opacity sm:grid-cols-[200px_1fr] sm:p-5 lg:grid-cols-[220px_1fr_auto] lg:items-center ${
        slide.isActive ? "" : "opacity-70"
      }`}
    >
      <div className="relative aspect-video overflow-hidden bg-brand-deep">
        <img src={slide.imageUrl} alt="" className="size-full object-cover" />
        <span className="absolute top-2 left-2 bg-brand-deep/80 px-2 py-0.5 text-xs text-white">{position + 1}</span>
      </div>

      <div className="min-w-0">
        <Badge
          variant="outline"
          className={`rounded-none border-transparent text-[0.65rem] font-normal uppercase tracking-[0.15em] ${
            slide.isActive ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"
          }`}
        >
          {slide.isActive ? "Visible" : "Hidden"}
        </Badge>
        <h2 className="mt-2 text-xl leading-snug text-foreground">{slide.title}</h2>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{slide.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:col-span-2 lg:col-span-1">
        <Button
          variant="outline"
          size="icon"
          title="Move up"
          aria-label={`Move "${slide.title}" up`}
          disabled={position === 0}
          onClick={() => move.mutate({ id: slide.id, direction: "up" }, { onError: showError })}
          className={iconButton}
        >
          <ArrowUp className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          title="Move down"
          aria-label={`Move "${slide.title}" down`}
          disabled={position === total - 1}
          onClick={() => move.mutate({ id: slide.id, direction: "down" }, { onError: showError })}
          className={iconButton}
        >
          <ArrowDown className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          title={slide.isActive ? "Hide from website" : "Show on website"}
          aria-label={`${slide.isActive ? "Hide" : "Show"} "${slide.title}"`}
          onClick={() =>
            toggle.mutate(
              { id: slide.id, isActive: !slide.isActive },
              {
                onSuccess: () => toast.success(slide.isActive ? "Slide hidden" : "Slide is now visible"),
                onError: showError,
              },
            )
          }
          className={iconButton}
        >
          {slide.isActive ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </Button>
        <Button asChild variant="outline" size="icon" title="Edit" className={iconButton}>
          <Link href={`/admin/slides/${slide.id}`} aria-label={`Edit "${slide.title}"`}>
            <Pencil className="size-4" />
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              title="Delete"
              aria-label={`Delete "${slide.title}"`}
              className={`${iconButton} border-gold/30 text-gold hover:border-gold hover:bg-gold`}
            >
              <Trash2 className="size-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-none">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-normal">Delete this slide?</AlertDialogTitle>
              <AlertDialogDescription>
                &ldquo;{slide.title}&rdquo; will be removed from the home page. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-none">Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="rounded-none bg-gold hover:bg-gold/90"
                onClick={() =>
                  remove.mutate(slide.id, { onSuccess: () => toast.success("Slide deleted"), onError: showError })
                }
              >
                Delete slide
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </li>
  );
}
