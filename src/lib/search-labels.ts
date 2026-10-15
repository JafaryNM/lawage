import type { SearchType } from "@/lib/search";

/** Group headings for search results, in display order (shared by the search page and pop-up) */
export const SEARCH_GROUPS: { type: SearchType; label: string }[] = [
  { type: "article", label: "Articles & Updates" },
  { type: "service", label: "Practice Areas" },
  { type: "person", label: "Team" },
  { type: "page", label: "Pages" },
];
