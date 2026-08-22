import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Facebook,
  Gavel,
  Globe,
  Handshake,
  Heart,
  Home,
  Landmark,
  Minus,
  Plus,
  Quote,
  Scale,
  ShieldCheck,
  Twitter,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";

import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import t1 from "@/assets/t1.jpg";
import t2 from "@/assets/t2.jpg";
import t3 from "@/assets/t3.jpg";
import b1 from "@/assets/b1.jpg";
import b2 from "@/assets/b2.jpg";
import b3 from "@/assets/b3.jpg";
import c1 from "@/assets/c1.jpg";
import c2 from "@/assets/c2.jpg";

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
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
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

const SERVICES = [
  { img: p1, title: "Corporate Advisory", href: "#practice" },
  { img: p2, title: "Court Litigation", href: "#practice" },
  { img: p3, title: "Family Matters", href: "#practice" },
  { img: p4, title: "Land & Conveyancing", href: "#practice" },
];

const PROJECTS = [
  { img: c1, title: "Cross-Border Acquisition", tag: "Corporate", tall: true },
  { img: p1, title: "Banking Facility Advisory", tag: "Finance", tall: false },
  { img: c2, title: "High Court Appeal Win", tag: "Litigation", tall: false },
  { img: p4, title: "Industrial Land Title", tag: "Property", tall: true },
  { img: p3, title: "Estate Administration", tag: "Family", tall: false },
  { img: p2, title: "Regulatory Compliance", tag: "Advisory", tall: false },
];

const TAG_ICONS: Record<string, any> = {
  Corporate: Building2,
  Finance: Landmark,
  Litigation: Scale,
  Property: Home,
  Family: Users,
  Advisory: ShieldCheck,
};

const MILESTONES = [
  { year: "2012", title: "Firm Founded", text: "Darton Attorneys opens its doors in Dar es Salaam." },
  { year: "2015", title: "Corporate Desk", text: "Dedicated corporate and commercial practice established." },
  { year: "2018", title: "Litigation Growth", text: "Appearances extended across the High Court divisions." },
  { year: "2021", title: "Land Practice", text: "Specialist land and conveyancing team introduced." },
  { year: "2024", title: "Regional Reach", text: "Advisory work extended across the East African region." },
];

const TEAM = [
  { img: t1, name: "Adv. Daniel Mushi", role: "Managing Partner" },
  { img: t2, name: "Adv. Neema Kilonzo", role: "Partner — Corporate" },
  { img: t3, name: "Adv. Baraka Mwakyusa", role: "Senior Associate — Litigation" },
];

const TESTIMONIALS = [
  {
    img: t2,
    name: "Iliena Mwangosi",
    role: "Managing Director, Logistics",
    text: "Darton Attorneys restructured our shareholding and commercial contracts with real precision. Their advice was practical, timely and commercially aware at every stage.",
  },
  {
    img: t1,
    name: "Joseph Thomas",
    role: "Finance Director",
    text: "They represented us in a tax dispute and kept us informed. The outcome exceeded what we thought was realistic.",
  },
  {
    img: p3,
    name: "Grace Ndosi",
    role: "Private Client",
    text: "A difficult family matter handled with dignity and complete confidentiality. I always felt heard and properly advised.",
  },
];

const POSTS = [
  {
    img: b1,
    tag: "Corporate",
    title: "Understanding the Companies Act obligations for directors",
    desc: "Key directors' duties under the Tanzanian Companies Act, including filing requirements and regulatory liabilities.",
    date: "12 August 2026",
    likes: 65,
  },
  {
    img: b2,
    tag: "Property",
    title: "Land title verification in Dar es Salaam: what to check first",
    desc: "A practical guide to checking land registry indexes, planning details and title certificates in Dar es Salaam.",
    date: "28 July 2026",
    likes: 42,
  },
  {
    img: b3,
    tag: "Contracts",
    title: "Drafting enforceable commercial contracts under Tanzanian law",
    desc: "Critical elements to ensure commercial agreements are binding and fully enforceable under local statutes.",
    date: "09 July 2026",
    likes: 58,
  },
];

