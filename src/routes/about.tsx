import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, CircleCheck, Facebook, Instagram, Linkedin, Plus, Twitter } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FlatIcon, type FlatIconName } from "@/components/site/FlatIcon";
import { PageBanner } from "@/components/site/PageBanner";
import { Partners } from "@/components/site/Partners";
import { TEAM } from "@/lib/team";

import logo from "@/assets/lawage-logo.png";
import storyImg from "@/assets/about-judge-writing.jpg";
import whyImg from "@/assets/about-advocate-reading.jpg";
import edgeBg from "@/assets/about-gavel-closeup.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | LawAge Advocates & Consult" },
      {
        name: "description",
        content:
          "LawAge Advocates & Consult is a modern, results-driven law firm headquartered in Tanzania, with offices in Dodoma and Dar es Salaam.",
      },
      { property: "og:title", content: "About Us | LawAge Advocates & Consult" },
      { property: "og:image", content: logo },
      { name: "twitter:image", content: logo },
    ],
  }),
  component: About,
});

const SOCIALS = [
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Instagram, label: "Instagram" },
];

// Where the firm works
const FOCUS_AREAS = ["Law", "Business & Investment", "Human Rights & Development", "Governance & Accountability"];

// "Our Unique Edge": the three pillars of the firm's approach
const PILLARS: { icon: FlatIconName; title: string; points: string[] }[] = [
  {
    icon: "compass-alt",
    title: "Strategic Integration",
    points: [
      "Legal compliance combined with business strategy",
      "Governance aligned with regulatory advisory",
      "Law integrated with development frameworks",
    ],
  },
  {
    icon: "bullseye-arrow",
    title: "Forward-Thinking Advisory",
    points: [
      "Business and human rights integration",
      "Risk mitigation and sustainability",
      "Policy and regulatory influence",
    ],
  },
  {
    icon: "thin-award",
    title: "Impact-Driven Solutions",
    points: [
      "Stronger compliance systems",
      "Reduced operational and legal risk",
      "Alignment with international standards",
    ],
  },
];

const REASONS: { icon: FlatIconName; title: string; points: string[] }[] = [
  {
    icon: "handshake-trust",
    title: "Client-Centered Excellence",
    points: ["Tailored legal solutions", "Dedicated client engagement", "Long-term partnership approach"],
  },
  {
    icon: "user-headset",
    title: "Smart & Modern",
    points: [
      "Technology-driven legal practice",
      "Efficient communication systems",
      "Timely and responsive service",
    ],
  },
];

