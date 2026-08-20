import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import logo from "@/assets/darton-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-primary-foreground">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-block bg-background px-4 py-3">
            <img
              src={logo.url}
              alt="Darton Attorneys logo"
              className="h-12 w-auto"
              loading="lazy"
              width={520}
              height={140}
            />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-primary-foreground/70">
            A Tanzanian law firm built on integrity, diligence and results. We advise businesses,
            institutions and individuals across Dar es Salaam and beyond.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#get-involved"
                aria-label="Darton Attorneys social profile"
                className="flex size-10 items-center justify-center border border-white/15 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="size-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-2xl text-primary-foreground">Quick Links</h4>
          <span className="mt-3 block h-px w-12 bg-gold" />
          <ul className="mt-6 space-y-3 text-sm text-primary-foreground/70">
            {[
              ["Who We Are", "#about"],
              ["Practice Areas", "#practice"],
              ["Attorneys Profiles", "#team"],
              ["Our Projects", "#projects"],
              ["Testimonials", "#testimonials"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <li key={label}>
                <a href={href} className="transition-colors hover:text-gold">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-2xl text-primary-foreground">Practice</h4>
          <span className="mt-3 block h-px w-12 bg-gold" />
          <ul className="mt-6 space-y-3 text-sm text-primary-foreground/70">
            {[
              "Corporate & Commercial",
              "Litigation & Arbitration",
              "Land & Property",
              "Family Law",
              "Employment & Labour",
              "Tax Advisory",
            ].map((label) => (
              <li key={label}>
                <a href="#practice" className="transition-colors hover:text-gold">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-2xl text-primary-foreground">Get In Touch</h4>
          <span className="mt-3 block h-px w-12 bg-gold" />
          <ul className="mt-6 space-y-4 text-sm text-primary-foreground/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
              Masaki, Chole Road, Dar es Salaam, Tanzania
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
              <a href="tel:+255222000000" className="transition-colors hover:text-gold">
                +255 22 200 0000
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
              <a
                href="mailto:info@dartonattorneys.co.tz"
                className="transition-colors hover:text-gold"
              >
                info@dartonattorneys.co.tz
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-6 py-6 text-xs tracking-wide text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Darton Attorneys. All rights reserved.</p>
          <p>Advocates, Notaries Public & Commissioners for Oaths — Dar es Salaam, Tanzania</p>
        </div>
      </div>
    </footer>
  );
}
