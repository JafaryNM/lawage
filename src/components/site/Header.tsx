import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/darton-logo.png";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "#home"
  },
  {
    label: "About Us",
    href: "#about"
  },
  {
    label: "Service",
    href: "#practice"
  },
  {
    label: "Portfolio",
    href: "#projects"
  },
  {
    label: "Blog",
    href: "#insights"
  },
  {
    label: "Contact Us",
    href: "#get-involved"
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
          ? "fixed inset-x-0 top-0 shadow-[0_4px_24px_rgba(13,27,52,0.06)]"
          : "absolute inset-x-0 top-0"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-4 lg:py-5">
        <a href="#home" className="shrink-0">
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
                className="flex items-center gap-1.5 text-[0.78rem] font-medium uppercase tracking-[0.18em] transition-colors duration-200 hover:text-gold"
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
            href="#projects"
            className="ml-2 inline-flex items-center gap-2 bg-[#C49B7A] text-white text-[0.75rem] font-semibold uppercase tracking-[0.15em] px-6 py-3.5 transition-colors hover:bg-white hover:text-[#C49B7A] border border-transparent hover:border-[#C49B7A]"
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