function UniqueEdge() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative isolate overflow-hidden py-[70px] text-white md:py-28">
      <img src={edgeBg} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-10 size-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-deep via-brand-deep/90 to-brand-deep/70" />

      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Intro */}
        <div>
          <span className="inline-block border border-gold px-4 py-2 text-xs uppercase tracking-[0.12em]">
            Our Unique Edge
          </span>
          <h2 className="mt-6 text-4xl leading-[1.15] md:text-5xl">
            An Integrated, <span className="text-gold">Multidisciplinary</span> Approach
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">
            Our strength lies in bringing law, business strategy and development thinking together,
            so every solution is legally sound and strategically valuable.
          </p>

          <blockquote className="mt-10 border-l-4 border-gold pl-6">
            <p className="font-[var(--font-display)] text-2xl leading-snug md:text-[1.7rem]">
              Excellence is not an option — it is our standard.
            </p>
            <footer className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-white/60">
              LawAge Advocates &amp; Consult
            </footer>
          </blockquote>
        </div>

        {/* Pillars */}
        <div className="space-y-4">
          {PILLARS.map(({ title, points }, i) => {
            const isOpen = i === open;
            return (
              <div
                key={title}
                className={`overflow-hidden border backdrop-blur-md transition-colors duration-300 ${
                  isOpen ? "border-gold/70 bg-white/[0.12]" : "border-white/15 bg-white/[0.05] hover:bg-white/[0.09]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center gap-5 px-6 py-5 text-left md:px-8 md:py-6"
                >
                  <span
                    className={`font-[var(--font-display)] text-4xl leading-none transition-colors md:text-5xl ${
                      isOpen ? "text-gold" : "text-white/25"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-xl md:text-2xl">{title}</span>
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen ? "rotate-45 border-gold bg-gold" : "border-white/30"
                    }`}
                  >
                    <Plus className="size-4" strokeWidth={1.75} />
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-7 md:px-8">
                      <ul className="space-y-3">
                        {points.map((p) => (
                          <li key={p} className="flex gap-3 text-[0.95rem] leading-relaxed text-white/85">
                            <CircleCheck className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.75} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageBanner title="About Us" crumbs={[{ label: "About Us" }]} />

      {/* WHO WE ARE */}
      <section className="section-pad">
        <div className="mx-auto grid max-w-[1200px] items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20">
          <div className="relative mr-6 mb-6 md:mr-8 md:mb-8">
            <div className="absolute inset-0 translate-x-6 translate-y-6 border-2 border-gold md:translate-x-8 md:translate-y-8" />
            <img
              src={storyImg}
              alt="Judge writing at her desk in a law library"
              className="relative aspect-[19/20] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-2 left-6 bg-brand px-7 py-6 text-white md:left-8">
              <p className="font-[var(--font-display)] text-5xl leading-none text-gold">9+</p>
              <p className="mt-2 text-[0.7rem] uppercase tracking-[0.2em] text-white/80">
                Years of Proven
                <br />
                Excellence
              </p>
            </div>
          </div>

          <div>
            <span className="inline-block bg-muted px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-foreground">
              Who We Are
            </span>
            <h2 className="mt-6 text-4xl leading-[1.15] text-foreground md:text-5xl">
              A Modern, <span className="text-brand">Results-Driven</span> Law Firm
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              LawAge Advocates &amp; Consult is a modern, results-driven law firm headquartered in
              Tanzania. We combine legal expertise, commercial insight and development intelligence
              to deliver solutions that are legally sound and strategically valuable.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We are more than legal advisors. We are long-term partners in your growth, protection
              and success.
            </p>

            <p className="mt-8 text-[0.72rem] uppercase tracking-[0.2em] text-brand">We operate at the intersection of</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {FOCUS_AREAS.map((title) => (
                <div key={title} className="flex items-center gap-3 border border-border px-4 py-3.5">
                  <CircleCheck className="size-5 shrink-0 text-gold" strokeWidth={1.75} />
                  <span className="text-sm leading-snug text-foreground">{title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR UNIQUE EDGE — photo background with an interactive pillar panel */}
      <UniqueEdge />

      {/* WHY CHOOSE US */}
      <section className="section-pad bg-[#f4f3f8]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-6 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="inline-block bg-white px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-foreground">
              Why Choose Us
            </span>
            <h2 className="mt-6 text-4xl leading-[1.15] text-foreground md:text-5xl">
              Rooted in Tanzania. <span className="text-brand">Serving Africa.</span> Positioned Globally.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              With over 9 years of proven excellence, LawAge Advocates &amp; Consult is a leading
              full-service law firm delivering high-impact legal and advisory solutions across
              Tanzania, East Africa and international markets. We advise corporates, investors,
              governments and development partners in navigating complex legal, regulatory and
              business environments.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {REASONS.map(({ icon, title, points }) => (
                <div key={title} className="bg-white p-6">
                  <FlatIcon name={icon} className="size-9 text-brand" />
                  <h3 className="mt-4 text-xl text-foreground">{title}</h3>
                  <ul className="mt-3 space-y-2">
                    {points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm text-muted-foreground">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Link to="/contact" className="btn-brand mt-10">
              Let's Talk <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="relative">
            <img
              src={whyImg}
              alt="Advocate reviewing legal papers at his desk"
              className="aspect-[4/5] w-full object-cover object-top lg:aspect-[5/6]"
              loading="lazy"
            />
            <div className="absolute right-0 bottom-0 max-w-[260px] bg-gold p-7 text-white">
              <p className="font-[var(--font-display)] text-5xl leading-none">100+</p>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                Trusted clients, from multinationals and government institutions to NGOs, SMEs and
                individuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR TEAM */}
      <section id="team" className="section-pad">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center">
            <span className="rule-line eyebrow">Our Team</span>
            <h2 className="mx-auto mt-4 max-w-3xl text-4xl leading-[1.15] text-foreground md:text-5xl">
              The People Behind <span className="text-brand">LawAge</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              A multidisciplinary team of legal professionals and support staff, structured to
              deliver precision, efficiency and strategic value to our clients.
            </p>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-14">
            {TEAM.map((m) => (
              <article key={m.name} className="group relative w-full sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-muted">
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/75 via-brand-deep/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Social links slide in from the right on hover (always shown on touch screens) */}
                  <div className="absolute right-4 top-4 flex flex-col gap-2">
                    {SOCIALS.map(({ Icon, label }, i) => (
                      <a
                        key={label}
                        href="#"
                        aria-label={`${m.name} ${label}`}
                        style={{ transitionDelay: `${i * 60}ms` }}
                        className="flex size-10 items-center justify-center rounded-full bg-white text-brand shadow-md transition-all duration-300 hover:bg-brand hover:text-white lg:translate-x-16 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100"
                      >
                        <Icon className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Name label overlapping the bottom of the photo */}
                <div className="relative mx-5 -mt-14 rounded-[6px] border-l-4 border-gold bg-white px-6 py-5 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-colors duration-300 group-hover:bg-brand">
                  <h3 className="text-xl leading-snug text-foreground transition-colors duration-300 group-hover:text-white">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-brand transition-colors duration-300 group-hover:text-white/80">
                    {m.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Partners />

      <Footer />
    </div>
  );
}
