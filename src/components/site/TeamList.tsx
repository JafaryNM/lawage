import Link from "next/link";
import { ArrowRight, Linkedin, Mail } from "lucide-react";

import { FIRM_EMAIL, type TeamMember } from "@/lib/team";

/**
 * Wide profile cards for the Team page: photo on the left, title, bio preview and expertise on
 * the right. The whole card opens the profile; the contact icons sit above that link.
 */
export function TeamList({
  members,
  className = "",
}: {
  members: TeamMember[];
  className?: string;
}) {
  return (
    <ul className={`grid gap-6 ${className}`}>
      {members.map((m) => (
        <li key={m.slug}>
          <TeamListCard member={m} />
        </li>
      ))}
    </ul>
  );
}

function TeamListCard({ member: m }: { member: TeamMember }) {
  const preview = m.bio?.[0];
  const tags = m.expertise?.slice(0, 4) ?? [];
  const more = (m.expertise?.length ?? 0) - tags.length;

  return (
    <article className="group relative grid overflow-hidden bg-white shadow-[0_16px_40px_rgba(33,28,79,0.06)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(33,28,79,0.14)] sm:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Gold edge that grows in on hover */}
      <span className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1 origin-top scale-y-0 bg-gold transition-transform duration-500 group-hover:scale-y-100" />

      <div className="relative aspect-[4/3] overflow-hidden bg-[#5b6168] sm:aspect-auto sm:min-h-[300px]">
        <img
          src={m.photo}
          alt={m.name}
          loading="lazy"
          className={`absolute inset-0 size-full transition-transform duration-700 ease-out group-hover:scale-105 ${
            m.logo ? "bg-white object-contain p-10" : "object-cover object-top"
          }`}
        />
      </div>

      <div className="flex flex-col p-6 sm:p-8 lg:p-10">
        <span className="block h-0.5 w-10 bg-gold" />
        <h3 className="mt-5 text-2xl leading-tight text-foreground transition-colors duration-300 group-hover:text-brand md:text-3xl">
          {/* Stretched link: the whole card opens the profile */}
          <Link href={`/team/${m.slug}`} className="after:absolute after:inset-0">
            {m.name}
          </Link>
        </h3>
        {m.title && <p className="mt-2 text-base leading-snug text-brand md:text-lg">{m.title}</p>}
        {m.credentials && <p className="mt-1 text-sm text-muted-foreground">{m.credentials}</p>}

        {preview ? (
          <p className="mt-5 line-clamp-3 text-[0.95rem] leading-relaxed text-muted-foreground">
            {preview}
          </p>
        ) : (
          <p className="mt-5 text-sm italic text-muted-foreground">Full profile coming soon.</p>
        )}

        {tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag} className="bg-[#f4f3f8] px-3 py-1 text-xs text-brand">
                {tag}
              </li>
            ))}
            {more > 0 && <li className="px-1 py-1 text-xs text-muted-foreground">+{more} more</li>}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-brand transition-colors group-hover:text-gold">
            View profile
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>

          <div className="relative z-10 flex gap-2">
            {m.linkedin && (
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.name} on LinkedIn`}
                title="LinkedIn"
                className="flex size-9 items-center justify-center border border-brand/15 text-brand transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <Linkedin className="size-4" />
              </a>
            )}
            <a
              href={`mailto:${m.email ?? FIRM_EMAIL}`}
              aria-label={`Email ${m.name}`}
              title="Email"
              className="flex size-9 items-center justify-center border border-brand/15 text-brand transition-colors hover:border-brand hover:bg-brand hover:text-white"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
