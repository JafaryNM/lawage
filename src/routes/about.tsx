import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

import logo from "@/assets/darton-logo.png";
import banner from "@/assets/judges-gavel-book-wooden-table-law-justice-concept-background.jpg";
import storyImg from "@/assets/hero.jpg";

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

const PILLARS = [
  {
    title: "Our Mission",
    text: "To deliver legal counsel that is rigorous, honest and on time, helping our clients make confident decisions in every matter they bring to us.",
  },
  {
    title: "Our Values",
    text: "We hold ourselves to the highest ethical standards, acting with integrity, confidentiality and accountability to our clients and the community.",
  },
  {
    title: "Our Approach",
    text: "We pair a deep grasp of Tanzanian statute and precedent with a commercial understanding of our clients' sectors, so our advice is practical as well as sound.",
  },
];

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* PAGE BANNER */}
      <section className="relative flex h-[420px] items-center justify-center overflow-hidden pt-[130px] md:h-[460px]">
        <img
          src={banner}
          alt="Judge's gavel resting on law books"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-deep/70" />
        <div className="relative px-6 text-center">
          <h1 className="text-4xl text-white md:text-6xl">Who We Are</h1>
          <nav aria-label="Breadcrumb" className="mt-5 flex items-center justify-center gap-2 text-sm text-white/80">
            <Link to="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="size-4" strokeWidth={1.5} />
            <span className="text-white">Who We Are</span>
          </nav>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section-pad">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="relative aspect-[12/13] overflow-hidden rounded-[8px]">
            <img
              src={storyImg}
              alt="Darton Attorneys advocates reviewing a contract in the firm's Dar es Salaam office"
              className="absolute inset-0 size-full object-cover object-[60%_center]"
              loading="lazy"
            />
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
              covering litigation, land, family, employment and tax matters, with advisory work
              that now reaches across the East African region.
            </p>

            <div className="mt-10 grid gap-8 rounded-[8px] bg-[#f0f0f0] p-8 md:grid-cols-2 md:p-10">
              {PILLARS.map((p, i) => (
                <div key={p.title} className={i === PILLARS.length - 1 ? "md:col-span-2" : ""}>
                  <h3 className="text-2xl text-brand">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
