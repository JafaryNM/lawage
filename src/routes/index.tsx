import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Facebook, Twitter, Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FlatIcon, type FlatIconName } from "@/components/site/FlatIcon";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";
import { Partners } from "@/components/site/Partners";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { TEAM } from "@/lib/team";
import { POSTS, formatPostDate } from "@/lib/posts";
import { SERVICES } from "@/lib/services";

import logo from "@/assets/lawage-logo.png";
import about from "@/assets/gavel-books-wooden-desk.jpg";
import servicesBg from "@/assets/services-dots-bg.jpg";
import whyUsBg from "@/assets/scales-of-justice.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LawAge Advocates & Consult | Trusted Legal Excellence for Every Client" },
      {
        name: "description",
        content:
          "LawAge Advocates & Consult is a full-service Tanzanian law firm with offices in Dodoma and Dar es Salaam, delivering practical, innovative and results-oriented legal solutions.",
      },
      { property: "og:title", content: "LawAge Advocates & Consult" },
      {
        property: "og:description",
        content:
          "High-impact legal and advisory solutions across Tanzania, East Africa and international markets.",
      },
      { property: "og:image", content: logo },
      { name: "twitter:image", content: logo },
    ],
  }),
  component: Index,
});

function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Parse numeric part and suffix (e.g. "480+" -> 480 and "+")
  const numericMatch = value.match(/^(\d+)(.*)$/);
  const target = numericMatch ? parseInt(numericMatch[1] ?? "0", 10) : 0;
  const suffix = numericMatch ? (numericMatch[2] ?? "") : "";

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds animation
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) {
              animationFrameId = window.requestAnimationFrame(step);
            }
          };
          animationFrameId = window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target]);

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}

// "What Sets Us Apart" from the firm profile
const SETS_APART: { icon: FlatIconName; title: string; text: string }[] = [
  {
    icon: "location-alt",
    title: "Strategic Presence",
    text: "With offices in Dodoma, Tanzania's administrative capital, and Dar es Salaam, the commercial hub, we serve clients nationwide while engaging closely with government institutions, regulators and the business community.",
  },
  {
    icon: "thin-briefcase-blank",
    title: "Business-Oriented Legal Advice",
    text: "Legal decisions are also business decisions. Our advice is practical, commercially focused, and designed to support growth while protecting our clients' interests.",
  },
  {
    icon: "user-headset",
    title: "Client-Centred Service",
    text: "Every client receives personalized attention, timely communication, and legal solutions tailored to their specific objectives, industry, and risk profile.",
  },
  {
    icon: "thin-users-alt",
    title: "Multidisciplinary Expertise",
    text: "Our lawyers bring experience across diverse practice areas, providing integrated solutions for complex transactions, regulatory compliance, disputes, and investments.",
  },
  {
    icon: "thin-award",
    title: "Integrity & Professional Excellence",
    text: "We uphold the highest ethical standards, maintain strict confidentiality, and consistently deliver with professionalism, accountability, and excellence.",
  },
  {
    icon: "bullseye-arrow",
    title: "Technology-Driven Practice",
    text: "Modern legal technology, secure digital systems, and efficient document management enhance service delivery, improve collaboration, and keep client information secure.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  accent,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <span className="rule-line eyebrow">{eyebrow}</span>
      <h2
        className={`mt-4 max-w-3xl text-4xl leading-[1.15] md:text-5xl ${
          center ? "mx-auto" : ""
        } ${light ? "text-primary-foreground" : "text-foreground"}`}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className={light ? "text-gold" : "text-brand"}>{accent}</span>
          </>
        )}
      </h2>
    </div>
  );
}

