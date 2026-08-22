import { useEffect, useState } from "react";
import { Menu, Search, X, ShoppingCart, ChevronDown, ArrowRight } from "lucide-react";
import logo from "@/assets/darton-logo.png";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "#home",
    dropdown: [
      { label: "Welcome Slide", href: "#home" },
      { label: "Practice Areas", href: "#practice" },
      { label: "Who We Are", href: "#about" },
    ]
  },
  {
    label: "Pages",
    href: "#about",
    dropdown: [
      { label: "Who We Are", href: "#about" },
      { label: "Our Journey", href: "#faq" },
      { label: "Our Team", href: "#team" },
      { label: "FAQ", href: "#faq" },
    ]
  },
  {
    label: "Service",
    href: "#practice",
    dropdown: [
      { label: "Corporate & Commercial", href: "#practice" },
      { label: "Litigation & Arbitration", href: "#practice" },
      { label: "Land & Property Law", href: "#practice" },
      { label: "Family Law", href: "#practice" },
      { label: "Employment & Labour", href: "#practice" },
      { label: "Tax & Regulatory", href: "#practice" },
    ]
  },
  {
    label: "Portfolio",
    href: "#projects",
    dropdown: [
      { label: "Selected Matters", href: "#projects" },
      { label: "Recent Work", href: "#projects" },
    ]
  },
  {
    label: "Blog",
    href: "#insights",
    dropdown: [
      { label: "Latest Commentary", href: "#insights" },
      { label: "Legal Insights", href: "#insights" },
    ]
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
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHeaderLight = stuck || theme === "light";

  return (
    <header
      className={`z-50 transition-all duration-300 ${
        stuck
          ? "fixed inset-x-0 top-0 bg-background/95 backdrop-blur-md shadow-[0_4px_24px_rgba(13,27,52,0.12)]"
          : isHeaderLight
          ? "absolute inset-x-0 top-0 bg-transparent border-b border-black/5"
          : "absolute inset-x-0 top-0 bg-transparent border-b border-white/5"
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
              onMouseEnter={() => setHoveredMenu(item.label)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <a
                href={item.href}
                className="flex items-center gap-1.5 text-[0.78rem] font-medium uppercase tracking-[0.18em] transition-colors duration-200 hover:text-gold"
              >
                {item.label}
                {item.dropdown && (
                  <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" />
                )}
              </a>

              {item.dropdown && hoveredMenu === item.label && (
                <div
                  className={`absolute left-0 top-full z-50 w-60 border shadow-lg transition-all duration-200 animate-in fade-in-50 slide-in-from-top-2 ${
                    isHeaderLight
                      ? "border-border bg-white text-foreground"
                      : "border-white/10 bg-navy-deep text-white"
                  }`}
                >
                  <div className="py-2.5">
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className={`block px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.12em] transition-colors duration-150 ${
                          isHeaderLight
                            ? "hover:bg-muted hover:text-gold text-foreground"
                            : "hover:bg-navy/80 hover:text-gold text-white"
                        }`}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side: Search, Cart, Button */}
        <div
          className={`hidden items-center gap-6 xl:flex transition-colors duration-300 ${
            isHeaderLight ? "text-foreground" : "text-white"
          }`}
        >
          <button className="p-1.5 hover:text-gold transition-colors cursor-pointer" aria-label="Search site">
            <Search className="size-5" strokeWidth={1.5} />
          </button>
          
          <button className="relative p-1.5 hover:text-gold transition-colors cursor-pointer" aria-label="Shopping cart">
            <ShoppingCart className="size-5" strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#EA580C] text-[9px] font-bold text-white font-sans">
              0
            </span>
          </button>

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
                    onClick={() => !item.dropdown && setOpen(false)}
                    className="text-[0.8rem] uppercase tracking-[0.18em] text-foreground font-medium"
                  >
                    {item.label}
                  </a>
                </div>
                {item.dropdown && (
                  <div className="pl-4 pb-2 flex flex-col gap-2">
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setOpen(false)}
                        className="text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground hover:text-gold py-1"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile cart / search indicators */}
            <div className="flex items-center gap-6 border-t border-border mt-4 pt-4 pb-2">
              <button className="flex items-center gap-2 text-[0.8rem] uppercase tracking-[0.18em] text-foreground">
                <Search className="size-5 text-foreground" strokeWidth={1.5} /> Search
              </button>
              
              <button className="relative flex items-center gap-2 text-[0.8rem] uppercase tracking-[0.18em] text-foreground font-sans">
                <ShoppingCart className="size-5 text-foreground" strokeWidth={1.5} /> Cart
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#EA580C] text-[9px] font-bold text-white">
                  0
                </span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
