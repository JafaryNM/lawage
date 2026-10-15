// Plain data only (no asset imports) so the database seed and the admin script can load it

export const SLIDE_FOCUS = ["center", "top", "bottom"] as const;
export type SlideFocus = (typeof SLIDE_FOCUS)[number];

/** Built-in photos shipped with the site; uploaded photos are stored as "upload:<file>" */
export const BUILTIN_IMAGES = {
  "builtin:advocate-desk": "Advocate at his desk",
  "builtin:contract-review": "Contract review",
  "builtin:advocate-handshake": "Handshake with a client",
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
    image: "builtin:advocate-desk",
    imageAlt: "Advocate writing at his desk beside the scales of justice",
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
    image: "builtin:contract-review",
    imageAlt: "Advocate guiding a client through a contract",
    focus: "top",
    primaryLabel: "Practice Areas",
    primaryHref: "/#practice",
    secondaryLabel: "Contact Us",
    secondaryHref: "/contact",
  },
  {
    title: "Expert in Legal Specialties",
    description: "Suitable for complex legal, regulatory, and business environments.",
    image: "builtin:advocate-handshake",
    imageAlt: "Advocate in court robes shaking hands with a client",
    focus: "top",
    primaryLabel: "Practice Areas",
    primaryHref: "/#practice",
    secondaryLabel: "Contact Us",
    secondaryHref: "/contact",
  },
];
