import { useEffect, useState } from "react";
import { Menu, Phone, Mail, Search, X, Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import logo from "@/assets/darton-logo.png";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Who We Are", href: "#about" },
  { label: "Practice Areas", href: "#practice" },
  { label: "Attorneys", href: "#team" },
  { label: "Our Projects", href: "#projects" },
  { label: "Legal Insights", href: "#insights" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header id="home" className="relative z-50">
      {/* Top utility bar */}
      <div className="hidden bg-navy-deep text-primary-foreground lg:block">
        <div className="mx-auto flex max-w-[1400px] items-stretch justify-between px-6">
          <div className="flex">
            <a
              href="tel:+255222000000"
              className="flex items-center gap-3 border-x border-white/10 px-8 py-4 text-sm tracking-wide transition-colors hover:text-gold"
            >
              <Phone className="size-4 text-gold" strokeWidth={1.5} />
              +255 22 200 0000
            </a>
            <a
              href="mailto:info@dartonattorneys.co.tz"
              className="flex items-center gap-3 border-r border-white/10 px-8 py-4 text-sm tracking-wide transition-colors hover:text-gold"
            >
              <Mail className="size-4 text-gold" strokeWidth={1.5} />
              info@dartonattorneys.co.tz
            </a>
          </div>
          <div className="flex">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#get-involved"
                aria-label="Darton Attorneys social profile"
                className="flex items-center border-l border-white/10 px-6 transition-colors hover:text-gold"
              >
                <Icon className="size-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`w-full bg-background ${stuck ? "fixed inset-x-0 top-0 shadow-[0_4px_24px_rgba(13,27,52,0.12)]" : ""
          }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-5">
          <a href="#home" className="shrink-0">
            <img
              src={logo}
              alt="Darton Attorneys logo"
              className="h-11 w-auto md:h-14"
              width={520}
              height={140}
            />
          </a>

          <nav className="hidden items-center gap-9 xl:flex">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[0.78rem] uppercase tracking-[0.18em] text-foreground transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#get-involved"
              className="text-[0.78rem] uppercase tracking-[0.18em] text-foreground transition-colors hover:text-gold"
            >
              Get Involved
            </a>
            <Search className="size-5 text-foreground" strokeWidth={1.5} />
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            className="text-foreground xl:hidden"
          >
            {open ? <Menu className="size-7" /> : <Menu className="size-7" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border bg-background xl:hidden">
            <nav className="mx-auto flex max-w-[1400px] flex-col px-6 py-4">
              {[...NAV, { label: "Get Involved", href: "#get-involved" }].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3 text-[0.8rem] uppercase tracking-[0.18em] text-foreground last:border-0"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
      {stuck && <div className="h-[86px]" aria-hidden />}
      <X className="hidden" aria-hidden />
    </header>
  );
}
