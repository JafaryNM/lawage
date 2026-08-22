import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Gavel,
  Handshake,
  Home,
  Landmark,
  Minus,
  Plus,
  Quote,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TextAnimate } from "@/registry/magicui/text-animate";

import hero from "@/assets/hero.jpg";
import slide1Asset from "@/assets/business-meeting-cafe.jpg.asset.json";
import slide2Asset from "@/assets/executive-correcting-report.jpg.asset.json";
import slide3Asset from "@/assets/successful-diverse-business-people-discussing-contract.jpg.asset.json";
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
    name: "Iliena Mwangosi",
    role: "Managing Director, Logistics",
    text: "Darton Attorneys restructured our shareholding and commercial contracts with real precision. Their advice was practical, timely and commercially aware at every stage.",
  },
  {
    name: "Joseph Thomas",
    role: "Finance Director",
    text: "They represented us in a complex tax dispute and kept us informed throughout. The outcome exceeded what we thought was realistic.",
  },
  {
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

const HERO_SLIDES = [
  {
    src: slide1Asset.url,
    alt: "Attorney taking notes with a client during an informal consultation",
    eyebrow: "Trusted Counsel For",
    title: "Legal Clarity",
  },
  {
    src: slide2Asset.url,
    alt: "Executive reviewing and correcting a legal report",
    eyebrow: "Precise Advice On",
    title: "Complex Matters",
  },
  {
    src: slide3Asset.url,
    alt: "Business professionals discussing a contract together",
    eyebrow: "Creative Solutions For",
    title: "Legal Problems",
  },
];

function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % HERO_SLIDES.length),
      8000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {HERO_SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-navy-deep/35" />

      <div className="relative mx-auto flex min-h-[640px] max-w-[1400px] flex-col items-center justify-center px-6 py-28 text-center lg:min-h-[820px]">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.title}
            className={`transition-opacity duration-[1200ms] ${
              i === active ? "opacity-100" : "pointer-events-none absolute opacity-0"
            }`}
          >
            <span className="text-[0.8rem] uppercase tracking-[0.4em] text-primary-foreground">
              {slide.eyebrow}
            </span>
            <h1 className="mt-6 text-6xl leading-[1.05] text-primary-foreground md:text-8xl lg:text-[7rem]">
              {slide.title}
            </h1>
          </div>
        ))}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a href="#get-involved" className="btn-gold">
            Book A Consultation <ArrowRight className="size-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>

      <div className="absolute right-8 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-4">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`size-3 rounded-full border border-primary-foreground/70 transition-colors ${
              i === active ? "bg-gold" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </section>
  );
}


function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <HeroSlideshow />


      {/* PRACTICE AREAS */}
      <section id="practice" className="section-pad">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading eyebrow="Our Services" title="Our Legal Practice Areas" />
            <a href="#get-involved" className="btn-gold">
              Read More
            </a>
          </div>

          <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICE.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="group bg-background p-10 transition-colors duration-300 hover:bg-navy"
              >
                <Icon
                  className="size-11 text-gold transition-transform duration-300 group-hover:-translate-y-1"
                  strokeWidth={1.2}
                />
                <h3 className="mt-6 text-2xl text-foreground transition-colors group-hover:text-primary-foreground">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-primary-foreground/70">
                  {text}
                </p>
                <a
                  href="#get-involved"
                  className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-gold"
                >
                  Read More <ArrowRight className="size-4" strokeWidth={1.5} />
                </a>
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
      <section id="projects" className="section-pad bg-navy-deep">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHeading eyebrow="Our Projects" title="Selected Matters We Have Handled" light />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <article key={i} className="group relative overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    p.tall ? "h-[30rem]" : "h-72"
                  }`}
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span className="text-[0.7rem] uppercase tracking-[0.22em] text-gold">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 text-2xl text-primary-foreground">{p.title}</h3>
                </div>
              </article>
            ))}
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
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading eyebrow="Our Team" title="Exceptional And Dedicated Attorneys" />
            <a href="#get-involved" className="btn-gold">
              Read More
            </a>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => (
              <article key={m.name} className="group bg-background">
                <div className="overflow-hidden">
                  <img
                    src={m.img}
                    alt={`${m.name}, ${m.role} at Darton Attorneys`}
                    className="h-[26rem] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={700}
                    height={860}
                  />
                </div>
                <div className="border-t-2 border-gold p-7 text-center">
                  <h3 className="text-2xl text-foreground">{m.name}</h3>
                  <p className="mt-1 text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {m.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="section-pad">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHeading eyebrow="Testimonials" title="What Our Clients Say" center />
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <article key={t.name} className="border border-border p-10">
                <Quote className="size-9 text-gold" strokeWidth={1.2} />
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                <div className="mt-8 border-t border-border pt-6">
                  <h3 className="text-xl text-foreground">{t.name}</h3>
                  <p className="mt-1 text-[0.72rem] uppercase tracking-[0.22em] text-gold">
                    {t.role}
                  </p>
                </div>
              </article>
            ))}
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
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {POSTS.map((post) => (
              <article key={post.title} className="group">
                <div className="relative overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  <span className="absolute left-0 top-0 bg-gold px-4 py-2 text-[0.68rem] uppercase tracking-[0.22em] text-navy-deep">
                    {post.tag}
                  </span>
                </div>
                <p className="mt-6 text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {post.date}
                </p>
                <h3 className="mt-3 text-2xl leading-snug text-foreground transition-colors group-hover:text-gold">
                  {post.title}
                </h3>
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

      {/* GET INVOLVED / CONTACT */}
      <section id="get-involved" className="section-pad bg-navy-deep">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Get Involved" title="Speak To An Attorney Today" light />
            <p className="mt-6 max-w-lg text-base leading-relaxed text-primary-foreground/70">
              Tell us briefly about your matter and we will arrange a consultation with the
              attorney best suited to it. All enquiries are treated in strict confidence.
            </p>
            <div className="mt-10 space-y-5 text-sm text-primary-foreground/80">
              <p className="flex items-center gap-3">
                <Home className="size-4 text-gold" strokeWidth={1.5} />
                Masaki, Chole Road, Dar es Salaam, Tanzania
              </p>
              <p>Monday – Friday, 08:00 – 17:00 EAT</p>
            </div>
          </div>

          <form
            className="grid gap-4 bg-background p-8 sm:grid-cols-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              required
              placeholder="Full name"
              className="border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
            />
            <input
              required
              type="email"
              placeholder="Email address"
              className="border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
            />
            <input
              placeholder="Phone number"
              className="border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
            />
            <input
              placeholder="Practice area"
              className="border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
            />
            <textarea
              required
              rows={5}
              placeholder="Briefly describe your matter"
              className="border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold sm:col-span-2"
            />
            <button type="submit" className="btn-gold sm:col-span-2">
              Send Enquiry
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
