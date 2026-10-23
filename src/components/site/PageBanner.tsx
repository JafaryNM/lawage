import Link from "next/link";
import { ChevronRight } from "lucide-react";

import defaultBanner from "@/assets/gavel-books-wooden-desk.jpg";

type Crumb = { label: string; to?: string };

interface PageBannerProps {
  title: string;
  /** Trail after "Home"; the last crumb is the current page */
  crumbs: Crumb[];
  image?: string;
  /** CSS object-position for the photo, e.g. "center 20%" to keep faces in view */
  focus?: string;
}

export function PageBanner({ title, crumbs, image = defaultBanner.src, focus }: PageBannerProps) {
  return (
    <section className="relative flex h-[420px] items-center justify-center overflow-hidden pt-[90px] md:h-[460px]">
      <img
        src={image}
        alt=""
        className="absolute inset-0 size-full object-cover"
        style={focus ? { objectPosition: focus } : undefined}
      />
      <div className="absolute inset-0 bg-brand-deep/70" />
      <div className="relative px-6 text-center">
        <h1 className="text-4xl text-white md:text-6xl">{title}</h1>
        <nav
          aria-label="Breadcrumb"
          className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-white/80"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <ChevronRight className="size-4" strokeWidth={1.5} />
              {c.to ? (
                <Link href={c.to} className="transition-colors hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
