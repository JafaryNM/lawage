import { createFileRoute } from "@tanstack/react-router";
import { Check, Eye, Facebook, Flag, Instagram, Linkedin, Scale, Twitter, type LucideIcon } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageBanner } from "@/components/site/PageBanner";
import { WorkProcess } from "@/components/site/WorkProcess";
import { Partners } from "@/components/site/Partners";
import { SUPPORT_TEAM, TEAM, type TeamMember } from "@/lib/team";

import logo from "@/assets/lawage-logo.png";
import storyImg from "@/assets/about-judge-writing.jpg";
import vmBg from "@/assets/law-library-justice.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | LawAge Advocates & Consult" },
      {
        name: "description",
        content:
          "LawAge Advocates is a full-service Tanzanian law firm with offices in Dodoma and Dar es Salaam, combining legal excellence with commercial insight.",
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

const VISION_MISSION: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Eye,
    title: "Our Vision",
    text: "To be a leading law firm in Tanzania and beyond, recognized for delivering innovative legal solutions, shaping business success, and advancing justice with integrity and excellence.",
  },
  {
    icon: Flag,
    title: "Our Mission",
    text: "To provide exceptional legal and advisory services through professionalism, innovation, and strategic partnerships while creating sustainable value for our clients, promoting the rule of law, and contributing to national and regional development.",
  },
];

const CORE_VALUES = [
  { title: "Integrity", text: "We uphold the highest ethical and professional standards in everything we do." },
  { title: "Innovation", text: "We embrace modern legal solutions and continuously improve the way we serve our clients." },
  { title: "Excellence", text: "We are committed to delivering outstanding legal services and exceptional client experiences." },
  { title: "Confidentiality", text: "We protect our clients' information with the highest level of trust and discretion." },
  { title: "Professionalism", text: "We maintain competence, diligence, respect, and accountability in every engagement." },
  { title: "Collaboration", text: "We work closely with clients, partners, and stakeholders to achieve shared success." },
  { title: "Client Focus", text: "We listen, understand, and tailor solutions to meet each client's unique needs." },
  { title: "Impact", text: "We strive to create meaningful legal, commercial, and social outcomes that make a lasting difference." },
];

function SocialLinks({ name, light = false }: { name: string; light?: boolean }) {
  return (
    <div className="flex gap-2">
      {SOCIALS.map(({ Icon, label }) => (
        <a
          key={label}
          href="#"
          aria-label={`${name} ${label}`}
          className={`flex size-9 items-center justify-center rounded-full border transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-white ${
            light ? "border-white/30 text-white" : "border-brand/15 text-brand"
          }`}
        >
          <Icon className="size-4" />
        </a>
      ))}
    </div>
  );
}

