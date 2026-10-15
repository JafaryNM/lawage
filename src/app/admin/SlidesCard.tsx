"use client";

import { GalleryHorizontal } from "lucide-react";

import { useSlides } from "@/lib/api/queries";
import { DashboardCard } from "./DashboardCard";

/** Hero slideshow summary from GET /api/admin/slides (shares the cache with the slides page) */
export function SlidesCard() {
  const slides = useSlides();
  const visible = slides.data?.filter((s) => s.isActive).length;

  return (
    <DashboardCard
      title="Hero Slideshow"
      text={
        slides.error ? "Could not load slides" : visible === undefined ? "Loading…" : `${visible} visible on the home page`
      }
      count={slides.data?.length ?? null}
      Icon={GalleryHorizontal}
      href="/admin/slides"
    />
  );
}
