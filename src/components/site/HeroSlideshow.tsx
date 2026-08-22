import { ArrowRight, Facebook, Twitter, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

import { TextAnimate } from "@/registry/magicui/text-animate";

import slide1 from "@/assets/slider-01-img-b2.png";
import slide2 from "@/assets/business-meeting-cafe.png";
import slide3 from "@/assets/executive-correcting-report.png";
import slide4 from "@/assets/successful-diverse-business-people-discussing-contract.png";

const HERO_SLIDES = [
  {
    src: slide1,
    alt: "Lady Justice statue in front of marble columns",
    eyebrow: "Leave Court To Us",
    title: "A law firm with a passion for success",
    desc: "The lawyers are both experienced and highly skilled.",
    position: "object-center",
    theme: "light",
  },
  {
    src: slide2,
    alt: "Attorney taking notes with a client during an informal consultation",
    eyebrow: "Trusted Counsel For",
    title: "Legal Clarity",
    desc: "We provide clear, precise guidance for Tanzanian commercial and tax matters.",
    position: "object-top",
    theme: "dark",
  },
  {
    src: slide3,
    alt: "Executive reviewing and correcting a legal report",
    eyebrow: "Precise Advice On",
    title: "Complex Matters",
    desc: "Advocating with absolute diligence in every Tanzanian court and tribunal.",
    position: "object-top",
    theme: "dark",
  },
  {
    src: slide4,
    alt: "Business professionals discussing a contract together",
    eyebrow: "Creative Solutions For",
    title: "Legal Problems",
    desc: "Finding robust, commercial and legal answers to your corporate operations.",
    position: "object-top",
    theme: "dark",
  },
];

interface HeroSlideshowProps {
  onThemeChange?: (theme: "light" | "dark") => void;
}

export function HeroSlideshow({ onThemeChange }: HeroSlideshowProps) {
  const [active, setActive] = useState(0);

  const handleActiveChange = (idx: number) => {
    setActive(idx);
    if (onThemeChange) {
      onThemeChange(HERO_SLIDES[idx].theme as "light" | "dark");
    }
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % HERO_SLIDES.length;
        if (onThemeChange) {
          onThemeChange(HERO_SLIDES[next].theme as "light" | "dark");
        }
        return next;
      });
    }, 8000);
    return () => window.clearInterval(id);
  }, [onThemeChange]);

  const activeTheme = HERO_SLIDES[active].theme;
  const isLight = activeTheme === "light";

  return (
    <section className="relative overflow-hidden w-full min-h-screen min-h-[100dvh] flex flex-col justify-center">
      {HERO_SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
            slide.position || "object-top"
          } ${i === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      
      {/* Dynamic Overlay Gradient */}
      <div className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
        isLight
          ? "bg-gradient-to-r from-white/95 via-white/50 to-transparent"
          : "bg-gradient-to-b from-black/60 via-black/10 to-black/50"
      }`} />

      {/* Vertical Social Follow Us Bar (Bottom Left) */}
      <div className={`absolute left-8 bottom-12 z-20 hidden md:flex flex-col items-center gap-6 transition-colors duration-1000 ${
        isLight ? "text-navy" : "text-white/60"
      }`}>
        <div className="flex flex-col gap-4 text-xs font-semibold tracking-[0.2em] uppercase [writing-mode:vertical-lr] rotate-180 items-center">
          <span className="h-10 w-px bg-current opacity-30 mb-2" />
          Follow Us
        </div>
        <div className="flex flex-col gap-4">
          <a href="#" className="hover:text-gold transition-colors"><Facebook className="size-4" strokeWidth={1.5} /></a>
          <a href="#" className="hover:text-gold transition-colors"><Twitter className="size-4" strokeWidth={1.5} /></a>
          <a href="#" className="hover:text-gold transition-colors"><Instagram className="size-4" strokeWidth={1.5} /></a>
        </div>
      </div>

      {/* Render active text slide */}
      <div className={`relative mx-auto flex min-h-screen min-h-[100dvh] w-full max-w-[1400px] flex-col justify-center px-6 py-28 z-10 transition-all duration-[1000ms] ${
        isLight
          ? "items-start text-left md:pl-[45%] lg:pl-[50%]"
          : "items-center text-center"
      }`}>
        <div key={active} className="w-full animate-in fade-in duration-700">
          <span className={`block text-[0.8rem] uppercase tracking-[0.4em] ${
            isLight ? "text-muted-foreground" : "text-primary-foreground/90"
          }`}>
            {HERO_SLIDES[active].eyebrow}
          </span>
          
          <h1 className={`mt-5 text-4xl leading-[1.1] md:text-5xl lg:text-[4.5rem] font-display transition-colors duration-1000 ${
            isLight ? "text-navy" : "text-primary-foreground"
          }`}>
            {active === 0 ? (
              <>
                A law firm with a <span className="text-gold border-b-2 border-gold/70 pb-1 italic font-medium">passion</span> for success
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
                {HERO_SLIDES[active].title}
              </TextAnimate>
            )}
          </h1>
          
          <p className={`mt-6 text-sm md:text-base leading-relaxed max-w-xl transition-colors duration-1000 ${
            isLight ? "text-muted-foreground" : "text-primary-foreground/75"
          } ${isLight ? "" : "mx-auto"}`}>
            {HERO_SLIDES[active].desc}
          </p>
        </div>

        <div className={`mt-10 flex flex-wrap gap-4 z-10 ${
          isLight ? "justify-start" : "justify-center"
        }`}>
          {active === 0 ? (
            <>
              <a href="#projects" className="btn-gold font-sans">
                Recent Work <ArrowRight className="size-4" strokeWidth={1.5} />
              </a>
              <a
                href="#get-involved"
                className="inline-flex items-center gap-2 border border-[#152833] text-[#152833] text-[0.75rem] font-semibold uppercase tracking-[0.15em] px-6 py-3.5 hover:bg-[#152833] hover:text-white transition-colors duration-300 font-sans"
              >
                Contact Us <ArrowRight className="size-4" strokeWidth={1.5} />
              </a>
            </>
          ) : (
            <a href="#get-involved" className="btn-gold font-sans">
              Book A Consultation <ArrowRight className="size-4" strokeWidth={1.5} />
            </a>
          )}
        </div>
      </div>

      {/* Horizontal DOT/Circle slide indicators (Right vertical panel) */}
      <div className="absolute right-8 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-4">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={() => handleActiveChange(i)}
            className={`size-3 rounded-full border transition-all duration-300 cursor-pointer ${
              isLight ? "border-navy/30" : "border-primary-foreground/70"
            } ${
              i === active 
                ? (isLight ? "bg-navy" : "bg-gold") 
                : "bg-transparent hover:scale-110"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
