import { useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Send } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageBanner } from "@/components/site/PageBanner";

import { SERVICES } from "@/lib/services";

import logo from "@/assets/lawage-logo.png";
import banner from "@/assets/contact-banner.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | LawAge Advocates & Consult" },
      {
        name: "description",
        content:
          "Get in touch with LawAge Advocates & Consult in Dodoma, Tanzania. Call, WhatsApp, email or send us a message about your legal matter.",
      },
      { property: "og:title", content: "Contact Us | LawAge Advocates & Consult" },
      { property: "og:image", content: logo },
    ],
  }),
  component: Contact,
});

// Details from lawage.co.tz/contact-us
const ADDRESS = "Plot 33, Block AC, Medeli, Tambukareli, First Floor, P.O. Box 1909, Dodoma, Tanzania";
const MAP_QUERY = "Medeli, Tambukareli, Dodoma, Tanzania";
const EMAIL = "info@lawage.co.tz";
const PHONES = [
  { label: "+255 713 282263", note: "Call / WhatsApp", href: "tel:+255713282263" },
  { label: "+255 736 626290", note: "Office", href: "tel:+255736626290" },
];

const inputClass =
  "w-full border border-border bg-white px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand";

const INFO: { Icon: typeof MapPin; title: string; lines: { text: string; href?: string }[] }[] = [
  { Icon: MapPin, title: "Head Office", lines: [{ text: ADDRESS }] },
  { Icon: Phone, title: "Call Us", lines: PHONES.map(({ label, note, href }) => ({ text: `${label} · ${note}`, href })) },
  { Icon: Mail, title: "Email Us", lines: [{ text: EMAIL, href: `mailto:${EMAIL}` }] },
];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", area: "", message: "" });
  const update = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // No form backend yet: open the visitor's email app with the message pre-filled
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `Enquiry from ${form.name}${form.area ? ` – ${form.area}` : ""}`;
    const body = `${form.message}\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nPractice area: ${form.area || "Not specified"}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageBanner title="Contact Us" crumbs={[{ label: "Contact Us" }]} image={banner} />

      <section className="section-pad bg-[#f4f3f8]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center">
            <span className="inline-block bg-white px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-foreground">
              Get In Touch
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl text-4xl leading-[1.15] text-foreground md:text-5xl">
              Let's Talk About <span className="text-brand">Your Matter</span>
            </h2>
          </div>

          <div className="mt-14 grid overflow-hidden bg-white shadow-[0_24px_60px_rgba(33,28,79,0.1)] lg:grid-cols-[0.85fr_1.15fr]">
            {/* INFO PANEL */}
            <div className="relative isolate overflow-hidden p-8 text-white md:p-12">
              <img src={banner} alt="" aria-hidden className="absolute inset-0 -z-10 size-full object-cover" />
              <div className="absolute inset-0 -z-10 bg-brand-deep/[0.93]" />

              <h3 className="text-3xl">Contact Information</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Reach us by phone, WhatsApp or email, or visit our head office in Dodoma.
              </p>

              <ul className="mt-10 space-y-8">
                {INFO.map(({ Icon, title, lines }) => (
                  <li key={title} className="flex gap-5">
                    <span className="flex size-12 shrink-0 items-center justify-center bg-gold">
                      <Icon className="size-5" strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.22em] text-white/60">{title}</p>
                      {lines.map(({ text, href }) =>
                        href ? (
                          <a key={text} href={href} className="mt-1.5 block text-[0.95rem] transition-colors hover:text-gold">
                            {text}
                          </a>
                        ) : (
                          <p key={text} className="mt-1.5 text-[0.95rem] leading-relaxed">
                            {text}
                          </p>
                        ),
                      )}
                    </div>
                  </li>
                ))}
              </ul>

            </div>

            {/* FORM */}
            <div className="p-8 md:p-12">
              <h3 className="text-3xl text-foreground">
                Send Us a <span className="text-brand">Message</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Tell us briefly about your matter and the right advocate will get back to you.
              </p>

              <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field label="Full Name">
                  <input required placeholder="Your name" value={form.name} onChange={update("name")} className={inputClass} />
                </Field>
                <Field label="Email">
                  <input required type="email" placeholder="you@example.com" value={form.email} onChange={update("email")} className={inputClass} />
                </Field>
                <Field label="Phone">
                  <input type="tel" placeholder="+255 …" value={form.phone} onChange={update("phone")} className={inputClass} />
                </Field>
                <Field label="Practice Area">
                  <select value={form.area} onChange={update("area")} className={`${inputClass} cursor-pointer`}>
                    <option value="">Select a practice area</option>
                    {SERVICES.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Message" wide>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can we help?"
                    value={form.message}
                    onChange={update("message")}
                    className={`${inputClass} resize-y`}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex cursor-pointer items-center gap-2 bg-brand px-9 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-deep"
                  >
                    Send Message <Send className="size-4" strokeWidth={1.5} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section aria-label="Office location map">
        <iframe
          title="LawAge Advocates & Consult office location"
          src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
          className="block h-[420px] w-full border-0 grayscale"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <Footer />
    </div>
  );
}

function Field({ label, wide = false, children }: { label: string; wide?: boolean; children: ReactNode }) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-2 block text-[0.7rem] uppercase tracking-[0.2em] text-foreground">{label}</span>
      {children}
    </label>
  );
}
