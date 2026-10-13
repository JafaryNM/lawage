import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  Facebook,
  Gavel,
  Globe,
  Handshake,
  Landmark,
  Scale,
  ShieldCheck,
  Twitter,
  Users,
  Linkedin,
  Instagram,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";

import logo from "@/assets/darton-logo.png";
import t1 from "@/assets/t1.jpg";
import t2 from "@/assets/t2.jpg";
import t3 from "@/assets/t3.jpg";
import northvale from "@/assets/partners/northvale.svg";
import asterion from "@/assets/partners/asterion.svg";
import kivuko from "@/assets/partners/kivuko.svg";
import lumora from "@/assets/partners/lumora.svg";
import vantera from "@/assets/partners/vantera.svg";
import oakline from "@/assets/partners/oakline.svg";
import about from "@/assets/judges-gavel-book-wooden-table-law-justice-concept-background.jpg";
import b1 from "@/assets/imagesv2.jpg";
import b2 from "@/assets/images.jpg";
import b3 from "@/assets/business-partners-sitting-cafe.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Darton Attorneys | Law Firm in Dar es Salaam, Tanzania" },
      {
        name: "description",
        content:
          "Darton Attorneys is a Dar es Salaam law firm advising on corporate, litigation, land, family, employment and tax matters in Tanzania.",
      },
      { property: "og:title", content: "Darton Attorneys | Law Firm in Dar es Salaam" },
      {
        property: "og:description",
        content:
          "Trusted Tanzanian advocates for corporate, litigation, land, family, employment and tax matters.",
      },
      { property: "og:image", content: logo },
      { name: "twitter:image", content: logo },
    ],
  }),
  component: Index,
});

const PRACTICE = [
  {
    icon: Building2,
    title: "Corporate & Commercial",
    text: "Company formation, governance, contracts, mergers and regulatory compliance for Tanzanian and foreign businesses.",
  },
  {
    icon: Gavel,
    title: "Litigation & Arbitration",
    text: "Robust representation before Tanzanian courts and tribunals, and in commercial arbitration proceedings.",
  },
  {
    icon: Landmark,
    title: "Land & Property Law",
    text: "Title verification, conveyancing, leases, land disputes and real estate transaction structuring.",
  },
  {
    icon: Users,
    title: "Family Law",
    text: "Matrimonial matters, custody, succession and estate administration handled with discretion and care.",
  },
  {
    icon: Handshake,
    title: "Employment & Labour",
    text: "Contracts, disciplinary processes, restructuring and representation at the Commission for Mediation.",
  },
  {
    icon: ShieldCheck,
    title: "Tax & Regulatory",
    text: "Tax planning, TRA disputes, licensing and advisory on Tanzania's evolving regulatory framework.",
  },
];

// Sample photos — replace with the attorneys' real portraits.
const TEAM = [
  { name: "Amb. Mwanaidi Sinare Maajar", role: "Chair and Partner", photo: t2 },
  { name: "Dr. Alex Thomas Nguluma", role: "Managing Partner", photo: t1 },
  { name: "Hon. Dr. Fauz Twaib", role: "Senior Partner", photo: t3 },
  // Demo entries to fill the slideshow — replace with real team members.
  { name: "Neema Kassim", role: "Senior Associate", photo: t2 },
  { name: "Baraka Mollel", role: "Associate", photo: t1 },
  { name: "Daniel Mushi", role: "Associate", photo: t3 },
];

// Demo partner logos (fictional brands) — replace with the firm's real partners.
const PARTNERS = [
  { name: "Northvale Holdings", logo: northvale },
  { name: "Asterion Capital", logo: asterion },
  { name: "Kivuko Trust", logo: kivuko },
  { name: "Lumora", logo: lumora },
  { name: "Vantera Insurance", logo: vantera },
  { name: "Oakline & Co", logo: oakline },
];

