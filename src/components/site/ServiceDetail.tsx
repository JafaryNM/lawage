import Link from "next/link";
import { ChevronRight, CircleCheck, Mail, MapPin, Phone } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FlatIcon } from "@/components/site/FlatIcon";
import { PageBanner } from "@/components/site/PageBanner";
import { SERVICES, type Service } from "@/lib/services";

import helpBg from "@/assets/law-library-justice.jpg";

/** Practice-area page: services list and help box on the left, service overview on the right */
export function ServiceDetail({ service }: { service: Service }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageBanner
        title={service.title}
        crumbs={[{ label: "Our Services", to: "/services" }, { label: service.title }]}
        image={service.image}
      />

      <section className="section-pad">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[360px_1fr] lg:gap-8">
          {/* SIDEBAR */}
          <aside className="order-2 space-y-10 lg:order-1 lg:sticky lg:top-32 lg:self-start">
            <ul className="space-y-4">
              {SERVICES.map((s) => {
                const active = s.slug === service.slug;
                return (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center justify-between gap-3 px-5 py-4 text-[0.95rem] transition-colors duration-300 ${
                        active ? "bg-brand text-white" : "bg-[#f4f3f8] text-foreground hover:bg-brand hover:text-white"
                      }`}
                    >
                      {s.title}
                      <ChevronRight
                        className={`size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${
                          active ? "text-gold" : "text-gold"
                        }`}
                        strokeWidth={2}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* How can we help */}
            <div className="relative isolate overflow-hidden p-8 text-white">
              <img src={helpBg.src} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-10 size-full object-cover" />
              <div className="absolute inset-0 -z-10 bg-brand-deep/90" />
              <FlatIcon name="thin-balance-scale-right" className="size-14 text-gold" />
              <h2 className="mt-8 text-3xl leading-snug">How Can We Help?</h2>
              <ul className="mt-6 space-y-4 text-sm text-white/85">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.75} />
                  Plot 33, Block AC, Medeli, Tambukareli, Dodoma, Tanzania
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.75} />
                  <a href="mailto:info@lawage.co.tz" className="transition-colors hover:text-white">
                    info@lawage.co.tz
                  </a>
                </li>
              </ul>
              <a
                href="tel:+255713282263"
                className="mt-6 flex items-center gap-3 text-xl text-white transition-colors hover:text-gold"
              >
                <Phone className="size-5 text-gold" strokeWidth={1.75} />
                +255 713 282263
              </a>
            </div>
          </aside>

          {/* CONTENT */}
          <article className="order-1 lg:order-2">
            <img src={service.image} alt={service.title} className="aspect-[16/10] w-full object-cover" />

            <h2 className="mt-10 text-3xl leading-[1.2] text-foreground md:text-[2.6rem]">Service Overview</h2>
            {service.intro.map((p) => (
              <p key={p} className="mt-5 text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}

            <h3 className="mt-12 text-2xl text-foreground">What We Deliver</h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {service.scope.map((item) => (
                <li key={item} className="flex items-start gap-3 bg-[#f4f3f8] px-5 py-4 text-sm text-foreground">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-12 text-2xl text-foreground">Our Approach</h3>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{service.approach}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We advise corporates, investors, governments and development partners in navigating
              complex legal, regulatory and business environments.
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
