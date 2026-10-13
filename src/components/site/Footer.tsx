import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Globe, Handshake, Send } from "lucide-react";
import logo from "@/assets/darton-logo.png";
import ctaBg from "@/assets/business-meeting-cafe.png";

export function Footer() {
  return (
    <footer id="get-involved" className="w-full font-sans">
      {/* CTA Banner */}
      <div className="relative py-16 md:py-20 overflow-hidden">
        <img
          src={ctaBg}
          alt="Let's discuss your business"
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />
        
        <div className="relative mx-auto max-w-[1400px] px-6 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
          <h2 className="text-3xl md:text-4xl text-white font-display tracking-tight text-center md:text-left leading-tight">
            Let's discuss your <br className="hidden md:block" /> now business!
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center gap-5 bg-black/35 backdrop-blur-sm p-6 border border-white/10 rounded-none w-full md:w-auto">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-lg">
              <Handshake className="size-7 text-white" strokeWidth={1.5} />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-white/60">Looking for collaboration?</p>
              <a
                href="mailto:info@dartonattorneys.co.tz"
                className="text-lg md:text-xl font-medium text-white hover:text-gold transition-colors block mt-0.5 font-display"
              >
                info@dartonattorneys.co.tz
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer (White) */}
      <div className="bg-background text-foreground border-t border-border">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-block">
              <img
                src={logo}
                alt="Darton Attorneys logo"
                className="h-12 w-auto"
                loading="lazy"
                width={520}
                height={140}
              />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              A Tanzanian law firm built on integrity, diligence and results. We advise businesses,
              institutions and individuals across Dar es Salaam and beyond.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Globe, label: "Website" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }, i) => (
                <a
                  key={i}
                  href="/#get-involved"
                  aria-label={`Darton Attorneys ${label} profile`}
                  className="flex size-10 items-center justify-center border border-border text-muted-foreground hover:border-brand hover:text-brand transition-colors duration-200"
                >
                  <Icon className="size-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-foreground uppercase text-[0.75rem] font-semibold tracking-[0.18em] font-display">Company</h4>
            <span className="mt-3 block h-[2px] w-8 bg-brand" />
            <ul className="mt-6 space-y-3.5 text-sm text-muted-foreground">
              {[
                ["Who We Are", "/about"],
                ["Practice Areas", "/services"],
                ["Attorneys Profiles", "/#team"],
                ["Our Projects", "/#projects"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="transition-colors hover:text-brand font-medium">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground uppercase text-[0.75rem] font-semibold tracking-[0.18em] font-display">Get In Touch</h4>
            <span className="mt-3 block h-[2px] w-8 bg-brand" />
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={1.5} />
                Masaki, Chole Road, Dar es Salaam, Tanzania
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={1.5} />
                <a href="tel:+255222000000" className="transition-colors hover:text-brand font-medium">
                  +255 22 200 0000
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={1.5} />
                <a
                  href="mailto:info@dartonattorneys.co.tz"
                  className="transition-colors hover:text-brand font-medium"
                >
                  info@dartonattorneys.co.tz
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground uppercase text-[0.75rem] font-semibold tracking-[0.18em] font-display">Newsletter</h4>
            <span className="mt-3 block h-[2px] w-8 bg-brand" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Subscribe our newsletter to get the latest news and updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex max-w-md items-center border border-border bg-background focus-within:border-brand transition-colors">
              <input
                required
                type="email"
                placeholder="Enter email address"
                className="w-full bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="flex size-11 shrink-0 items-center justify-center bg-brand text-white hover:bg-brand-deep transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="size-4" strokeWidth={2} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Darton Attorneys. All rights reserved.</p>
            <div className="flex gap-6 font-medium">
              <a href="#privacy" className="hover:text-brand transition-colors">Privacy policy</a>
              <a href="#terms" className="hover:text-brand transition-colors">Terms and conditions</a>
              <a href="#copyright" className="hover:text-brand transition-colors">Copyright</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
