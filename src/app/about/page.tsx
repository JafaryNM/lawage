import { Check, Eye, Flag, Scale, type LucideIcon } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageBanner } from "@/components/site/PageBanner";
import { WorkProcess } from "@/components/site/WorkProcess";
import { Partners } from "@/components/site/Partners";
import { pageMetadata } from "@/lib/seo";

// Scales of justice and gavel, Pexels (pexels.com/photo/5669619), free under the Pexels licence
import storyImg from "@/assets/about-scales-gavel.jpg";
import vmBg from "@/assets/law-library-justice.jpg";

export const metadata = pageMetadata({
  title: "About Us | LawAge Advocates",
  description:
    "LawAge Advocates is a full-service Tanzanian law firm with offices in Dodoma and Dar es Salaam, combining legal excellence with commercial insight.",
});

const VISION_MISSION: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Eye,
    title: "Our Vision",
    text: "To be a leading law firm in Tanzania and beyond, recognized for delivering innovative legal solutions, shaping business success, and advancing justice with integrity and excellence.",
  },
  {
    icon: Flag,
    title: "Our Mission",
    text: "To deliver innovative legal solutions shaping business success and advancing justice with integrity and excellence.",
  },
];

const CORE_VALUES = [
  {
    title: "Integrity",
    text: "We uphold the highest ethical and professional standards in everything we do.",
  },
  {
    title: "Innovation",
    text: "We embrace modern legal solutions and continuously improve the way we serve our clients.",
  },
  {
    title: "Excellence",
    text: "We are committed to delivering outstanding legal services and exceptional client experiences.",
  },
  {
    title: "Confidentiality",
    text: "We protect our clients' information with the highest level of trust and discretion.",
  },
  {
    title: "Professionalism",
    text: "We maintain competence, diligence, respect, and accountability in every engagement.",
  },
  {
    title: "Collaboration",
    text: "We work closely with clients, partners, and stakeholders to achieve shared success.",
  },
  {
    title: "Client Focus",
    text: "We listen, understand, and tailor solutions to meet each client's unique needs.",
  },
  {
    title: "Impact",
    text: "We strive to create meaningful legal, commercial, and social outcomes that make a lasting difference.",
  },
];

export default function About() {
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
              src={storyImg.src}
              alt="Scales of justice and a gavel on a lawyer’s desk beside case binders"
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
              About LawAge Advocates
            </span>
            <h2 className="mt-6 text-4xl leading-[1.15] text-foreground md:text-5xl">
              A Class Above <span className="text-brand">Legal Excellence</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              LawAge Advocates is a full-service Tanzanian law firm dedicated to delivering
              practical, innovative, and results-oriented legal solutions to businesses, government
              institutions, development partners, financial institutions, non-governmental
              organizations, and private clients. With strategically located offices in Dodoma and
              Dar es Salaam, we combine legal excellence with commercial insight to help our clients
              navigate complex legal and regulatory environments with confidence.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Our multidisciplinary team provides comprehensive legal and advisory services across
              corporate and commercial law, litigation and dispute resolution, real estate,
              employment, intellectual property, mining and energy, regulatory compliance, data
              protection, debt recovery, and investment advisory.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We believe that outstanding legal service goes beyond interpreting the law. It
              requires understanding our clients' industries, anticipating challenges, and
              delivering strategic advice that creates long-term value.
            </p>
          </div>
        </div>
      </section>

      {/* VISION & MISSION — glass cards over a photo, joined by the LawAge emblem */}
      <section className="relative isolate overflow-hidden py-[70px] text-white md:py-28">
        <img
          src={vmBg.src}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-brand-deep/90" />

        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center">
            <span className="rule-line eyebrow text-gold">Where We're Headed</span>
            <h2 className="mx-auto mt-4 max-w-2xl text-4xl leading-[1.15] md:text-5xl">
              Our Vision &amp; <span className="text-gold">Mission</span>
            </h2>
          </div>

          <div className="relative mt-14 grid gap-6 md:grid-cols-2 md:gap-10">
            {VISION_MISSION.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="group relative border border-white/15 bg-white/[0.07] p-8 backdrop-blur-md transition-colors duration-500 hover:border-gold/60 hover:bg-white/[0.11] md:p-12"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-25 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                <span className="flex size-14 items-center justify-center rounded-full bg-gold">
                  <Icon className="size-7 text-white" strokeWidth={1.75} />
                </span>
                <h3 className="mt-7 text-3xl md:text-4xl">{title}</h3>
                <p className="mt-4 text-base leading-[1.85] text-white/80">{text}</p>
              </article>
            ))}

            {/* Emblem joining the two cards */}
            <span className="absolute top-1/2 left-1/2 hidden size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[6px] border-brand-deep bg-gold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.15)] md:flex">
              <Scale className="size-10" strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </section>

      {/* CORE VALUES — intro beside a two-column checklist */}
      <section className="section-pad bg-[#f4f3f8]">
        <div className="mx-auto grid max-w-[1200px] gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="inline-block bg-white px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-foreground">
              What Guides Us
            </span>
            <h2 className="mt-6 text-4xl leading-[1.15] text-foreground md:text-5xl">
              Our Core <span className="text-brand">Values</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Guided by integrity, professionalism, and excellence, we are committed to building
              lasting partnerships founded on trust, responsiveness, and measurable results.
            </p>
            <div className="mt-8 h-1 w-20 bg-gold" />
          </div>

          <ul className="grid gap-x-10 sm:grid-cols-2">
            {CORE_VALUES.map(({ title, text }) => (
              <li key={title} className="group flex gap-4 border-b border-brand/10 py-7">
                <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-white transition-transform duration-300 group-hover:scale-110">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <div>
                  <h3 className="text-2xl text-foreground transition-colors group-hover:text-brand">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OUR SERVICE APPROACH — intro and photo beside a numbered timeline */}
      <WorkProcess />

      <Partners />

      <Footer />
    </div>
  );
}