const POSTS = [
  {
    img: b1,
    tag: "Corporate",
    title: "Understanding the Companies Act obligations for directors",
    date: "12 August 2026",
  },
  {
    img: b2,
    tag: "Property",
    title: "Land title verification in Dar es Salaam: what to check first",
    date: "28 July 2026",
  },
  {
    img: b3,
    tag: "Contracts",
    title: "Drafting enforceable commercial contracts under Tanzanian law",
    date: "09 July 2026",
  },
];

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
      { threshold: 0.1 }
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

  return <span ref={elementRef}>{count}{suffix}</span>;
}

function SectionHeading({
  eyebrow,
  title,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
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
      </h2>
    </div>
  );
}



function Index() {
  const [heroTheme, setHeroTheme] = useState<"light" | "dark">("light");
  const teamTrackRef = useRef<HTMLDivElement>(null);
  const teamPausedRef = useRef(false);

  // Move the team slideshow by one card, wrapping around at either end
  const slideTeam = (direction: 1 | -1) => {
    const track = teamTrackRef.current;
    const card = track?.querySelector("article");
    if (!track || !card) return;
    const step = card.offsetWidth + 32; // card width + gap-8
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (direction === 1 && track.scrollLeft >= maxScroll - 4) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction === -1 && track.scrollLeft <= 4) {
      track.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      track.scrollBy({ left: direction * step, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!teamPausedRef.current) slideTeam(1);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header theme={heroTheme} />

      {/* HERO */}
      <HeroSlideshow onThemeChange={setHeroTheme} />


      {/* ABOUT — card overlapping the bottom of the hero */}
      <section id="about" className="relative z-20 -mt-16 md:-mt-24 px-6">
        <div className="mx-auto grid max-w-[1400px] overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] lg:grid-cols-2">
          <div className="p-8 md:p-14">
            <SectionHeading eyebrow="Who We Are" title="A Leading Law Firm Rooted In Tanzania" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Darton Attorneys delivers legal counsel that is rigorous, honest and on time. From
              our Dar es Salaam chambers we serve corporations, institutions and individuals with
              the same standard of diligence.
            </p>
            <a href="#team" className="btn-brand mt-10">
              Meet Our Attorneys
            </a>
          </div>

          <div className="relative min-h-[320px] lg:min-h-0">
            <img
              src={about}
              alt="Managing partner of Darton Attorneys in the firm's law library"
              className="absolute inset-0 size-full object-cover"
              loading="lazy"
              width={912}
              height={1104}
            />
            <div className="absolute bottom-0 left-0 bg-brand px-10 py-8 text-primary-foreground">
              <p className="font-[var(--font-display)] text-5xl text-white">
                <AnimatedCounter value="14+" />
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.22em]">Years of practice</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section id="practice" className="bg-background py-[70px]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center">
            <span className="rule-line eyebrow">Our Services</span>
            <h2 className="mt-4 text-4xl leading-[1.15] md:text-5xl text-foreground">
              Our Legal Practice Areas
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICE.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="group flex gap-6 rounded-[8px] bg-brand p-8 md:p-10 transition-colors duration-300 hover:bg-brand-deep"
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
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <a
              href="#get-involved"
              className="inline-flex items-center gap-2 bg-brand px-6 py-3.5 text-sm text-white transition-colors duration-300 hover:bg-brand-deep"
            >
              View All Practice Areas <ArrowRight className="size-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      {/* COUNTERS */}
      <section id="projects" className="bg-brand py-[70px]">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <span className="rule-line font-display text-[1.05rem] uppercase tracking-[0.28em] text-white">
            Our Track Record
          </span>
          <h2 className="mt-4 text-4xl leading-[1.15] text-white md:text-5xl">
            Results That Speak For Themselves
          </h2>
        </div>
        <div className="mx-auto mt-14 grid max-w-[1400px] gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Briefcase, value: "480+", label: "Matters concluded" },
            { icon: Users, value: "320+", label: "Clients advised" },
            { icon: Award, value: "14", label: "Years in practice" },
            { icon: Scale, value: "9", label: "Practice areas" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <Icon className="size-11 text-white" strokeWidth={1.2} />
              <p className="mt-5 font-[var(--font-display)] text-5xl text-white">
                <AnimatedCounter value={value} />
              </p>
              <p className="mt-2 text-[0.72rem] uppercase tracking-[0.22em] text-primary-foreground/75">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="section-pad bg-[#f0f0f0]">
        <div className="mx-auto max-w-[1200px] px-6">
          <SectionHeading eyebrow="Meet Our People" title="Leading Experts" center />

          <div
            ref={teamTrackRef}
            onMouseEnter={() => (teamPausedRef.current = true)}
            onMouseLeave={() => (teamPausedRef.current = false)}
            className="scrollbar-none mt-14 flex snap-x snap-mandatory gap-8 overflow-x-auto"
          >
            {TEAM.map((m) => (
              <article
                key={m.name}
                className="group w-full shrink-0 snap-start overflow-hidden rounded-[8px] sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]"
              >
                <div className="relative aspect-[11/10] overflow-hidden bg-muted">
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Social links slide up on hover */}
                  <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-full items-center gap-6 rounded-t-[6px] bg-white px-7 py-3 text-brand transition-transform duration-300 group-hover:translate-y-0">
                    {[
                      { Icon: Facebook, label: "Facebook" },
                      { Icon: Twitter, label: "Twitter" },
                      { Icon: Linkedin, label: "LinkedIn" },
                      { Icon: Instagram, label: "Instagram" },
                    ].map(({ Icon, label }) => (
                      <a
                        key={label}
                        href="#"
                        aria-label={`${m.name} ${label}`}
                        className="transition-colors hover:text-brand-deep"
                      >
                        <Icon className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="bg-brand px-6 py-7 text-center">
                  <h3 className="text-xl text-white">{m.name}</h3>
                  <p className="mt-1.5 text-sm text-white/75">{m.role}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center gap-4">
            <button
              type="button"
              onClick={() => slideTeam(-1)}
              className="flex size-11 items-center justify-center rounded-full border border-brand/40 text-brand transition-colors hover:bg-brand hover:text-white"
              aria-label="Previous team members"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => slideTeam(1)}
              className="flex size-11 items-center justify-center rounded-full border border-brand/40 text-brand transition-colors hover:bg-brand hover:text-white"
              aria-label="Next team members"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="bg-white py-[70px]">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHeading eyebrow="Our Partners" title="Trusted Affiliations" center />

          {/* Logo slideshow: the list is rendered twice so the loop is seamless */}
          <div className="partners-marquee mt-14 overflow-hidden">
            <div className="partners-track flex w-max items-center">
              {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                <div
                  key={`${partner.name}-${i}`}
                  aria-hidden={i >= PARTNERS.length}
                  className="flex h-20 w-[180px] shrink-0 items-center justify-center px-6 md:w-[240px]"
                >
                  <img
                    src={partner.logo}
                    alt={i < PARTNERS.length ? partner.name : ""}
                    className="max-h-16 w-auto max-w-full object-contain grayscale opacity-60 transition duration-300 hover:grayscale-0 hover:opacity-100"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section id="insights" className="section-pad bg-[#f0f0f0]">
        <div className="mx-auto max-w-[1200px] px-6">
          <SectionHeading eyebrow="Legal Insights" title="Our Latest Commentary" center />
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => (
              <a
                key={post.title}
                href="#insights"
                className="group relative block aspect-[19/20] overflow-hidden rounded-[8px]"
              >
                <img
                  src={post.img}
                  alt={post.title}
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                {/* Details: always shown on touch screens, revealed on hover on desktop */}
                <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-brand-deep/95 via-brand-deep/60 to-brand-deep/20 p-8 text-center transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100">
                  <div className="transition-transform duration-500 lg:translate-y-4 lg:group-hover:translate-y-0">
                    <h3 className="text-2xl leading-snug text-white">{post.title}</h3>
                    <p className="mt-3 text-sm text-white/80">
                      {post.tag} · {post.date}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
