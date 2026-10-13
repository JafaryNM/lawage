import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { SERVICES } from "@/lib/services";

/** Brand-coloured service cards, each linking to its detail page */
export function ServicesGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map(({ slug, icon: Icon, title, text }) => (
        <Link
          key={slug}
          to="/services/$slug"
          params={{ slug }}
          className="group flex gap-6 rounded-[8px] bg-brand p-8 transition-colors duration-300 hover:bg-brand-deep md:p-10"
        >
          <Icon
            className="size-12 shrink-0 text-white transition-transform duration-300 group-hover:-translate-y-1"
            strokeWidth={1}
          />
          <div>
            <h3 className="text-2xl leading-snug text-white">{title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/75 transition-colors duration-300 group-hover:text-white/90">
              {text}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-white/85">
              Learn More
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