function Index() {
  const [heroTheme, setHeroTheme] = useState<"light" | "dark">("light");
  const [activeMember, setActiveMember] = useState(0);
  const teamPausedRef = useRef(false);

  // Rotate the spotlighted attorney unless the visitor is browsing the roster
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!teamPausedRef.current) setActiveMember((i) => (i + 1) % TEAM.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  const member = TEAM[activeMember]!;

  return (
    <div className="min-h-screen bg-background">
      <Header theme={heroTheme} />

      {/* HERO */}
      <HeroSlideshow onThemeChange={setHeroTheme} />

      {/* ABOUT — image with offset gold frame, copy and stats alongside */}
      <section id="about" className="bg-white py-[70px] md:py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20">
          <div className="relative mr-6 mb-6 md:mr-8 md:mb-8">
            <div className="absolute inset-0 translate-x-6 translate-y-6 border-2 border-gold md:translate-x-8 md:translate-y-8" />
            <img
              src={about}
              alt="Judge's gavel resting on a row of law books"
              className="relative aspect-[19/20] w-full object-cover"
              loading="lazy"
              width={2400}
              height={1600}
            />
          </div>

          <div>
            <span className="inline-block bg-muted px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-foreground">
              Who We Are
            </span>
            <h2 className="mt-6 text-4xl leading-[1.15] text-foreground md:text-5xl">
              A Class Above <br className="hidden md:block" />
              <span className="text-brand">Legal Excellence</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              LawAge Advocates is a full-service Tanzanian law firm dedicated to delivering practical,
              innovative, and results-oriented legal solutions to businesses, government institutions,
              development partners, financial institutions, NGOs, and private clients.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              With offices in Dodoma and Dar es Salaam, we combine legal excellence with commercial
              insight to help our clients navigate complex legal and regulatory environments with
              confidence.
            </p>

            <div className="mt-10 grid max-w-xl grid-cols-2 border-t border-gold pt-8">
              <div className="pr-6">
                <p className="font-[var(--font-display)] text-xl text-foreground">Years of Excellence</p>
                <p className="mt-3 font-[var(--font-display)] text-5xl text-foreground md:text-6xl">
                  <AnimatedCounter value="9+" />
                </p>
              </div>
              <div className="border-l border-border pl-6 md:pl-12">
                <p className="font-[var(--font-display)] text-xl text-foreground">Trusted Clients</p>
                <p className="mt-3 font-[var(--font-display)] text-5xl text-foreground md:text-6xl">
                  <AnimatedCounter value="100+" />
                </p>
              </div>
            </div>

            <a href="#team" className="btn-brand mt-10">
              Meet Our Staff <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section
        id="practice"
        className="bg-[#f7f5f2] bg-cover bg-center py-[70px] md:py-24"
        style={{ backgroundImage: `url(${servicesBg})` }}
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center">
            <span className="inline-block bg-[#f0e9e1] px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-foreground">
              Our Services
            </span>
            <h2 className="mt-6 text-4xl leading-[1.15] md:text-5xl text-foreground">
              Our Legal <span className="text-brand">Practice Areas</span>
            </h2>
          </div>

          <div className="mt-14">
            <ServicesGrid limit={4} />
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-brand px-6 py-3.5 text-sm text-white transition-colors duration-300 hover:bg-brand-deep"
            >
              View More <ArrowRight className="size-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US — full-bleed photo banner with strengths and client count */}
      <section id="projects" className="relative overflow-hidden py-[70px] md:py-28">
        <img
          src={whyUsBg}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-deep/85" />

        <div className="relative mx-auto max-w-[1200px] px-6 text-center">
          <span className="inline-flex items-center gap-2.5 border border-gold px-4 py-2 text-sm uppercase tracking-[0.12em] text-white">
            <FlatIcon name="thin-balance-scale-right" className="size-4 text-gold" />
            Why LawAge Advocates?
          </span>
          <h2 className="mx-auto mt-6 max-w-4xl text-4xl leading-[1.15] text-white md:text-5xl">
            Strategic Legal Solutions. Lasting Partnerships. <span className="text-gold">Measurable Results.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/85">
            We do more than provide legal advice—we become trusted partners in our clients' success.
            We combine legal expertise, commercial understanding, and strategic thinking to deliver
            practical solutions that help our clients achieve their objectives while managing legal and
            regulatory risks.
          </p>

          <p className="mt-14 text-[0.72rem] uppercase tracking-[0.22em] text-gold">What Sets Us Apart</p>
          <div className="mt-8 grid gap-10 text-left sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {SETS_APART.map(({ icon, title, text }, i) => (
              <div key={title} className="border-t border-white/20 pt-6">
                <div className="flex items-center justify-between">
                  <FlatIcon name={icon} className="size-11 text-gold" />
                  <span className="font-[var(--font-display)] text-3xl text-white/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-xl text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-8 border border-white/15 bg-black/20 p-8 text-left backdrop-blur-sm md:flex-row md:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <p className="flex items-baseline gap-3 whitespace-nowrap">
                <span className="font-[var(--font-display)] text-5xl text-gold md:text-6xl">
                  <AnimatedCounter value="100+" />
                </span>
                <span className="text-sm uppercase tracking-[0.18em] text-white">Trusted Clients</span>
              </p>
              <p className="max-w-md text-sm leading-relaxed text-white/75">
                Multinational corporations, government institutions, NGOs &amp; civil society,
                financial institutions, SMEs and individuals.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-2 bg-gold px-7 py-4 text-sm uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-white hover:text-brand"
            >
              Book Appointment <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>


      {/* TEAM — spotlight portrait beside a numbered roster */}
      <section id="team" className="section-pad bg-[#f4f3f8]">
        <div className="mx-auto max-w-[1200px] px-6">
          <SectionHeading eyebrow="Our Team" title="Experienced Professionals." accent="Trusted Advisors." center />

          <div
            onMouseEnter={() => (teamPausedRef.current = true)}
            onMouseLeave={() => (teamPausedRef.current = false)}
            className="mt-14 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
          >
            {/* Spotlight */}
            <div className="relative mr-5 mb-5 md:mr-7 md:mb-7">
              <div className="absolute inset-0 translate-x-5 translate-y-5 border-2 border-gold md:translate-x-7 md:translate-y-7" />
              <div className="relative aspect-[4/5] overflow-hidden bg-brand-deep sm:aspect-[5/5] lg:aspect-[4/5]">
                {TEAM.map((m, i) => (
                  <img
                    key={`${m.name}-${i}`}
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className={`absolute inset-0 size-full object-cover object-top transition-all duration-700 ${
                      i === activeMember ? "scale-100 opacity-100" : "scale-105 opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-transparent" />

                <span className="absolute top-5 left-5 bg-gold px-3 py-1.5 font-[var(--font-display)] text-sm tracking-[0.15em] text-white">
                  {String(activeMember + 1).padStart(2, "0")} / {String(TEAM.length).padStart(2, "0")}
                </span>

                <div
                  key={activeMember}
                  className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 md:p-8"
                >
                  <div>
                    <span className="block h-0.5 w-10 bg-gold" />
                    <h3 className="mt-4 text-2xl leading-tight text-white md:text-3xl">{member.name}</h3>
                    <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-white/80">{member.role}</p>
                  </div>
                  <div className="flex gap-2">
                    {[
                      { Icon: Linkedin, label: "LinkedIn" },
                      { Icon: Twitter, label: "Twitter" },
                      { Icon: Facebook, label: "Facebook" },
                    ].map(({ Icon, label }) => (
                      <a
                        key={label}
                        href="#"
                        aria-label={`${member.name} ${label}`}
                        className="flex size-9 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-gold hover:bg-gold"
                      >
                        <Icon className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Roster */}
            <ol className="divide-y divide-brand/10 border-y border-brand/10">
              {TEAM.map((m, i) => {
                const isActive = i === activeMember;
                return (
                  <li key={`${m.name}-${i}`}>
                    <button
                      type="button"
                      onClick={() => setActiveMember(i)}
                      aria-current={isActive}
                      className={`group relative flex w-full cursor-pointer items-center gap-5 px-4 py-4 text-left transition-colors duration-300 ${
                        isActive ? "bg-brand" : "hover:bg-white"
                      }`}
                    >
                      <span
                        className={`absolute inset-y-0 left-0 w-1 bg-gold transition-opacity ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <span
                        className={`w-7 font-[var(--font-display)] text-sm ${
                          isActive ? "text-gold" : "text-brand/50"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <img
                        src={m.photo}
                        alt=""
                        loading="lazy"
                        className={`size-12 shrink-0 rounded-full object-cover object-top ring-2 transition-all ${
                          isActive ? "ring-gold" : "ring-transparent grayscale group-hover:grayscale-0"
                        }`}
                      />
                      <span className="min-w-0 flex-1">
                        <span className={`block truncate text-lg ${isActive ? "text-white" : "text-foreground"}`}>
                          {m.name}
                        </span>
                        <span
                          className={`block text-xs uppercase tracking-[0.15em] ${
                            isActive ? "text-white/70" : "text-muted-foreground"
                          }`}
                        >
                          {m.role}
                        </span>
                      </span>
                      <ArrowUpRight
                        className={`size-5 shrink-0 transition-all duration-300 ${
                          isActive ? "rotate-45 text-gold" : "text-brand/40 group-hover:text-gold"
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <Partners />

      {/* INSIGHTS — featured article beside two compact ones */}
      <section id="insights" className="section-pad bg-[#f4f3f8]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Legal Insights" title="Our Latest" accent="Commentary" />
            <Link
              to="/blog"
              className="group inline-flex shrink-0 items-center gap-2 border-b border-brand/30 pb-1 text-[0.72rem] uppercase tracking-[0.22em] text-brand transition-colors hover:border-gold hover:text-gold"
            >
              View All Insights
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </div>

          {(() => {
            const [featured, ...rest] = [...POSTS]
              .sort((a, b) => b.date.localeCompare(a.date))
              .slice(0, 3);
            if (!featured) return null;
            const areaTitle = (slug: string) => SERVICES.find((sv) => sv.slug === slug)?.title;
            const day = (iso: string) => iso.slice(8, 10);
            const month = (iso: string) =>
              new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { month: "short" });

            return (
              <div className="mt-14 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
                {/* Featured */}
                <Link
                  to="/blog/$slug"
                  params={{ slug: featured.slug }}
                  className="group relative flex min-h-[480px] flex-col justify-end overflow-hidden"
                >
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/60 to-brand-deep/5" />

                  <span className="absolute top-6 left-6 flex flex-col items-center bg-gold px-4 py-3 text-white">
                    <span className="font-[var(--font-display)] text-3xl leading-none">{day(featured.date)}</span>
                    <span className="mt-1 text-[0.65rem] uppercase tracking-[0.2em]">{month(featured.date)}</span>
                  </span>

                  <div className="relative p-7 md:p-10">
                    <span className="inline-block bg-white/15 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                      {areaTitle(featured.area)}
                    </span>
                    <h3 className="mt-4 text-2xl leading-snug text-white md:text-[2rem]">{featured.title}</h3>
                    <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/75">
                      {featured.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-gold">
                      Read Article
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </div>
                </Link>

                {/* Compact list */}
                <div className="grid gap-8">
                  {rest.map((post) => (
                    <Link
                      key={post.slug}
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="group grid overflow-hidden bg-white transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(33,28,79,0.12)] sm:grid-cols-[42%_1fr]"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto">
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col p-6 md:p-7">
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                          {areaTitle(post.area)}
                        </span>
                        <h3 className="mt-3 text-xl leading-snug text-foreground transition-colors group-hover:text-brand">
                          {post.title}
                        </h3>
                        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                          <span className="text-xs text-muted-foreground">{formatPostDate(post.date)}</span>
                          <span className="flex size-9 items-center justify-center rounded-full border border-brand/20 text-brand transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-white">
                            <ArrowUpRight className="size-4" strokeWidth={1.5} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      <Footer />
    </div>
  );
}
