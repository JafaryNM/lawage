import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FlatIcon } from "@/components/site/FlatIcon";
import { PageBanner } from "@/components/site/PageBanner";
import { SERVICES, type Service } from "@/lib/services";

import banner from "@/assets/hero-legal-review.jpg";

const CONTACTS = [
  { Icon: MapPin, text: "Masaki, Chole Road, Dar es Salaam, Tanzania" },
  { Icon: Phone, text: "+255 22 200 0000", href: "tel:+255222000000" },
  { Icon: Mail, text: "info@dartonattorneys.co.tz", href: "mailto:info@dartonattorneys.co.tz" },
];

/** Practice-area page: sidebar of all services, contact box and the service write-up */
export function ServiceDetail({ service }: { service: Service }) {
  const index = SERVICES.findIndex((s) => s.slug === service.slug);
  const prev = SERVICES[(index - 1 + SERVICES.length) % SERVICES.length]!;
  const next = SERVICES[(index + 1) % SERVICES.length]!;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageBanner
        title={service.title}
        crumbs={[{ label: "Services", to: "/services" }, { label: service.title }]}
        image={banner}
      />

      <section className="section-pad">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 lg:grid-cols-[340px_1fr]">
          {/* SIDEBAR */}
          <aside className="order-2 space-y-8 lg:order-1 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-[8px] bg-[#f0f0f0] p-7">
              <h2 className="flex items-center gap-4 text-2xl text-foreground">
                Our Services
                <span className="h-px w-12 bg-brand" />
              </h2>
              <ul className="mt-6 space-y-3">
                {SERVICES.map((s) => {
                  const active = s.slug === service.slug;
                  return (
                    <li key={s.slug}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-center justify-between gap-3 rounded-[6px] px-5 py-4 text-[0.95rem] transition-colors duration-300 ${
                          active
                            ? "bg-brand text-white"
                            : "bg-white text-foreground hover:bg-brand hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <FlatIcon
                            name={s.icon}
                            className={`size-5 shrink-0 transition-colors ${
                              active ? "text-white" : "text-brand group-hover:text-white"
                            }`}
                          />
                          {s.title}
                        </span>
                        <ArrowUpRight
                          className={`size-4 shrink-0 transition-transform duration-300 group-hover:rotate-45 ${
                            active ? "text-white" : "text-brand group-hover:text-white"
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-[8px] bg-brand p-7 text-white">
              <h2 className="flex items-center gap-4 text-2xl">
                Contact Info
                <span className="h-px w-12 bg-white/60" />
              </h2>
              <ul className="mt-6 space-y-5">
                {CONTACTS.map(({ Icon, text, href }) => (
                  <li key={text} className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[6px] bg-white/15">
                      <Icon className="size-4" strokeWidth={1.6} />
                    </span>
                    {href ? (
                      <a href={href} className="pt-2 text-sm text-white/85 transition-colors hover:text-white">
                        {text}
                      </a>
                    ) : (
                      <span className="pt-2 text-sm text-white/85">{text}</span>
                    )}
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className="mt-8 flex items-center justify-center gap-2 rounded-[6px] bg-white px-6 py-3.5 text-sm uppercase tracking-[0.15em] text-brand transition-colors hover:bg-brand-deep hover:text-white"
              >
                Book a Consultation <ArrowRight className="size-4" strokeWidth={1.5} />
              </a>
            </div>
          </aside>

          {/* CONTENT */}
          <article className="order-1 lg:order-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[8px]">
              <img src={service.image} alt={service.title} className="absolute inset-0 size-full object-cover" />
              <span className="absolute bottom-0 left-0 flex size-20 items-center justify-center rounded-tr-[8px] bg-brand text-white">
                <FlatIcon name={service.icon} className="size-9" />
              </span>
            </div>

            <h2 className="mt-10 text-3xl leading-[1.2] text-foreground md:text-4xl">{service.headline}</h2>
            {service.intro.map((p) => (
              <p key={p} className="mt-5 text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}

            <h3 className="mt-12 text-2xl text-foreground">How We Can Help</h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {service.scope.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-[6px] bg-[#f0f0f0] px-5 py-4 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={1.5} />
                  {item}
                </li>
              ))}
            </ul>

            <blockquote className="mt-12 rounded-[8px] border-l-4 border-brand bg-brand/5 px-8 py-7">
              <p className="font-display text-xl italic leading-relaxed text-foreground">{service.approach}</p>
            </blockquote>

            {/* Previous / next service */}
            <nav className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
              <Link
                to="/services/$slug"
                params={{ slug: prev.slug }}
                className="group flex items-center gap-4 rounded-[6px] p-4 transition-colors hover:bg-[#f0f0f0]"
              >
                <ArrowLeft className="size-5 shrink-0 text-brand transition-transform group-hover:-translate-x-1" />
                <span>
                  <span className="block text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">Previous</span>
                  <span className="text-lg text-foreground">{prev.title}</span>
                </span>
              </Link>
              <Link
                to="/services/$slug"
                params={{ slug: next.slug }}
                className="group flex items-center justify-end gap-4 rounded-[6px] p-4 text-right transition-colors hover:bg-[#f0f0f0]"
              >
                <span>
                  <span className="block text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">Next</span>
                  <span className="text-lg text-foreground">{next.title}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
              </Link>
            </nav>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