const FAQS = [
  {
    q: "How do I book a consultation with Darton Attorneys?",
    a: "Send an enquiry through the form on this page or call our Dar es Salaam office. We respond to every enquiry within one working day and will confirm a consultation slot with the relevant attorney.",
  },
  {
    q: "How are your legal fees structured?",
    a: "Depending on the matter we work on hourly rates, fixed fees or agreed milestones. You receive a written engagement letter setting out the scope and fees before any work begins.",
  },
  {
    q: "Do you handle matters outside Dar es Salaam?",
    a: "Yes. We act for clients across Tanzania and coordinate with correspondent counsel in other jurisdictions in the East African region where required.",
  },
  {
    q: "Is my information kept confidential?",
    a: "Absolutely. All communications are covered by advocate-client privilege and handled under strict internal confidentiality protocols.",
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
      <span className="rule-gold eyebrow">{eyebrow}</span>
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
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [heroTheme, setHeroTheme] = useState<"light" | "dark">("light");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const projectsScrollRef = useRef<HTMLDivElement>(null);

  const scrollProjects = (direction: "left" | "right") => {
    if (projectsScrollRef.current) {
      const { scrollLeft, clientWidth } = projectsScrollRef.current;
      const scrollAmount = clientWidth * 0.4;
      const targetScroll = direction === "left"
        ? scrollLeft - scrollAmount
        : scrollLeft + scrollAmount;
      projectsScrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  };

  const handleProjectsScroll = () => {
    if (projectsScrollRef.current) {
      const { scrollLeft } = projectsScrollRef.current;
      const cardWidth = window.innerWidth >= 768 ? 604 : 334;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveProjectIndex(Math.min(Math.max(index, 0), PROJECTS.length - 1));
    }
  };

  useEffect(() => {
    let intervalId: number;
    const startAutoScroll = () => {
      intervalId = window.setInterval(() => {
        if (projectsScrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = projectsScrollRef.current;
          const cardWidth = window.innerWidth >= 768 ? 604 : 334;
          
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            projectsScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            projectsScrollRef.current.scrollTo({ left: scrollLeft + cardWidth, behavior: "smooth" });
          }
        }
      }, 6000);
    };
    startAutoScroll();
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header theme={heroTheme} />

      {/* HERO */}
      <HeroSlideshow onThemeChange={setHeroTheme} />


      {/* PRACTICE AREAS */}
      <section id="practice" className="section-pad">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading eyebrow="Our Services" title="Our Legal Practice Areas" />
            <a href="#get-involved" className="btn-gold">
              Read More
            </a>
          </div>

          <div className="mt-14 grid bg-background sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICE.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="group bg-background p-10"
              >
                <div className="transition-transform duration-300 group-hover:-translate-y-2 flex flex-col h-full">
                  <Icon
                    className="size-11 text-gold"
                    strokeWidth={1.2}
                  />
                  <h3 className="mt-6 text-2xl text-foreground">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground flex-grow">
                    {text}
                  </p>
                  <a
                    href="#get-involved"
                    className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-gold"
                  >
                    Read More <ArrowRight className="size-4" strokeWidth={1.5} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-pad bg-muted">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Who We Are" title="A Leading Law Firm Rooted In Tanzania" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Darton Attorneys was founded on a simple conviction: clients deserve legal counsel
              that is rigorous, honest and delivered on time. From our Dar es Salaam chambers we
              serve corporations, financial institutions, public bodies and individuals with the
              same standard of diligence.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Our practice combines a deep grasp of Tanzanian statute and precedent with a
              commercial understanding of the sectors our clients operate in.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Integrity in every engagement",
                "Commercially grounded advice",
                "Responsive client service",
                "Proven courtroom record",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <Scale className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.6} />
                  {item}
                </li>
              ))}
            </ul>
            <a href="#team" className="btn-gold mt-10">
              Meet Our Attorneys
            </a>
          </div>

          <div className="relative">
            <img
              src={about}
              alt="Managing partner of Darton Attorneys in the firm's law library"
              className="w-full object-cover"
              loading="lazy"
              width={912}
              height={1104}
            />
            <div className="absolute bottom-0 left-0 bg-navy px-10 py-8 text-primary-foreground">
              <p className="font-[var(--font-display)] text-5xl text-gold">
                <AnimatedCounter value="14+" />
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.22em]">Years of practice</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section-pad">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHeading
            eyebrow="What We Do"
            title="A Passion For Justice, The Experience To Win"
            center
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <a key={s.title} href={s.href} className="group relative block overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 bg-navy-deep/45 transition-colors duration-300 group-hover:bg-navy-deep/70" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="text-2xl text-primary-foreground">{s.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-gold">
                    Click Here <ArrowRight className="size-4" strokeWidth={1.5} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS / CASE STUDIES */}
      <section id="projects" className="section-pad bg-navy-deep overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-12 items-center">
          <div>
            <span className="rule-gold eyebrow">Our Projects</span>
            <h2 className="mt-4 text-4xl leading-[1.15] md:text-5xl text-primary-foreground font-display">
              Selected Matters <br /> We Have <span className="italic font-medium">Handled.</span>
            </h2>
            
            {/* Navigation Arrow Buttons & Page Indicator */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => scrollProjects("left")}
                  className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold hover:text-navy-deep transition-all duration-300 cursor-pointer"
                  aria-label="Previous project"
                >
                  <ArrowLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollProjects("right")}
                  className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold hover:text-navy-deep transition-all duration-300 cursor-pointer"
                  aria-label="Next project"
                >
                  <ArrowRight className="size-5" />
                </button>
              </div>
              
              {/* Circular Page Indicator */}
              <div className="relative flex size-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-semibold font-display text-white">
                {activeProjectIndex + 1}/{PROJECTS.length}
              </div>
            </div>
          </div>

          {/* Scroll container on the right */}
          <div
            ref={projectsScrollRef}
            onScroll={handleProjectsScroll}
            className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4"
            style={{ scrollbarWidth: "none" }}
          >
            {PROJECTS.map((p, i) => {
              const Icon = TAG_ICONS[p.tag] || ShieldCheck;
              const isEven = i % 2 !== 0;
              return (
                <article
                  key={i}
                  className="group relative flex w-[310px] md:w-[580px] h-[350px] shrink-0 snap-start overflow-hidden border border-white/5 bg-background shadow-md animate-in fade-in duration-300"
                >
                  {/* Left half: Image */}
                  <div className="w-2/5 md:w-1/2 h-full overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Right half: Text Content Box */}
                  <div className={`w-3/5 md:w-1/2 h-full p-6 md:p-8 flex flex-col justify-between relative transition-colors duration-300 ${
                    isEven
                      ? "bg-navy-deep text-primary-foreground"
                      : "bg-background text-foreground"
                  }`}>
                    <div>
                      <h3 className="text-lg md:text-xl font-display leading-snug tracking-tight">
                        {p.title}
                      </h3>
                      <p className={`mt-3 text-xs leading-relaxed line-clamp-4 ${
                        isEven ? "text-primary-foreground/75" : "text-muted-foreground"
                      }`}>
                        Diam magna consectetur nunc tristique consequat. Integer venenatis nec rutrum. We provide diligent legal advocacy to resolve complex dispute scenarios and ensure regulatory compliance.
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-end mt-4">
                      {/* Arrow Button */}
                      <div className={`flex size-10 items-center justify-center transition-colors duration-300 ${
                        isEven
                          ? "border border-white/20 text-white hover:bg-white hover:text-navy-deep"
                          : "bg-gold text-navy-deep hover:bg-navy hover:text-gold"
                      }`}>
                        <ArrowRight className="size-4" strokeWidth={2} />
                      </div>
                      
                      {/* Gold background tag icon outline */}
                      <div className={`opacity-15 shrink-0 ${
                        isEven ? "text-white" : "text-[#C49B7A]"
                      }`}>
                        <Icon className="size-14" strokeWidth={1.2} />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="section-pad">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHeading eyebrow="Our Journey" title="Milestones In Our Practice" center />
          <div className="mt-14 grid gap-px bg-border md:grid-cols-3 lg:grid-cols-5">
            {MILESTONES.map((m) => (
              <div key={m.year} className="bg-background p-8">
                <p className="font-[var(--font-display)] text-4xl text-gold">{m.year}</p>
                <h3 className="mt-4 text-xl text-foreground">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="section-pad bg-muted">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="text-center mb-14">
            <span className="rule-gold eyebrow">Meet Our People</span>
            <h2 className="mt-4 text-4xl leading-[1.15] md:text-5xl text-foreground font-display">
              Leading experts
            </h2>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-[1150px] mx-auto">
            {TEAM.map((m) => (
              <article key={m.name} className="group flex flex-col items-center text-center">
                <div className="relative overflow-hidden w-full aspect-[4/5] bg-background mb-6">
                  <img
                    src={m.img}
                    alt={`${m.name}, ${m.role} at Darton Attorneys`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={700}
                    height={860}
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#C49B7A]/80 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href="#" className="text-white hover:text-navy transition-colors">
                      <Facebook className="size-5" />
                    </a>
                    <a href="#" className="text-white hover:text-navy transition-colors">
                      <Globe className="size-5" />
                    </a>
                    <a href="#" className="text-white hover:text-navy transition-colors">
                      <Twitter className="size-5" />
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground tracking-tight">{m.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {m.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="section-pad overflow-hidden">
        <div className="mx-auto max-w-[1100px] px-6">
          {/* Header with Circular Index progress */}
          <div className="flex items-center justify-between gap-6 border-b border-border pb-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl text-foreground font-display tracking-tight leading-none">
                What Our Clients Say
              </h2>
              <span className="mt-4 block h-[2px] w-12 bg-gold" />
            </div>
            
            {/* Index circle indicator */}
            <div className="relative flex size-14 shrink-0 items-center justify-center rounded-full border border-gold/40 text-sm font-semibold font-display text-gold">
              {activeTestimonial + 1}/{TESTIMONIALS.length}
            </div>
          </div>
          
          {/* Content: round profile image left, quote text + stars right */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-8 md:gap-14 items-center min-h-[220px]">
            {/* Left profile Column */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="size-36 rounded-full overflow-hidden border border-border bg-muted mb-4 shadow-sm animate-in fade-in duration-300">
                <img
                  src={TESTIMONIALS[activeTestimonial].img}
                  alt={TESTIMONIALS[activeTestimonial].name}
                  className="size-full object-cover object-top"
                  loading="lazy"
                  width={200}
                  height={200}
                />
              </div>
              <h3 className="text-base font-semibold text-foreground uppercase tracking-wider font-sans">
                {TESTIMONIALS[activeTestimonial].name}
              </h3>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1 font-sans">
                {TESTIMONIALS[activeTestimonial].role}
              </p>
            </div>
            
            {/* Right quote content Column */}
            <div className="relative flex justify-between items-start gap-8">
              <div className="flex-grow animate-in fade-in slide-in-from-right-3 duration-500">
                {/* 5 Stars Rating */}
                <div className="flex gap-1 text-gold mb-5 justify-center md:justify-start">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className="text-lg">★</span>
                  ))}
                </div>
                
                {/* Testimony paragraph quote */}
                <p className="text-lg md:text-2xl font-medium leading-relaxed text-foreground/90 italic font-display">
                  "{TESTIMONIALS[activeTestimonial].text}"
                </p>
                
                {/* Bottom slideshow dot indicators */}
                <div className="mt-8 flex gap-2.5 justify-center md:justify-start">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`h-2 transition-all duration-300 cursor-pointer rounded-none ${
                        idx === activeTestimonial ? "w-6 bg-gold" : "w-2 bg-muted hover:bg-gold/40"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Giant quote icon */}
              <Quote className="size-20 text-muted-foreground/15 shrink-0 hidden sm:block rotate-180" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* COUNTERS */}
      <section className="bg-navy py-16">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["480+", "Matters concluded"],
            ["320+", "Clients advised"],
            ["14", "Years in practice"],
            ["9", "Practice areas"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="font-[var(--font-display)] text-5xl text-gold">
                <AnimatedCounter value={value ?? ""} />
              </p>
              <p className="mt-2 text-[0.72rem] uppercase tracking-[0.22em] text-primary-foreground/75">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INSIGHTS */}
      <section id="insights" className="section-pad">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHeading eyebrow="Legal Insights" title="Our Latest Commentary" center />
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => (
              <article
                key={post.title}
                className="group flex flex-col bg-background shadow-md border border-border/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
                
                <div className="p-7 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold leading-snug text-foreground hover:text-gold transition-colors duration-200">
                    {post.title}
                  </h3>
                  
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-grow">
                    {post.desc}
                  </p>
                  
                  <div className="mt-6 pt-5 border-t border-border/60 flex justify-between items-center text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Heart className="size-4 text-[#EA580C] fill-[#EA580C]" />
                      {post.likes}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-pad bg-muted">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="FAQ" title="Answers Before You Instruct Us" />
          <div className="divide-y divide-border border-y border-border">
            {FAQS.map((f, i) => (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-[var(--font-display)] text-xl text-foreground">{f.q}</span>
                  {openFaq === i ? (
                    <Minus className="size-5 shrink-0 text-gold" strokeWidth={1.5} />
                  ) : (
                    <Plus className="size-5 shrink-0 text-gold" strokeWidth={1.5} />
                  )}
                </button>
                {openFaq === i && (
                  <p className="pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}
