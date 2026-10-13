import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FlatIcon, type FlatIconName } from "@/components/site/FlatIcon";
import { PageBanner } from "@/components/site/PageBanner";
import { Partners } from "@/components/site/Partners";
import { TEAM } from "@/lib/team";

import logo from "@/assets/darton-logo.png";
import storyImg from "@/assets/about-story.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Who We Are | Darton Attorneys" },
      {
        name: "description",
        content:
          "Darton Attorneys is a Dar es Salaam law firm built on integrity, diligence and results. Learn about our story, mission and values.",
      },
      { property: "og:title", content: "Who We Are | Darton Attorneys" },
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

const PILLARS = [
  {
    icon: "bullseye-arrow" as FlatIconName,
    title: "Our Mission",
    text: "To deliver legal counsel that is rigorous, honest and on time, helping our clients make confident decisions in every matter they bring to us.",
  },
  {
    icon: "balance-scale-left" as FlatIconName,
    title: "Our Values",
    text: "We hold ourselves to the highest ethical standards, acting with integrity, confidentiality and accountability to our clients and the community.",
  },
  {
    icon: "compass-alt" as FlatIconName,
    title: "Our Approach",
    text: "We pair a deep grasp of Tanzanian statute and precedent with a commercial understanding of our clients' sectors, so our advice is practical as well as sound.",
  },
];

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageBanner title="Who We Are" crumbs={[{ label: "Who We Are" }]} />

      {/* OUR STORY */}
      <section className="section-pad">
        <div className="mx-auto grid max-w-[1200px] items-stretch gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Image (large top-left / bottom-right corners) with a quote beneath; fills the text column's height on desktop */}
          <div className="flex flex-col">
            <div className="relative aspect-[12/13] overflow-hidden rounded-tl-[90px] rounded-br-[90px] md:rounded-tl-[120px] md:rounded-br-[120px] lg:aspect-auto lg:min-h-[420px] lg:flex-1">
              <img
                src={storyImg}
                alt="Advocate at a desk with law books, gavel and a statue of Lady Justice"
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
              />
            </div>

            <figure className="mt-8 flex gap-4">
              <span aria-hidden className="font-display text-7xl leading-[0.8] text-brand/40">
                &ldquo;
              </span>
              <blockquote className="text-base italic leading-relaxed text-muted-foreground">
                Clients deserve legal counsel that is rigorous, honest and delivered on time.
              </blockquote>
            </figure>
          </div>

          <div>
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-4 text-4xl leading-[1.15] text-foreground md:text-5xl">
              Fourteen Years of Trusted Counsel
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Darton Attorneys was founded in Dar es Salaam on a simple conviction: clients deserve
              legal counsel that is rigorous, honest and delivered on time. From our chambers we
              serve corporations, financial institutions, public bodies and individuals with the
              same standard of diligence.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Over the years our practice has grown from a corporate desk into a full-service firm
              covering litigation, land, family, employment and tax matters, with advisory work that
              now reaches across the East African region.
            </p>

            <div className="mt-10 grid gap-8 rounded-[8px] bg-[#f0f0f0] p-8 md:grid-cols-2 md:p-10">
              {PILLARS.map((p, i) => (
                <div
                  key={p.title}
                  className={`flex gap-4 ${i === PILLARS.length - 1 ? "md:col-span-2" : ""}`}
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <FlatIcon name={p.icon} className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl text-brand">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR TEAM */}
      <section id="team" className="section-pad bg-[#f0f0f0]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center">
            <span className="rule-line eyebrow">Our Team</span>
            <h2 className="mx-auto mt-4 max-w-3xl text-4xl leading-[1.15] text-foreground md:text-5xl">
              The People Behind Darton
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Partners and associates who bring rigour, discretion and commercial sense to every
              matter we handle.
            </p>
          </div>

          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => (
              <article key={m.name} className="group relative">
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
                <div className="relative mx-5 -mt-14 rounded-[6px] border-l-4 border-brand bg-white px-6 py-5 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-colors duration-300 group-hover:bg-brand">
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
