import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Send } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FlatIcon } from "@/components/site/FlatIcon";
import { PageBanner } from "@/components/site/PageBanner";

import logo from "@/assets/darton-logo.png";
import banner from "@/assets/contact-banner.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Darton Attorneys" },
      {
        name: "description",
        content:
          "Get in touch with Darton Attorneys in Masaki, Dar es Salaam. Call, email or send us a message about your legal matter.",
      },
      { property: "og:title", content: "Contact Us | Darton Attorneys" },
      { property: "og:image", content: logo },
    ],
  }),
  component: Contact,
});

const ADDRESS = "Masaki, Chole Road, Dar es Salaam, Tanzania";
const EMAIL = "info@dartonattorneys.co.tz";
const PHONE = "+255 22 200 0000";

const inputClass =
  "w-full border-0 border-b border-foreground/20 bg-transparent px-1 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const update = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // No form backend yet: open the visitor's email app with the message pre-filled
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `Enquiry from ${form.name}`;
    const body = `${form.message}\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageBanner title="Contact Us" crumbs={[{ label: "Contact Us" }]} image={banner} />

      <section className="section-pad">
        <div className="mx-auto grid max-w-[1200px] items-start gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* CONTACT INFORMATION */}
          <div className="relative lg:pt-10">
            {/* Decorative arrow pointing towards the form */}
            <svg
              aria-hidden
              viewBox="0 0 220 90"
              className="absolute -top-6 right-6 hidden w-48 text-brand/15 md:block"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            >
              <path d="M8 84 C 30 10, 140 -4, 196 52" />
              <path d="M150 58 L 198 56 L 196 10" />
            </svg>

            <span className="rule-line eyebrow">Get In Touch</span>
            <h2 className="mt-4 text-4xl leading-[1.15] text-foreground md:text-5xl">Contact Information</h2>
            <span className="mt-6 block h-[2px] w-24 bg-gradient-to-r from-brand to-transparent" />

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="group rounded-[8px] border border-border bg-white px-6 py-10 text-center transition-colors duration-300 hover:border-brand">
                <span className="mx-auto flex size-[72px] items-center justify-center rounded-full border border-brand/40 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <FlatIcon name="location-alt" className="size-7" />
                </span>
                <h3 className="mt-6 text-2xl text-foreground">Location</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{ADDRESS}</p>
              </div>

              <div className="rounded-[8px] border border-brand bg-white px-6 py-10 text-center">
                <span className="mx-auto flex size-[72px] items-center justify-center rounded-full bg-brand text-white">
                  <FlatIcon name="user-headset" className="size-7" />
                </span>
                <h3 className="mt-6 text-2xl text-foreground">Talk To Us</h3>
                <p className="mt-4 space-y-1 text-sm leading-relaxed text-muted-foreground">
                  <a href="tel:+255222000000" className="block transition-colors hover:text-brand">
                    {PHONE}
                  </a>
                  <a href={`mailto:${EMAIL}`} className="block break-all transition-colors hover:text-brand">
                    {EMAIL}
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3 rounded-[8px] bg-[#f0f0f0] px-6 py-5 text-center text-sm text-muted-foreground">
              <Clock className="size-5 shrink-0 text-brand" strokeWidth={1.5} />
              We respond to every enquiry within one working day.
            </div>
          </div>

          {/* MESSAGE FORM */}
          <div className="rounded-[8px] bg-[#f0f0f0] p-8 md:p-12">
            <span className="rule-line eyebrow">Have Any Questions?</span>
            <h2 className="mt-4 text-4xl leading-[1.15] text-foreground md:text-5xl">Drop Us a Line</h2>
            <span className="mt-6 block h-[2px] w-24 bg-gradient-to-r from-brand to-transparent" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Tell us briefly about your matter and the right advocate will get back to you.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-6">
              <input required placeholder="Name" value={form.name} onChange={update("name")} className={inputClass} />
              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={update("email")}
                  className={inputClass}
                />
                <input type="tel" placeholder="Phone" value={form.phone} onChange={update("phone")} className={inputClass} />
              </div>
              <textarea
                required
                rows={5}
                placeholder="Message"
                value={form.message}
                onChange={update("message")}
                className={`${inputClass} resize-y`}
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-[6px] bg-brand px-8 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-deep"
              >
                Send Now <Send className="size-4" strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section aria-label="Office location map" className="px-4 pb-4">
        <iframe
          title="Darton Attorneys office location"
          src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
          className="h-[420px] w-full rounded-[8px] border-0 grayscale"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <Footer />
    </div>
  );
}
