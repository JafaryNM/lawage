import { ArrowRight, Facebook, Twitter, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

import { TextAnimate } from "@/registry/magicui/text-animate";

import columnsBg from "@/assets/hero-columns.png";
import slideStatue from "@/assets/slider-01-img-b2.png";
import slideCafe from "@/assets/business-meeting-cafe.png";
import slideReport from "@/assets/executive-correcting-report.png";
import slideContract from "@/assets/successful-diverse-business-people-discussing-contract.png";

const HERO_SLIDES = [
  {
    src: slideStatue,
    alt: "Lady Justice statue in front of marble columns",
    eyebrow: "Leave Court To Us",
    title: "A law firm with a passion for success",
    desc: "The lawyers are both experienced and highly skilled.",
    cutout: true,
  },
  {
    src: slideCafe,
    alt: "Advocate taking notes during a client meeting",
    eyebrow: "Trusted Counsel For",
    title: "Legal Clarity",
    desc: "Clear, precise guidance for Tanzanian commercial and tax matters.",
    cutout: false,
  },
  {
    src: slideReport,
    alt: "Attorney reviewing and marking a legal document",
    eyebrow: "Precision In Every",
    title: "Legal Detail",
    desc: "Every clause reviewed, every risk documented before you sign.",
    cutout: false,
  },
  {
    src: slideContract,
    alt: "Business professionals discussing a contract together",
    eyebrow: "Creative Solutions For",
    title: "Legal Problems",
    desc: "Robust, commercial answers to your corporate operations.",
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

  return (
    <section className="relative overflow-hidden w-full min-h-screen min-h-[100dvh] flex flex-col justify-center bg-white">
      {/* Shared pale colonnade backdrop */}
      <img
        src={columnsBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-white/90" />

      {/* Slide subjects, anchored bottom-left in the left column */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${
            i === active ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
          }`}
        >
          {slide.cutout ? (
            <img
              src={slide.src}
              alt={slide.alt}
              className="absolute bottom-0 left-0 lg:left-[4%] h-[55vh] lg:h-[88vh] w-auto max-w-[70%] lg:max-w-[46%] object-contain object-bottom select-none mix-blend-multiply"
            />
          ) : (
            <img
              src={slide.src}
              alt={slide.alt}
              className="absolute bottom-0 left-0 lg:left-[4%] h-[55vh] lg:h-[78vh] w-[80%] lg:w-[46%] object-cover object-center select-none"
            />
          )}
        </div>
      ))}

      {/* Vertical Social Follow Us Bar (Bottom Left) */}
      <div className="absolute left-8 bottom-12 z-20 hidden md:flex flex-col items-center gap-6 text-navy">
        <div className="flex flex-col gap-4">
          <a href="#" className="hover:text-gold transition-colors"><Facebook className="size-4" strokeWidth={1.5} /></a>
          <a href="#" className="hover:text-gold transition-colors"><Twitter className="size-4" strokeWidth={1.5} /></a>
          <a href="#" className="hover:text-gold transition-colors"><Instagram className="size-4" strokeWidth={1.5} /></a>
        </div>
        <span className="h-12 w-px bg-current opacity-30" />
        <div className="text-[0.7rem] font-medium tracking-[0.25em] uppercase [writing-mode:vertical-lr] rotate-180 font-sans">
          Follow Us
        </div>
      </div>

      {/* Text Content Grid Wrapper — identical position on every slide */}
      <div className="relative mx-auto w-full max-w-[1400px] px-6 py-28 z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] min-h-screen min-h-[100dvh] items-center">
        <div className="hidden lg:block w-full h-full" />

        <div key={active} className="w-full flex flex-col items-start text-left animate-in fade-in duration-700">
          <span className="block text-[0.8rem] uppercase tracking-[0.4em] font-sans text-muted-foreground">
            {activeSlide.eyebrow}
          </span>

          <h1 className="mt-5 text-4xl leading-[1.15] md:text-5xl lg:text-[4.2rem] font-display tracking-tight font-medium text-navy">
            {active === 0 ? (
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

          <p className="mt-6 text-sm md:text-base leading-relaxed max-w-xl font-sans text-muted-foreground">
            {activeSlide.desc}
          </p>

          <div className="mt-10 flex flex-wrap gap-4 z-10 justify-start">
            <a href="#projects" className="btn-gold font-sans">
              Recent Work <ArrowRight className="size-4" strokeWidth={1.5} />
            </a>
            <a
              href="#get-involved"
              className="inline-flex items-center gap-2 border border-[#152833] text-[#152833] text-[0.75rem] font-semibold uppercase tracking-[0.15em] px-6 py-3.5 hover:bg-[#152833] hover:text-white transition-colors duration-300 font-sans"
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
            className={`size-3 rounded-full border border-navy/30 transition-all duration-300 cursor-pointer ${
              i === active ? "bg-navy" : "bg-transparent hover:scale-110"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
