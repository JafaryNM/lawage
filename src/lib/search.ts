import { POSTS, formatPostDate } from "@/lib/posts";
import { SERVICES } from "@/lib/services";
import { TEAM_MEMBERS } from "@/lib/team";

export const SEARCH_TYPES = ["article", "service", "person", "page"] as const;
export type SearchType = (typeof SEARCH_TYPES)[number];

/** One search hit, as returned by GET /api/search */
export type SearchResult = {
  type: SearchType;
  title: string;
  /** Short line under the title: an excerpt, job title or summary */
  excerpt: string;
  href: string;
  image?: string;
  /** Extra context, e.g. an article's date */
  meta?: string;
};

type Entry = SearchResult & { keywords: string; body: string };

const PAGES: Entry[] = [
  {
    title: "Home",
    href: "/",
    excerpt: "LawAge Advocates, a full-service Tanzanian law firm.",
    keywords: "home lawage advocates law firm tanzania",
    body: "",
  },
  {
    title: "About Us",
    href: "/about",
    excerpt: "Who we are, our vision, mission and core values.",
    keywords: "about firm history vision mission values who we are",
    body: "",
  },
  {
    title: "Our Services",
    href: "/services",
    excerpt: "All practice areas of the firm.",
    keywords: "services practice areas legal",
    body: "",
  },
  {
    title: "Our Team",
    href: "/team",
    excerpt: "Advocates, specialists and staff by department.",
    keywords: "team people advocates lawyers staff departments",
    body: "",
  },
  {
    title: "Legal Updates",
    href: "/blog",
    excerpt: "Articles, briefings and newsletters.",
    keywords: "blog articles news newsletters updates insights",
    body: "",
  },
  {
    title: "Contact Us",
    href: "/contact",
    excerpt: "Offices in Dodoma and Dar es Salaam, phone, WhatsApp and email.",
    keywords: "contact address phone whatsapp email office location map dodoma dar es salaam",
    body: "",
  },
  {
    title: "Privacy Policy & Terms",
    href: "/privacy-policy",
    excerpt: "Terms & Conditions and data protection statement.",
    keywords: "privacy policy terms conditions data protection",
    body: "",
  },
].map((p) => ({ ...p, type: "page" as const }));

// Built once per server instance from the site's content files; new articles are picked up automatically
const INDEX: Entry[] = [
  ...POSTS.map((p) => ({
    type: "article" as const,
    title: p.title,
    excerpt: p.excerpt,
    href: `/blog/${p.slug}`,
    image: p.image,
    meta: formatPostDate(p.date),
    keywords: `${p.author} ${SERVICES.find((s) => s.slug === p.area)?.title ?? ""}`,
    body: p.body.join(" "),
  })),
  ...SERVICES.map((s) => ({
    type: "service" as const,
    title: s.title,
    excerpt: s.text,
    href: `/services/${s.slug}`,
    image: s.image,
    keywords: s.headline,
    body: [...s.intro, ...s.scope, s.approach].join(" "),
  })),
  ...TEAM_MEMBERS.map((m) => ({
    type: "person" as const,
    title: m.name,
    excerpt: m.title ?? m.department,
    href: `/team/${m.slug}`,
    image: m.photo,
    keywords: [
      m.department,
      m.credentials,
      ...(m.expertise ?? []),
      ...(m.qualifications ?? []),
    ].join(" "),
    body: (m.bio ?? []).join(" "),
  })),
  ...PAGES,
];

// Lower-case and strip accents so "Dar es Salaam" matches "dar es salaam"
const normalize = (text: string) => text.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

const WEIGHTS = { title: 10, keywords: 4, excerpt: 3, body: 1 } as const;

/**
 * Ranks entries by where the words appear (title highest). Every word must appear somewhere,
 * so adding words narrows the results; matching the whole phrase in the title scores extra.
 */
export function search(query: string, limit = 20): SearchResult[] {
  const q = normalize(query.trim());
  const words = q.split(/\s+/).filter((w) => w.length > 1 || /\d/.test(w));
  if (!words.length) return [];

  const scored = INDEX.map((entry) => {
    const fields = {
      title: normalize(entry.title),
      keywords: normalize(entry.keywords),
      excerpt: normalize(entry.excerpt),
      body: normalize(entry.body),
    };
    let score = 0;
    for (const word of words) {
      // Match at the start of a word: "land" finds "landlord" but not "island"
      const pattern = new RegExp(`(^|[^a-z0-9])${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
      let wordScore = 0;
      for (const [field, text] of Object.entries(fields) as [keyof typeof WEIGHTS, string][]) {
        if (pattern.test(text)) wordScore += WEIGHTS[field];
      }
      if (!wordScore) return null; // every word must match
      score += wordScore;
    }
    if (fields.title.includes(q)) score += 20;
    if (fields.title.startsWith(q)) score += 10;
    return { entry, score };
  }).filter((r) => r !== null);

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry: { keywords: _k, body: _b, ...result } }) => result);
}
