import { Link } from "@tanstack/react-router";
import {
  ArrowUp,
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";

import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

import logo from "@/assets/lawage-logo.png";
import ctaBg from "@/assets/client-consultation-cafe.jpg";

const QUICK_LINKS = [
  ["Home", "/"],
  ["Who We Are", "/about"],
  ["Practice Areas", "/services"],
  ["Our Attorneys", "/#team"],
  ["Legal Insights", "/blog"],
  ["Contact Us", "/contact"],
] as const;

const SOCIALS = [
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/lawage_consult" },
];

/** Column heading with a short orange rule underneath */
function FooterHeading({ children }: { children: string }) {
  return (
    <div>
      <h4 className="text-[0.75rem] uppercase tracking-[0.22em] text-white">{children}</h4>
      <span className="mt-3 block h-0.5 w-8 bg-gold" />
    </div>
  );
}

export function Footer() {
  return (
    <footer id="get-involved" className="relative isolate overflow-hidden bg-brand-deep text-white">
      {/* Oversized logo watermark */}
      <img
        src={logo}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-24 -z-10 w-[520px] opacity-[0.04] brightness-0 invert select-none"
      />

      {/* Call to action — photo band with navy overlay */}
      <div className="relative border-b border-white/10">
        <img
          src={ctaBg}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-deep via-brand-deep/85 to-brand-deep/60" />
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-16 md:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="text-[0.72rem] uppercase tracking-[0.25em] text-gold">Need Legal Advice?</span>
            <h2 className="mt-4 max-w-2xl text-4xl leading-[1.15] text-white md:text-5xl">
              Let's Discuss Your <span className="text-gold">Next Legal Matter</span>
            </h2>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <a href="tel:+255713282263" className="group flex items-center gap-4">
              <span className="flex size-14 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-gold group-hover:bg-gold">
                <Phone className="size-5" strokeWidth={1.5} />
              </span>
              <span>
                <span className="block text-[0.68rem] uppercase tracking-[0.2em] text-white/60">
                  Call Us Anytime
                </span>
                <span className="mt-0.5 block font-[var(--font-display)] text-xl">+255 713 282263</span>
              </span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-white hover:text-brand"
            >
              Book Appointment <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6">
        {/* Main columns */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <span className="inline-flex size-20 items-center justify-center rounded-full bg-white p-3.5">
              <img src={logo} alt="LawAge Advocates & Consult logo" className="h-full w-auto" loading="lazy" width={679} height={770} />
            </span>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
              A full-service Tanzanian law firm delivering practical, innovative, and results-oriented
              legal solutions. A Class Above Legal Excellence.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="mt-7 max-w-sm">
              <label htmlFor="footer-newsletter" className="text-[0.68rem] uppercase tracking-[0.2em] text-white/60">
                Industry alerts &amp; insights
              </label>
              <div className="mt-3 flex items-center rounded-full border border-white/15 bg-white/5 p-1.5 transition-colors focus-within:border-gold">
                <input
                  id="footer-newsletter"
                  required
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gold text-white transition-colors hover:bg-white hover:text-brand"
                >
                  <Send className="size-4" strokeWidth={1.75} />
                </button>
              </div>
            </form>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="mt-6 space-y-3 text-sm">
              {QUICK_LINKS.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="group inline-flex items-center gap-2 text-white/65 transition-colors hover:text-white">
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <FooterHeading>Get In Touch</FooterHeading>
            <ul className="mt-6 space-y-5 text-sm text-white/65">
              <li className="flex gap-3.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
                <span>
                  <span className="block text-white">Dodoma Office</span>
                  Plot 33, Block AC, Medeli, Tambukareli, First Floor, P.O. Box 1909, Dodoma, Tanzania
                </span>
              </li>
              <li className="flex gap-3.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
                <span>
                  <span className="block text-white">Dar es Salaam Office</span>
                  3rd Floor, Sukari House, Sokoine Drive/Ohio Street, P.O. Box 75841, Dar es Salaam
                </span>
              </li>
              <li className="flex gap-3.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
                <a href="mailto:info@lawage.co.tz" className="transition-colors hover:text-white">
                  info@lawage.co.tz
                </a>
              </li>
              <li className="flex gap-3.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
                <a href="tel:+255713282263" className="transition-colors hover:text-white">
                  +255 713 282263 (Call / WhatsApp)
                </a>
              </li>
            </ul>

            <div className="mt-7 flex gap-2.5">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href ?? "#"}
                  target={href ? "_blank" : undefined}
                  rel={href ? "noopener noreferrer" : undefined}
                  aria-label={`LawAge Advocates & Consult on ${label}`}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold hover:bg-gold hover:text-white"
                >
                  <Icon className="size-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} LawAge Advocates & Consult. All rights reserved. Icons by{" "}
            <a
              href="https://www.flaticon.com/uicons"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Flaticon
            </a>
            .
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" hash="privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link to="/privacy-policy" hash="terms" className="transition-colors hover:text-white">Terms &amp; Conditions</Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-gold text-white transition-transform hover:-translate-y-1"
            >
              <ArrowUp className="size-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
      {/* Floating WhatsApp chat button, shown on every page */}
      <a
        href="https://wa.me/255713282263"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with LawAge on WhatsApp"
        className="group fixed right-5 bottom-5 z-50 flex items-center gap-3 md:right-8 md:bottom-8"
      >
        <span className="hidden rounded-full bg-white px-4 py-2 text-sm text-foreground shadow-lg transition-all duration-300 md:block md:translate-x-2 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
          Chat with us
        </span>
        <span className="relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-transform duration-300 group-hover:scale-110">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
          <WhatsAppIcon className="relative size-7" />
        </span>
      </a>
    </footer>
  );
}
