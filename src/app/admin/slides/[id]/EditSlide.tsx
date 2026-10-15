"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useSlide } from "@/lib/api/queries";
import { SlideForm } from "../SlideForm";

type Builtin = { key: string; label: string; url: string };

/** Loads the slide from GET /api/admin/slides/:id, then shows the form */
export function EditSlide({ id, builtins }: { id: number; builtins: Builtin[] }) {
  const slide = useSlide(id);

  if (slide.isPending) {
    return (
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]" aria-busy="true" aria-label="Loading slide">
        <Skeleton className="h-[640px] bg-white/70" />
        <Skeleton className="aspect-[4/3] bg-white/70" />
      </div>
    );
  }

  if (slide.error) {
    return (
      <Alert variant="destructive" className="mt-8 border-gold/40 bg-white [&>svg]:text-gold">
        <AlertCircle className="size-4" />
        <AlertDescription className="text-foreground">
          {slide.error.message}{" "}
          <Link href="/admin/slides" className="text-brand underline-offset-4 hover:underline">
            Back to slides
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  // key: reset the form if a different slide loads into the same page
  return <SlideForm key={slide.data.id} slide={slide.data} builtins={builtins} />;
}
