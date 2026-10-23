import { z } from "zod";

import { SLIDE_FOCUS } from "@/lib/slides-data";

// Internal paths, page anchors, web links, phone and email links
const href = z
  .string()
  .trim()
  .max(300)
  .refine((v) => v === "" || /^(\/|#|https?:\/\/|tel:|mailto:)/.test(v), "Use a link like /contact or https://…");

/** Text fields of the slide form (POST/PUT /api/admin/slides); the photo is checked separately */
export const SlideFieldsSchema = z
  .object({
    title: z.string().trim().min(1, "Enter a title.").max(120, "Keep the title under 120 characters."),
    description: z.string().trim().max(300, "Keep the text under 300 characters."),
    imageAlt: z.string().trim().max(160),
    focus: z.enum(SLIDE_FOCUS),
    primaryLabel: z.string().trim().max(30, "Keep button text under 30 characters."),
    primaryHref: href,
    secondaryLabel: z.string().trim().max(30, "Keep button text under 30 characters."),
    secondaryHref: href,
    isActive: z.boolean(),
  })
  .superRefine((v, ctx) => {
    // A button needs both its text and its link
    for (const b of ["primary", "secondary"] as const) {
      const label = v[`${b}Label`];
      const link = v[`${b}Href`];
      if (label && !link) ctx.addIssue({ code: "custom", path: [`${b}Href`], message: "Add a link for this button." });
      if (link && !label) ctx.addIssue({ code: "custom", path: [`${b}Label`], message: "Add text for this button." });
    }
  });

export const SlideToggleSchema = z.object({ isActive: z.boolean() });
export const SlideMoveSchema = z.object({ direction: z.enum(["up", "down"]) });

export const LoginSchema = z.object({
  username: z.string().trim().min(1, "Enter your username."),
  password: z.string().min(1, "Enter your password."),
});

// `website` is a hidden honeypot field: people leave it empty, spam bots fill it in
const honeypot = z.string().max(500).optional();

/** Public contact form (POST /api/contact) */
export const ContactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  phone: z.string().trim().max(40),
  area: z.string().trim().max(120),
  message: z.string().trim().min(1, "Tell us briefly how we can help.").max(5000, "Keep the message under 5,000 characters."),
  website: honeypot,
});

/** Footer newsletter sign-up (POST /api/subscribe) */
export const SubscribeSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(200),
  website: honeypot,
});
