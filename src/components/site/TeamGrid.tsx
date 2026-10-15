import Link from "next/link";
import { ArrowRight, Linkedin, Mail } from "lucide-react";

import { FIRM_EMAIL, type TeamMember } from "@/lib/team";

/**
 * Portrait grid with the name beneath each photo; each card opens the person's profile page.
 * Hovering reveals LinkedIn and email icons in the top-right corner (always shown on touch screens).
 */
export function TeamGrid({
  members,
  className = "",
}: {
  members: TeamMember[];
  className?: string;
}) {
  return (
    <div className={`grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {members.map((m) => (
        <TeamCard key={m.name} member={m} />
      ))}
    </div>
  );
}

function TeamCard({ member: m }: { member: TeamMember }) {
  // LinkedIn always shows; it stays a plain icon until the profile URL is added in team.ts
  const links = [
    { Icon: Linkedin, label: "LinkedIn", href: m.linkedin, external: true },
    { Icon: Mail, label: "Email", href: `mailto:${m.email ?? FIRM_EMAIL}`, external: false },
  ];
  const iconClass =
    "flex size-10 items-center justify-center rounded-full border border-white/50 bg-brand-deep/40 text-white backdrop-blur-sm transition-colors duration-300";

  return (
    // The name link stretches over the whole card; the contact icons sit above it (z-10)
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#5b6168]">
        <img
          src={m.photo}
          alt={m.name}
          loading="lazy"
          className={`size-full transition-transform duration-700 ease-out group-hover:scale-105 ${
            m.logo ? "bg-white object-contain p-12" : "object-cover object-top"
          }`}
        />

        {/* Hover: a soft top shade with the contact icons sliding in as a column at the top right */}
        <div className="absolute inset-0 bg-gradient-to-bl from-brand-deep/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100 pointer-coarse:opacity-100" />
        <div className="absolute top-4 right-4 z-10 flex translate-x-3 flex-col gap-2.5 opacity-0 transition-all duration-500 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 pointer-coarse:translate-x-0 pointer-coarse:opacity-100 md:top-5 md:right-5">
          {links.map(({ Icon, label, href, external }) =>
            href ? (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={`${m.name} on ${label}`}
                title={label}
                className={`${iconClass} hover:border-gold hover:bg-gold`}
              >
                <Icon className="size-4" />
              </a>
            ) : (
              <span key={label} aria-hidden className={iconClass}>
                <Icon className="size-4" />
              </span>
            ),
          )}
        </div>
      </div>

      <h3 className="mt-6 text-lg leading-snug text-foreground transition-colors duration-300 group-hover:text-brand md:text-xl">
        <Link href={`/team/${m.slug}`} className="after:absolute after:inset-0">
          {m.name}
        </Link>
      </h3>
      {m.title && <p className="mt-1 text-sm leading-snug text-brand">{m.title}</p>}
      {m.credentials && <p className="mt-1 text-sm text-muted-foreground">{m.credentials}</p>}
      <p className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-brand/70 transition-colors group-hover:text-gold">
        View profile{" "}
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
      </p>
    </article>
  );
}
