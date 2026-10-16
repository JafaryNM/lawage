// Plain data only (no asset imports) so the database seed and the admin script can load it

export const SLIDE_FOCUS = ["center", "top", "bottom"] as const;
export type SlideFocus = (typeof SLIDE_FOCUS)[number];

/**
 * Built-in photos shipped with the site; uploaded photos are stored as "upload:<file>".
 * No recognisable faces, at the client's request (October 2026).
 */
export const BUILTIN_IMAGES = {
  "builtin:law-library": "Law library with the scales of justice",
  "builtin:handshake-file": "Handshake over a case file",
  "builtin:legal-tech": "Lawyer at a laptop with case files",
} as const;

export type SlideFields = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  focus: SlideFocus;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

/** The original hero slides: seeded into the database and used if it is unavailable */
export const DEFAULT_SLIDES: SlideFields[] = [
  {
    title: "Trusted Legal Excellence for Every Client",
    description:
      "With over 9 years of experience, we deliver professional legal services tailored to protect your rights and achieve your goals.",
    image: "builtin:law-library",
    imageAlt: "Law library with a scales of justice statue on the desk",
    focus: "center",
    primaryLabel: "Practice Areas",
    primaryHref: "/#practice",
    secondaryLabel: "Contact Us",
    secondaryHref: "/contact",
  },
  {
    title: "Professional Legal Solutions You Can Rely On",
    description:
      "From corporate law and litigation to legal advisory and compliance, we deliver results with integrity and excellence.",
    image: "builtin:handshake-file",
    imageAlt: "Advocate shaking hands with a client holding a case file",
    focus: "center",
    primaryLabel: "Practice Areas",
    primaryHref: "/#practice",
    secondaryLabel: "Contact Us",
    secondaryHref: "/contact",
  },
  {
    title: "Expert in Legal Specialties",
    description: "Suitable for complex legal, regulatory, and business environments.",
    image: "builtin:legal-tech",
    imageAlt: "Lawyer working on a laptop beside case files and notebooks",
    focus: "center",
    primaryLabel: "Practice Areas",
    primaryHref: "/#practice",
    secondaryLabel: "Contact Us",
    secondaryHref: "/contact",
  },
];
