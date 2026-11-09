"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Loader2, Mail, MapPin, Navigation, Phone, Send } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer, WHATSAPP_URL } from "@/components/site/Footer";
import { PageBanner } from "@/components/site/PageBanner";
import { SERVICES } from "@/lib/services";

import banner from "@/assets/contact-banner.jpg";

// Default details from lawage.co.tz/contact-us
const DEFAULT_ADDRESS =
  "Plot 33, Block AC, Medeli, Tambukareli, First Floor, P.O. Box 1909, Dodoma, Tanzania";
const DEFAULT_DAR_ADDRESS =
  "3rd Floor, Sukari House, Sokoine Drive/Ohio Street, P.O. Box 75841, Dar es Salaam";
const MAP_QUERY = "Tanzania Office of Sundy Law Firm, Makulu 41107, Dodoma, Tanzania";
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;
const DEFAULT_EMAIL = "info@lawage.co.tz";

const inputClass =
  "w-full border border-border bg-white px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand";

export type ContactSettings = {
  address_dodoma?: string;
  address_dar?: string;
  email_primary?: string;
  phone_call?: string;
  phone_whatsapp?: string;
};

export function ContactPage({
  settings,
  services,
}: {
  settings?: ContactSettings;
  services?: { slug: string; title: string }[];
}) {
  const address = settings?.address_dodoma || DEFAULT_ADDRESS;
  const darAddress = settings?.address_dar || DEFAULT_DAR_ADDRESS;
  const email = settings?.email_primary || DEFAULT_EMAIL;
  const phoneCall = settings?.phone_call || "+255 713 282263";
  const phoneWhatsapp = settings?.phone_whatsapp || "+255 777 626294";
  const servicesList = services && services.length ? services : SERVICES;

  const infoItems: { Icon: typeof MapPin; title: string; lines: { text: string; href?: string }[] }[] = [
    { Icon: MapPin, title: "Dodoma Office", lines: [{ text: address }] },
    { Icon: MapPin, title: "Dar es Salaam Office", lines: [{ text: darAddress }] },
    {
      Icon: Phone,
      title: "Call or WhatsApp",
      lines: [
        { text: `${phoneCall} · Call`, href: `tel:${phoneCall.replace(/[^0-9+]/g, "")}` },
        { text: `${phoneWhatsapp} · WhatsApp`, href: WHATSAPP_URL },
      ],
    },
    { Icon: Mail, title: "Email Us", lines: [{ text: email, href: `mailto:${email}` }] },
  ];

  const [form, setForm] = useState({ name: "", email: "", phone: "", area: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const update = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || "Failed to send message. Please try again.");
      }

      setIsSubmitted(true);
      setForm({ name: "", email: "", phone: "", area: "", message: "" });
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong.");
      // Fallback: allow sending via mailto if network error
      const subject = `Enquiry from ${form.name}${form.area ? ` – ${form.area}` : ""}`;
      const body = `${form.message}\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nPractice area: ${form.area || "Not specified"}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageBanner title="Contact Us" crumbs={[{ label: "Contact Us" }]} image={banner.src} />

      <section className="section-pad bg-[#f4f3f8]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center">
            <span className="inline-block bg-white px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-foreground">
              Get In Touch
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl text-4xl leading-[1.15] text-foreground md:text-5xl">
              Let's Work <span className="text-brand">Together</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Whether you are establishing a business, expanding your investments, resolving a
              dispute, protecting your assets, or navigating an evolving regulatory environment,
              LawAge Advocates is ready to stand beside you as a trusted legal partner.
            </p>
          </div>

          <div className="mt-14 grid overflow-hidden bg-white shadow-[0_24px_60px_rgba(33,28,79,0.1)] lg:grid-cols-[0.85fr_1.15fr]">
            {/* INFO PANEL */}
            <div className="relative isolate overflow-hidden p-8 text-white md:p-12">
              <img
                src={banner.src}
                alt=""
                aria-hidden
                className="absolute inset-0 -z-10 size-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-brand-deep/[0.93]" />

              <h3 className="text-3xl">Contact Information</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Reach us by phone, WhatsApp or email, or visit our offices in Dodoma and Dar es
                Salaam.
              </p>

              <ul className="mt-10 space-y-8">
                {infoItems.map(({ Icon, title, lines }) => (
                  <li key={title} className="flex gap-5">
                    <span className="flex size-12 shrink-0 items-center justify-center bg-gold">
                      <Icon className="size-5" strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.22em] text-white/60">
                        {title}
                      </p>
                      {lines.map(({ text, href }) =>
                        href ? (
                          <a
                            key={text}
                            href={href}
                            className="mt-1.5 block text-[0.95rem] transition-colors hover:text-gold"
                          >
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

              {isSubmitted ? (
                <div className="mt-8 rounded-[6px] border border-gold/40 bg-brand/5 p-8 text-center">
                  <CheckCircle2 className="mx-auto size-12 text-gold" />
                  <h4 className="mt-4 text-2xl font-normal text-foreground">Message Received</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Thank you for reaching out. One of our advocates will review your enquiry and get back to you promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 inline-block bg-brand px-6 py-2.5 text-xs uppercase tracking-wider text-white hover:bg-brand-deep"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2" suppressHydrationWarning>
                  {errorMessage && (
                    <div className="sm:col-span-2 rounded bg-destructive/10 p-3 text-xs text-destructive">
                      {errorMessage}
                    </div>
                  )}

                  <Field label="Full Name" id="contact-name">
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={update("name")}
                      className={inputClass}
                      suppressHydrationWarning
                    />
                  </Field>
                  <Field label="Email" id="contact-email">
                    <input
                      id="contact-email"
                      name="email"
                      autoComplete="email"
                      required
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={update("email")}
                      className={inputClass}
                      suppressHydrationWarning
                    />
                  </Field>
                  <Field label="Phone" id="contact-phone">
                    <input
                      id="contact-phone"
                      name="phone"
                      autoComplete="tel"
                      type="tel"
                      placeholder="+255 …"
                      value={form.phone}
                      onChange={update("phone")}
                      className={inputClass}
                      suppressHydrationWarning
                    />
                  </Field>
                  <Field label="Practice Area" id="contact-area">
                    <select
                      id="contact-area"
                      name="area"
                      value={form.area}
                      onChange={update("area")}
                      className={`${inputClass} cursor-pointer`}
                      suppressHydrationWarning
                    >
                      <option value="">Select a practice area</option>
                      {servicesList.map((s) => (
                        <option key={s.slug} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Message" id="contact-message" wide>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="How can we help?"
                      value={form.message}
                      onChange={update("message")}
                      className={`${inputClass} resize-y`}
                      suppressHydrationWarning
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex cursor-pointer items-center gap-2 bg-brand px-9 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-deep disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          Sending... <Loader2 className="size-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Send Message <Send className="size-4" strokeWidth={1.5} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section aria-label="Office location map" className="relative">
        <iframe
          title="LawAge Advocates office location"
          src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&output=embed`}
          className="block h-[420px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-5 left-5 inline-flex items-center gap-2 bg-brand px-5 py-3 text-xs uppercase tracking-[0.15em] text-white shadow-lg transition-colors hover:bg-brand-deep"
        >
          <Navigation className="size-4" /> Get Directions
        </a>
      </section>

      <Footer />
    </div>
  );
}

function Field({
  label,
  id,
  wide = false,
  children,
}: {
  label: string;
  id?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`block ${wide ? "sm:col-span-2" : ""}`} suppressHydrationWarning>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.7rem] uppercase tracking-[0.2em] text-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
