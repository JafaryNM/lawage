import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, MapPin, Phone, Mail, Facebook, Linkedin, Twitter, Instagram } from "lucide-react";
import logo from "@/assets/darton-logo.png";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "About Us",
    href: "/about"
  },
  {
    label: "Service",
    href: "/#practice"
  },
  {
    label: "Portfolio",
    href: "/#projects"
  },
  {
    label: "Blog",
    href: "/#insights"
  },
  {
    label: "Contact Us",
    href: "/#get-involved"
  }
];

interface HeaderProps {
  theme?: "light" | "dark";
}

export function Header({ theme = "dark" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHeaderLight = true;

  return (
    <header
      className={`z-50 transition-all duration-300 bg-white border-b border-black/5 ${
        stuck
          ? "fixed inset-x-0 top-0 shadow-[0_4px_24px_rgba(109,20,41,0.08)]"
          : "absolute inset-x-0 top-0"
      }`}
    >
      {/* Top info banner (collapses once the header sticks) */}
      {!stuck && (
        <div className="bg-brand text-white">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-2.5 text-[0.72rem] tracking-[0.08em]">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
              <span className="hidden items-center gap-2 lg:flex">
                <MapPin className="size-3.5" strokeWidth={1.5} />
                Masaki, Chole Road, Dar es Salaam, Tanzania
              </span>
              <a href="tel:+255222000000" className="flex items-center gap-2 transition-colors hover:text-gold">
                <Phone className="size-3.5" strokeWidth={1.5} />
                +255 22 200 0000
              </a>
              <a
                href="mailto:info@dartonattorneys.co.tz"
                className="hidden items-center gap-2 transition-colors hover:text-gold sm:flex"
              >
                <Mail className="size-3.5" strokeWidth={1.5} />
                info@dartonattorneys.co.tz
              </a>
            </div>
            <div className="flex items-center gap-4">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`Darton Attorneys ${label}`}
                  className="transition-colors hover:text-gold"
                >
                  <Icon className="size-3.5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-4 lg:py-5">
        <a href="/" className="shrink-0">
          <img
            src={logo}
            alt="Darton Attorneys logo"
            className={`h-11 w-auto md:h-14 transition-all duration-300 ${
              isHeaderLight ? "" : "brightness-0 invert"
            }`}
            width={520}
            height={140}
          />
        </a>

        {/* Center: Navigation Links */}
        <nav
          className={`hidden items-center gap-7 xl:flex transition-colors duration-300 ${
            isHeaderLight ? "text-foreground" : "text-white"
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative py-3"
            >
              <a
                href={item.href}
                className="flex items-center gap-1.5 text-[0.78rem] font-medium uppercase tracking-[0.18em] transition-colors duration-200 hover:text-brand"
              >
                {item.label}
              </a>
            </div>
          ))}
        </nav>

        {/* Right side: Search, Cart, Button */}
        <div
          className={`hidden items-center gap-6 xl:flex transition-colors duration-300 ${
            isHeaderLight ? "text-foreground" : "text-white"
          }`}
        >


          <a
            href="/#projects"
            className="ml-2 inline-flex items-center gap-2 bg-brand text-white text-[0.75rem] font-semibold uppercase tracking-[0.15em] px-6 py-3.5 transition-colors hover:bg-brand-deep border border-transparent"
          >
            Recent Work <ArrowRight className="size-4" strokeWidth={1.5} />
          </a>
        </div>
        
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          className={`xl:hidden transition-colors ${isHeaderLight ? "text-foreground" : "text-white"}`}
        >
          {open ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-border bg-background xl:hidden absolute left-0 right-0 top-full max-h-[85vh] overflow-y-auto shadow-xl">
          <nav className="mx-auto flex flex-col px-6 py-4">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-border py-2 last:border-0">
                <div className="flex items-center justify-between py-2">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-[0.8rem] uppercase tracking-[0.18em] text-foreground font-medium"
                  >
                    {item.label}
                  </a>
                </div>
              </div>
            ))}
            

          </nav>
        </div>
      )}
    </header>
  );
}
