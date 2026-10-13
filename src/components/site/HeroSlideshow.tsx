import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { TextAnimate } from "@/registry/magicui/text-animate";

import slideCafe from "@/assets/hero-advocate-notes.jpg";
import slideReport from "@/assets/hero-legal-review.jpg";

const HERO_SLIDES = [
  {
    src: slideReport,
    alt: "Advocate taking notes on a contract draft with a client",
    eyebrow: "Precision In Every",
    title: "Legal Detail",
    desc: "Every clause reviewed, every risk documented before you sign.",
    cutout: false,
  },
  {
    src: slideCafe,
    alt: "Advocate making notes at his office desk",
    eyebrow: "Trusted Counsel For",
    title: "Legal Clarity",
    desc: "Clear, precise guidance for Tanzanian commercial and tax matters.",
    cutout: false,
  },
];

interface HeroSlideshowProps {
  onThemeChange?: (theme: "light" | "dark") => void;
}

export function HeroSlideshow({ onThemeChange }: HeroSlideshowProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    onThemeChange?.("light");
  }, [onThemeChange]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => window.clearInterval(id);
  }, []);

  const activeSlide = HERO_SLIDES[active]!;

  const isCutout = activeSlide.cutout;

  const isCentered = true;

  return (
    <section className="relative overflow-hidden w-full min-h-[560px] h-[80vh] h-[80dvh] flex flex-col justify-center bg-white">
      {/* Slides */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 w-full h-full ${
            i === active ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
          }`}
        >
          {slide.cutout ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-white/90" />
              <img
                src={slide.src}
                alt={slide.alt}
                className="absolute bottom-0 left-0 lg:left-[4%] h-[45vh] lg:h-[72vh] w-auto max-w-[70%] lg:max-w-[46%] object-contain object-bottom select-none mix-blend-multiply"
              />
            </>
          ) : (
            <>
              <img
                src={slide.src}
                alt={slide.alt}
                className="absolute inset-0 size-full object-cover object-top select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/60" />
            </>
          )}
        </div>
      ))}


      {/* Text Content Grid Wrapper — identical position on every slide */}
      <div className={`relative mx-auto w-full max-w-[1400px] px-6 py-28 z-10 min-h-[560px] h-[80vh] h-[80dvh] flex items-center ${
        isCentered ? "justify-center" : "grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]"
      }`}>
        {!isCentered && <div className="hidden lg:block w-full h-full" />}

        <div
          key={active}
          className={`w-full flex flex-col ${
            isCentered ? "items-center text-center max-w-3xl" : "items-start text-left"
          }`}
        >
          <span className={`block text-[0.8rem] uppercase tracking-[0.4em] font-sans ${
            isCutout ? "text-muted-foreground" : "text-primary-foreground/85"
          }`}>
            {activeSlide.eyebrow}
          </span>

          <h1 className={`mt-5 text-4xl leading-[1.15] md:text-5xl lg:text-[4.2rem] font-display tracking-tight font-medium transition-colors duration-1000 ${
            isCutout ? "text-brand" : "text-primary-foreground"
          }`}>
            {isCutout ? (
              <>
                A law firm with a <br className="hidden lg:block" />
                <span className="text-gold border-b-2 border-gold/70 pb-1 italic font-medium">passion</span> for success
              </>
            ) : (
              <TextAnimate
                animation="blurInDown"
                by="character"
                once={false}
                duration={0.7}
                stagger={0.04}
                trigger={true}
              >
                {activeSlide.title}
              </TextAnimate>
            )}
          </h1>

          <p className={`mt-6 text-sm md:text-base leading-relaxed max-w-xl font-sans ${
            isCutout ? "text-muted-foreground" : "text-primary-foreground/80"
          }`}>
            {activeSlide.desc}
          </p>

          <div className={`mt-10 flex flex-wrap gap-4 z-10 w-full ${
            isCentered ? "justify-center" : "justify-start"
          }`}>
            <a href="#projects" className="btn-brand font-sans">
              Recent Work <ArrowRight className="size-4" strokeWidth={1.5} />
            </a>
            <a
              href="/contact"
              className={`inline-flex items-center gap-2 border bg-transparent text-[0.75rem] font-semibold uppercase tracking-[0.15em] px-6 py-3.5 transition-colors duration-300 font-sans ${
                isCutout
                  ? "border-[#1b2445] text-[#1b2445] hover:bg-[#1b2445] hover:text-white"
                  : "border-white/70 text-primary-foreground hover:bg-white hover:text-[#1b2445]"
              }`}
            >
              Contact Us <ArrowRight className="size-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute right-8 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-4">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`size-3 rounded-full border transition-all duration-300 cursor-pointer ${
              isCutout ? "border-brand/30" : "border-white/70"
            } ${i === active ? (isCutout ? "bg-brand" : "bg-gold") : "bg-transparent hover:scale-110"}`}
          />
        ))}
      </div>

    </section>
  );
}
