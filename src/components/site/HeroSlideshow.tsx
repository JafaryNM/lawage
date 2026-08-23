import { ArrowRight, Facebook, Twitter, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

import { TextAnimate } from "@/registry/magicui/text-animate";

import slide1 from "@/assets/slider-01-img-b2.png";
import slide2 from "@/assets/demo-lawyer-blog-03.png";
import slide3 from "@/assets/successful-diverse-business-people-discussing-contract.png";
import columnsBg from "@/assets/hero-columns.jpg.asset.json";


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
    alt: "Professional attorney working in the office",
    eyebrow: "Trusted Counsel For",
    title: "Legal Clarity",
    desc: "We provide clear, precise guidance for Tanzanian commercial and tax matters.",
    position: "object-top",
    theme: "dark",
  },
  {
    src: slide3,
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
      onThemeChange(HERO_SLIDES[idx]!.theme as "light" | "dark");
    }
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % HERO_SLIDES.length;
        if (onThemeChange) {
          onThemeChange(HERO_SLIDES[next]!.theme as "light" | "dark");
        }
        return next;
      });
    }, 8000);
    return () => window.clearInterval(id);
  }, [onThemeChange]);

  const activeSlide = HERO_SLIDES[active]!;
  const isLight = activeSlide.theme === "light";

  return (
    <section className="relative overflow-hidden w-full min-h-screen min-h-[100dvh] flex flex-col justify-center bg-white">
      {/* Render Background slides */}
      {HERO_SLIDES.map((slide, i) => {
        const isSlideLight = slide.theme === "light";
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${
              i === active ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
            }`}
          >
            {isSlideLight ? (
              /* Light theme: full-bleed pale colonnade with statue bleeding off the bottom */
              <div className="absolute inset-0 w-full h-full bg-white overflow-hidden">
                <img
                  src={columnsBg.url}
                  alt="Pale marble courthouse colonnade"
                  className="absolute inset-0 size-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-white/90" />
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="absolute bottom-0 left-0 lg:left-[4%] h-[55vh] lg:h-[88vh] w-auto max-w-[70%] lg:max-w-[46%] object-contain object-bottom select-none mix-blend-multiply"
                />
              </div>

            ) : (
              /* Dark theme full-screen layout */
              <>
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className={`absolute inset-0 size-full object-cover ${slide.position || "object-top"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/50" />
              </>
            )}
          </div>
        );
      })}

      {/* Vertical Social Follow Us Bar (Bottom Left) */}
      <div className={`absolute left-8 bottom-12 z-20 hidden md:flex flex-col items-center gap-6 transition-colors duration-1000 ${
        isLight ? "text-navy/70" : "text-white/60"
      }`}>
        <div className="flex flex-col gap-5">
          <a href="#" className="hover:text-gold transition-colors"><Facebook className="size-4" strokeWidth={1.5} /></a>
          <a href="#" className="hover:text-gold transition-colors"><Twitter className="size-4" strokeWidth={1.5} /></a>
          <a href="#" className="hover:text-gold transition-colors"><Instagram className="size-4" strokeWidth={1.5} /></a>
        </div>
        <span className="h-12 w-px bg-current opacity-30" />
        <div className="text-[0.7rem] font-medium tracking-[0.25em] uppercase [writing-mode:vertical-lr] rotate-180 font-sans">
          Follow Us
        </div>
      </div>

      {/* Text Content Grid Wrapper */}
      <div className={`relative mx-auto w-full max-w-[1400px] px-6 py-28 z-10 ${
        isLight
          ? "grid grid-cols-1 lg:grid-cols-2 min-h-screen min-h-[100dvh] items-center"
          : "flex min-h-screen min-h-[100dvh] flex-col justify-center items-center text-center"
      }`}>
        {isLight ? (
          /* Left column: Empty to balance the Lady Justice statue layout */
          <div className="hidden lg:block w-full h-full" />
        ) : null}


        {/* Right column (or Centered wrapper for dark slides) */}
        <div key={active} className={`w-full animate-in fade-in duration-700 ${
          isLight ? "flex flex-col items-start text-left lg:pl-8 xl:pl-16" : "flex flex-col items-center"
        }`}>
          <span className={`block text-[0.8rem] uppercase tracking-[0.4em] font-sans ${
            isLight ? "text-muted-foreground" : "text-primary-foreground/90"
          }`}>
            {activeSlide.eyebrow}
          </span>
          
          <h1 className={`mt-5 text-4xl leading-[1.15] md:text-5xl lg:text-[4.2rem] font-display transition-colors duration-1000 tracking-tight font-medium ${
            isLight ? "text-navy" : "text-primary-foreground"
          }`}>
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
          
          <p className={`mt-6 text-sm md:text-base leading-relaxed max-w-xl transition-colors duration-1000 font-sans ${
            isLight ? "text-muted-foreground" : "text-primary-foreground/75"
          } ${isLight ? "" : "mx-auto"}`}>
            {activeSlide.desc}
          </p>

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
      </div>

      {/* Slide Indicators dot panel (Right vertical center) */}
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
