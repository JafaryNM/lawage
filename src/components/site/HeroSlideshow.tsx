import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { TextAnimate } from "@/registry/magicui/text-animate";

import slide1Asset from "@/assets/business-meeting-cafe.jpg.asset.json";
import slide2Asset from "@/assets/executive-correcting-report.jpg.asset.json";
import slide3Asset from "@/assets/successful-diverse-business-people-discussing-contract.jpg.asset.json";

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

export function HeroSlideshow() {
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
              <TextAnimate
                animation="blurInDown"
                by="character"
                once={false}
                duration={0.7}
                stagger={0.05}
                trigger={i === active}
              >
                {slide.title}
              </TextAnimate>
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
