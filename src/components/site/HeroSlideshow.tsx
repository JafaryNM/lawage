"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { TextAnimate } from "@/registry/magicui/text-animate";

import type { PublicSlide } from "@/lib/slides";
import type { SlideFocus } from "@/lib/slides-data";

// Which part of the photo stays in view when the hero crops it
const FOCUS_CLASS: Record<SlideFocus, string> = {
  center: "object-center",
  top: "object-[center_15%]",
  bottom: "object-[center_85%]",
};

interface HeroSlideshowProps {
  /** Slides managed in /admin/slides; always at least one */
  slides: PublicSlide[];
  onThemeChange?: (theme: "light" | "dark") => void;
}

export function HeroSlideshow({ slides, onThemeChange }: HeroSlideshowProps) {
  const [active, setActiveIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  // Remember the outgoing slide so it can slide down while the new one drops in
  const setActive = (next: number | ((i: number) => number)) => {
    setActiveIndex((current) => {
      const target = typeof next === "function" ? next(current) : next;
      if (target !== current) setPrev(current);
      return target;
    });
  };

  useEffect(() => {
    onThemeChange?.("light");
  }, [onThemeChange]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 8000);
    return () => window.clearInterval(id);
  }, [slides.length]);

  // The list can shrink after an edit, so fall back to the first slide
  const activeSlide = slides[active] ?? slides[0]!;

  // Swipe left/right on touch screens to change slide
  const [touchX, setTouchX] = useState<number | null>(null);
  const onTouchEnd = (endX: number) => {
    if (touchX === null) return;
    const dx = endX - touchX;
    if (Math.abs(dx) > 50) {
      const n = slides.length;
      setActive((i) => (dx < 0 ? (i + 1) % n : (i - 1 + n) % n));
    }
    setTouchX(null);
  };

  return (
    <section
      onTouchStart={(e) => setTouchX(e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => onTouchEnd(e.changedTouches[0]?.clientX ?? 0)}
      className="relative isolate w-full min-h-[620px] h-[88vh] h-[88svh] overflow-hidden bg-black md:h-[88dvh]"
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 ${
            i === active
              ? "translate-y-0 z-0 transition-transform duration-1000 ease-in-out"
              : i === prev
                ? "translate-y-full -z-10 pointer-events-none transition-transform duration-1000 ease-in-out"
                : "-translate-y-full -z-10 pointer-events-none"
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.imageAlt}
            className={`absolute inset-0 size-full object-cover select-none ${FOCUS_CLASS[slide.focus]}`}
          />
          {/* Dark overlay to tone the photo down so the card stands out */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      ))}

      {/* Caption card — bottom left, same position on every slide */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto max-w-[1400px] px-4 pb-6 sm:px-6 sm:pb-8 md:pb-12">
          <div
            key={active}
            className="relative max-w-[640px] overflow-hidden bg-white p-6 text-foreground shadow-[0_24px_60px_rgba(20,18,40,0.35)] animate-in fade-in slide-in-from-bottom-6 duration-700 sm:p-8 md:p-10"
          >
            <span className="block h-0.5 w-10 bg-gold sm:w-12" />
            <h1 className="mt-4 text-[1.6rem] leading-[1.15] text-brand sm:mt-5 sm:text-3xl md:text-[2.4rem]">
              <TextAnimate
                animation="blurInDown"
                by="character"
                once={false}
                duration={0.7}
                stagger={0.03}
                trigger={true}
              >
                {activeSlide.title}
              </TextAnimate>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
              {activeSlide.description}
            </p>

            {(activeSlide.primary || activeSlide.secondary) && (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8">
                {activeSlide.primary && (
                  <a
                    href={activeSlide.primary.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-3 py-3 text-[0.62rem] uppercase tracking-[0.15em] text-white sm:px-6 sm:py-3.5 sm:text-[0.7rem] sm:tracking-[0.22em] transition-colors duration-300 hover:bg-brand"
                  >
                    {activeSlide.primary.label}
                  </a>
                )}
                {activeSlide.secondary && (
                  <a
                    href={activeSlide.secondary.href}
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-brand/30 px-3 py-3 text-[0.62rem] uppercase tracking-[0.15em] text-brand sm:px-6 sm:py-3.5 sm:text-[0.7rem] sm:tracking-[0.22em] transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
                  >
                    {activeSlide.secondary.label}
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={1.5}
                    />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide indicators — desktop only; on mobile visitors swipe between slides */}
      <div className="absolute right-8 bottom-12 z-20 hidden flex-col gap-2.5 md:flex">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`size-3.5 cursor-pointer rounded-full border-2 transition-all duration-300 ${
              i === active ? "scale-110 border-gold" : "border-white hover:scale-110"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
