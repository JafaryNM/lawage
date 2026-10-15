"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/lawage-logo.png";

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
    href: "/services"
  },
  {
    label: "Team",
    href: "/team"
  },
  {
    label: "Blog",
    href: "/blog"
  },
  {
    label: "Contact Us",
    href: "/contact"
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
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-4 lg:py-5">
        <a href="/" className="shrink-0">
          <img
            src={logo.src}
            alt="LawAge Advocates & Consult logo"
            className={`h-11 w-auto md:h-14 transition-all duration-300 ${
              isHeaderLight ? "" : "brightness-0 invert"
            }`}
            width={679}
            height={770}
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
