import { Link } from "@tanstack/react-router";

import { FlatIcon } from "@/components/site/FlatIcon";
import { SERVICES } from "@/lib/services";

/** White service cards overlapping a photo on the right, each linking to its detail page */
export function ServicesGrid({ limit }: { limit?: number }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {SERVICES.slice(0, limit).map(({ slug, icon, title, text, image }) => (
        <Link
          key={slug}
          to="/services/$slug"
          params={{ slug }}
          className="group relative block md:py-10"
        >
          <div className="overflow-hidden md:absolute md:inset-y-0 md:right-0 md:w-1/2">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:aspect-auto md:h-full"
            />
          </div>

          <div className="relative bg-white p-8 md:w-[64%] md:p-9">
            <span className="flex size-[78px] items-center justify-center bg-muted transition-colors duration-300 group-hover:bg-brand">
              <FlatIcon
                name={icon}
                className="size-11 text-brand transition-colors duration-300 group-hover:text-white"
              />
            </span>
            <h3 className="mt-10 text-[1.7rem] leading-snug text-foreground transition-colors duration-300 group-hover:text-brand">
              {title}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-[1.75] text-muted-foreground">{text}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
