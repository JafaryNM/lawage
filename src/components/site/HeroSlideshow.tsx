"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { TextAnimate } from "@/registry/magicui/text-animate";

// Free photos from Pexels (Pexels licence: free for commercial use, no attribution required)
import slideDesk from "@/assets/hero-advocate-desk.jpg";
import slideReview from "@/assets/hero-contract-review.jpg";
import slideHandshake from "@/assets/hero-advocate-handshake.jpg";

const HERO_SLIDES = [
  {
    src: slideDesk.src,
    position: "object-center",
    alt: "Advocate writing at his desk beside the scales of justice",
    title: "Trusted Legal Excellence for Every Client",
    desc: "With over 9 years of experience, we deliver professional legal services tailored to protect your rights and achieve your goals.",
  },
  {
    src: slideReview.src,
    // Frame higher so heads aren't cut off
    position: "object-[center_15%]",
    alt: "Advocate guiding a client through a contract",
    title: "Professional Legal Solutions You Can Rely On",
    desc: "From corporate law and litigation to legal advisory and compliance, we deliver results with integrity and excellence.",
  },
  {
    src: slideHandshake.src,
    position: "object-[center_15%]",
    alt: "Advocate in court robes shaking hands with a client",
    title: "Expert in Legal Specialties",
    desc: "Suitable for complex legal, regulatory, and business environments.",
  },
];

interface HeroSlideshowProps {
  onThemeChange?: (theme: "light" | "dark") => void;
}

export function HeroSlideshow({ onThemeChange }: HeroSlideshowProps) {
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
      setActive((i) => (i + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => window.clearInterval(id);
  }, []);

  const activeSlide = HERO_SLIDES[active]!;

  // Swipe left/right on touch screens to change slide
  const [touchX, setTouchX] = useState<number | null>(null);
  const onTouchEnd = (endX: number) => {
    if (touchX === null) return;
    const dx = endX - touchX;
    if (Math.abs(dx) > 50) {
      const n = HERO_SLIDES.length;
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
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 ${
            i === active
              ? "translate-y-0 z-0 transition-transform duration-1000 ease-in-out"
              : i === prev
                ? "translate-y-full -z-10 pointer-events-none transition-transform duration-1000 ease-in-out"
                : "-translate-y-full -z-10 pointer-events-none"
          }`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 size-full object-cover select-none ${slide.position}`}
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
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">{activeSlide.desc}</p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8">
              <a
                href="/#practice"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-3 py-3 text-[0.62rem] uppercase tracking-[0.15em] text-white sm:px-6 sm:py-3.5 sm:text-[0.7rem] sm:tracking-[0.22em] transition-colors duration-300 hover:bg-brand"
              >
                Practice Areas
              </a>
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-brand/30 px-3 py-3 text-[0.62rem] uppercase tracking-[0.15em] text-brand sm:px-6 sm:py-3.5 sm:text-[0.7rem] sm:tracking-[0.22em] transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
              >
                Contact Us
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators — desktop only; on mobile visitors swipe between slides */}
      <div className="absolute right-8 bottom-12 z-20 hidden flex-col gap-2.5 md:flex">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
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