/** Photo card with name and role on a dark fade; social links rise in on hover */
function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#e9e8f0] shadow-[0_16px_40px_rgba(33,28,79,0.08)]">
      <img
        src={member.photo}
        alt={member.name}
        loading="lazy"
        className={`absolute inset-0 size-full transition-transform duration-700 group-hover:scale-105 ${
          member.logo ? "object-contain p-14 pb-32" : "object-cover object-top"
        }`}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgb(21 17 55 / 0.95) 0%, rgb(21 17 55 / 0.7) 22%, rgb(21 17 55 / 0.3) 42%, rgb(21 17 55 / 0.08) 55%, transparent 65%)",
        }}
      />
      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />

      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <h3 className="text-xl leading-snug">{member.name}</h3>
        {member.credentials && (
          <p className="mt-0.5 text-xs tracking-[0.12em] text-gold-soft">{member.credentials}</p>
        )}
        <p className="mt-1.5 text-[0.7rem] uppercase leading-relaxed tracking-[0.16em] text-white/75">{member.role}</p>
        {!member.logo && (
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <div className="pt-4">
                <SocialLinks name={member.name} light />
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
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
              About LawAge Advocates
            </span>
            <h2 className="mt-6 text-4xl leading-[1.15] text-foreground md:text-5xl">
              A Class Above <span className="text-brand">Legal Excellence</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              LawAge Advocates is a full-service Tanzanian law firm dedicated to delivering practical,
              innovative, and results-oriented legal solutions to businesses, government institutions,
              development partners, financial institutions, non-governmental organizations, and private
              clients. With strategically located offices in Dodoma and Dar es Salaam, we combine legal
              excellence with commercial insight to help our clients navigate complex legal and
              regulatory environments with confidence.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Our multidisciplinary team provides comprehensive legal and advisory services across
              corporate and commercial law, litigation and dispute resolution, real estate, employment,
              intellectual property, mining and energy, regulatory compliance, data protection, debt
              recovery, and investment advisory.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We believe that outstanding legal service goes beyond interpreting the law. It requires
              understanding our clients' industries, anticipating challenges, and delivering strategic
              advice that creates long-term value.
            </p>
          </div>
        </div>
      </section>

      {/* VISION & MISSION — glass cards over a photo, joined by the LawAge emblem */}
      <section className="relative isolate overflow-hidden py-[70px] text-white md:py-28">
        <img src={vmBg} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-10 size-full object-cover" />
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
              Guided by integrity, professionalism, and excellence, we are committed to building lasting
              partnerships founded on trust, responsiveness, and measurable results.
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
                  <h3 className="text-2xl text-foreground transition-colors group-hover:text-brand">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OUR SERVICE APPROACH — intro and photo beside a numbered timeline */}
      <WorkProcess />

      {/* OUR TEAM */}
      <section id="team" className="section-pad">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center">
            <span className="rule-line eyebrow">Our Team</span>
            <h2 className="mx-auto mt-4 max-w-3xl text-4xl leading-[1.15] text-foreground md:text-5xl">
              Experienced Professionals. <span className="text-brand">Trusted Advisors.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Our greatest strength lies in our people. Our team combines diverse legal expertise,
              commercial insight, and a shared commitment to delivering practical, client-focused
              solutions.
            </p>
          </div>

          {/* Managing Partner, featured */}
          {(() => {
            const [lead, ...rest] = TEAM;
            if (!lead) return null;
            return (
              <>
                <article className="mt-16 grid overflow-hidden rounded-3xl bg-brand text-white shadow-[0_30px_70px_rgba(33,28,79,0.25)] md:grid-cols-[0.8fr_1.2fr]">
                  <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[440px]">
                    <img
                      src={lead.photo}
                      alt={lead.name}
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover object-top"
                    />
                  </div>
                  <div className="relative flex flex-col justify-center overflow-hidden p-8 md:p-14">
                    <Scale aria-hidden className="pointer-events-none absolute -right-10 -bottom-10 size-64 text-white/[0.04]" strokeWidth={1} />
                    <span className="inline-flex items-center gap-3 self-start text-[0.7rem] uppercase tracking-[0.25em] text-gold">
                      <span className="h-px w-8 bg-gold" />
                      {lead.role}
                    </span>
                    <h3 className="mt-5 text-4xl leading-tight md:text-5xl">{lead.name}</h3>
                    <p className="mt-6 max-w-lg text-base leading-[1.85] text-white/75">
                      &ldquo;We listen carefully, advise strategically, act professionally, and remain committed to
                      protecting our clients' interests through every stage of their legal journey.&rdquo;
                    </p>
                    <p className="mt-3 text-[0.7rem] uppercase tracking-[0.2em] text-white/45">
                      The LawAge Advocates Promise
                    </p>
                    <div className="mt-8">
                      <SocialLinks name={lead.name} light />
                    </div>
                  </div>
                </article>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {rest.map((m) => (
                    <TeamCard key={m.name} member={m} />
                  ))}
                </div>
              </>
            );
          })()}

          <div className="mt-24 text-center">
            <h3 className="text-3xl text-foreground md:text-4xl">
              Our Professional <span className="text-brand">Support Team</span>
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Our legal practice is supported by a multidisciplinary team that ensures efficient service
              delivery and seamless client support.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-[900px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORT_TEAM.map((m) => (
              <TeamCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </section>

      <Partners />

      <Footer />
    </div>
  );
}
