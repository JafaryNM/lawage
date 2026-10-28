import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageBanner } from "@/components/site/PageBanner";
import { search } from "@/lib/search";
import { SEARCH_GROUPS } from "@/lib/search-labels";
import { pageMetadata } from "@/lib/seo";

import banner from "@/assets/law-library-justice.jpg";

export const metadata = {
  ...pageMetadata({
    title: "Search | LawAge Advocates",
    description: "Search articles, practice areas and team members of LawAge Advocates.",
  }),
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ q?: string | string[] }> };

export default async function SearchPage({ searchParams }: Props) {
  const raw = (await searchParams).q;
  const query = (typeof raw === "string" ? raw : "").slice(0, 100).trim();
  const results = query ? search(query, 50) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageBanner title="Search" crumbs={[{ label: "Search" }]} image={banner.src} />

      <section className="section-pad">
        <div className="mx-auto max-w-[900px] px-6">
          {/* Plain GET form: works without JavaScript and keeps results shareable */}
          <form
            action="/search"
            role="search"
            className="flex border border-border bg-white focus-within:border-brand"
          >
            <Search className="ml-5 size-5 shrink-0 self-center text-brand/60" />
            <input
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Search articles, practice areas, team…"
              aria-label="Search the website"
              className="min-w-0 flex-1 bg-transparent px-4 py-4 text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="cursor-pointer bg-brand px-6 text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-brand-deep"
            >
              Search
            </button>
          </form>

          {query && (
            <p className="mt-8 text-sm text-muted-foreground">
              {results.length
                ? `${results.length} result${results.length === 1 ? "" : "s"} for “${query}”`
                : `No results for “${query}”. Try fewer or different words.`}
            </p>
          )}

          {SEARCH_GROUPS.map(({ type, label }) => {
            const group = results.filter((r) => r.type === type);
            if (!group.length) return null;
            return (
              <div key={type} className="mt-12">
                <h2 className="flex items-center gap-4 text-2xl text-foreground">
                  <span className="h-0.5 w-10 shrink-0 bg-gold" />
                  {label}
                </h2>
                <ul className="mt-6 grid gap-4">
                  {group.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="group flex gap-5 bg-[#f4f3f8] p-4 transition-colors hover:bg-[#e4e6ee] sm:p-5"
                      >
                        {r.image && (
                          <img
                            src={r.image}
                            alt=""
                            loading="lazy"
                            className={`size-20 shrink-0 object-cover sm:h-20 sm:w-28 ${r.type === "person" ? "object-top" : ""}`}
                          />
                        )}
                        <span className="min-w-0">
                          {r.meta && (
                            <span className="block text-xs text-muted-foreground">{r.meta}</span>
                          )}
                          <span className="block text-lg leading-snug text-foreground transition-colors group-hover:text-brand">
                            {r.title}
                          </span>
                          <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">
                            {r.excerpt}
                          </span>
                        </span>
                        <ArrowRight className="ml-auto size-5 shrink-0 self-center text-brand/40 transition-all group-hover:translate-x-1 group-hover:text-gold" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
