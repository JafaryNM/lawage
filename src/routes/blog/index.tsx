import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronRight,
  Facebook,
  Linkedin,
  Phone,
  Plus,
  Search,
  Twitter,
  X,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageBanner } from "@/components/site/PageBanner";
import { SERVICES } from "@/lib/services";
import { POSTS, formatPostDate, type Post } from "@/lib/posts";

import logo from "@/assets/darton-logo.png";
import banner from "@/assets/post-companies.jpg";

type BlogSearch = {
  q?: string | undefined;
  area?: string | undefined;
  sort?: "oldest" | undefined;
  page?: number | undefined;
};

const PAGE_SIZE = 4;

export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>): BlogSearch => {
    const { q, area, sort, page } = search;
    const pageNum = Number(page);
    return {
      q: typeof q === "string" && q.trim() ? q : undefined,
      area: typeof area === "string" && SERVICES.some((s) => s.slug === area) ? area : undefined,
      sort: sort === "oldest" ? "oldest" : undefined,
      page: Number.isInteger(pageNum) && pageNum > 1 ? pageNum : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Legal Insights | Darton Attorneys" },
      {
        name: "description",
        content:
          "Commentary from Darton Attorneys on corporate, land, litigation, family, employment and tax law in Tanzania.",
      },
      { property: "og:title", content: "Legal Insights | Darton Attorneys" },
      { property: "og:image", content: logo },
    ],
  }),
  component: Blog,
});

const areaTitle = (slug: string) => SERVICES.find((s) => s.slug === slug)?.title ?? "";

function sharePost(network: "facebook" | "twitter" | "linkedin", post: Post) {
  const url = encodeURIComponent(`${window.location.origin}/blog/${post.slug}`);
  const text = encodeURIComponent(post.title);
  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  };
  window.open(links[network], "_blank", "noopener,noreferrer,width=600,height=520");
}

function Blog() {
  const { q, area, sort, page } = Route.useSearch();
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(q ?? "");
  useEffect(() => setQuery(q ?? ""), [q]);

  // Any filter change returns to page 1
  const setSearch = (next: Partial<BlogSearch>) =>
    navigate({ search: (prev) => ({ ...prev, page: undefined, ...next }), resetScroll: false });

  const goToPage = (n: number) => {
    setSearch({ page: n > 1 ? n : undefined });
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearch({ q: query.trim() || undefined });
  };

  const needle = (q ?? "").toLowerCase();
  const posts = POSTS.filter((p) => !area || p.area === area)
    .filter(
      (p) =>
        !needle || `${p.title} ${p.excerpt} ${areaTitle(p.area)}`.toLowerCase().includes(needle),
    )
    .sort((a, b) =>
      sort === "oldest" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date),
    );

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const currentPage = Math.min(page ?? 1, totalPages);
  const pagePosts = posts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const firstShown = posts.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
  const lastShown = Math.min(currentPage * PAGE_SIZE, posts.length);

  const countFor = (slug: string) => POSTS.filter((p) => p.area === slug).length;
  const hasFilters = Boolean(q || area || sort);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageBanner title="Legal Insights" crumbs={[{ label: "Blog" }]} image={banner} />

      <section className="section-pad">
        <div className="mx-auto max-w-[1200px] px-6">
          {/* SEARCH + FILTERS */}
          <div className="rounded-[8px] bg-[#f0f0f0] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <form
                onSubmit={onSearch}
                className="flex flex-1 overflow-hidden rounded-[6px] bg-white"
              >
                <label className="flex flex-1 items-center gap-3 px-4">
                  <Search className="size-4 shrink-0 text-muted-foreground" />
                  <span className="sr-only">Search articles</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search articles…"
                    className="w-full bg-transparent py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  />
                </label>
                <button
                  type="submit"
                  className="bg-brand px-6 text-[0.78rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-brand-deep md:px-8"
                >
                  Search
                </button>
              </form>

              <label className="flex items-center gap-3 text-sm text-muted-foreground">
                Sort by
                <select
                  value={sort ?? "newest"}
                  onChange={(e) =>
                    setSearch({ sort: e.target.value === "oldest" ? "oldest" : undefined })
                  }
                  className="rounded-[6px] border-0 bg-white px-4 py-3.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-brand/40"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                </select>
              </label>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <FilterChip active={!area} onClick={() => setSearch({ area: undefined })}>
                All
              </FilterChip>
              {SERVICES.map((s) => (
                <FilterChip
                  key={s.slug}
                  active={area === s.slug}
                  onClick={() => setSearch({ area: s.slug })}
                >
                  {s.title}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
            <p>
              Showing{" "}
              <span className="text-foreground">
                {posts.length ? `${firstShown}–${lastShown}` : 0}
              </span>{" "}
              of {posts.length} {posts.length === 1 ? "article" : "articles"}
              {area && (
                <>
                  {" "}
                  in <span className="text-brand">{areaTitle(area)}</span>
                </>
              )}
              {q && (
                <>
                  {" "}
                  matching “<span className="text-foreground">{q}</span>”
                </>
              )}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={() => navigate({ search: {}, resetScroll: false })}
                className="inline-flex items-center gap-1.5 text-brand transition-colors hover:text-brand-deep"
              >
                <X className="size-4" /> Clear filters
              </button>
            )}
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[300px_1fr]">
            {/* SIDEBAR: practice areas */}
            <aside className="order-2 space-y-8 lg:order-1 lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-[8px] bg-[#f0f0f0] p-7">
                <h2 className="flex items-center gap-4 text-2xl text-foreground">
                  Practice Areas
                  <span className="h-px w-10 bg-brand" />
                </h2>
                <ul className="mt-5 divide-y divide-foreground/10">
                  {SERVICES.map((s) => {
                    const active = area === s.slug;
                    return (
                      <li key={s.slug}>
                        <button
                          type="button"
                          onClick={() => setSearch({ area: active ? undefined : s.slug })}
                          aria-pressed={active}
                          className={`group flex w-full items-center justify-between gap-3 py-3.5 text-left text-[0.95rem] transition-colors ${
                            active ? "text-brand" : "text-foreground hover:text-brand"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <ChevronRight
                              className={`size-4 shrink-0 text-brand transition-transform ${active ? "translate-x-1" : "group-hover:translate-x-1"}`}
                            />
                            {s.title}
                          </span>
                          <span
                            className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs ${
                              active ? "bg-brand text-white" : "bg-white text-muted-foreground"
                            }`}
                          >
                            {countFor(s.slug)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-[8px] bg-brand p-7 text-white">
                <h2 className="text-2xl">Need Legal Advice?</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  Speak to one of our advocates about your matter.
                </p>
                <a
                  href="tel:+255222000000"
                  className="mt-5 flex items-center gap-3 text-sm text-white transition-colors hover:text-white/80"
                >
                  <span className="flex size-10 items-center justify-center rounded-[6px] bg-white/15">
                    <Phone className="size-4" strokeWidth={1.6} />
                  </span>
                  +255 22 200 0000
                </a>
                <Link
                  to="/contact"
                  className="mt-6 flex items-center justify-center gap-2 rounded-[6px] bg-white px-6 py-3.5 text-sm uppercase tracking-[0.15em] text-brand transition-colors hover:bg-brand-deep hover:text-white"
                >
                  Contact Us <ArrowRight className="size-4" strokeWidth={1.5} />
                </Link>
              </div>
            </aside>

            {/* POSTS */}
            <div ref={listRef} className="order-1 scroll-mt-32 lg:order-2">
              <div className="grid content-start gap-8 sm:grid-cols-2">
                {posts.length === 0 ? (
                  <div className="rounded-[8px] border border-dashed border-border px-8 py-16 text-center sm:col-span-2">
                    <h3 className="text-2xl text-foreground">No articles found</h3>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Try a different search or practice area.
                    </p>
                  </div>
                ) : (
                  pagePosts.map((post) => <PostCard key={post.slug} post={post} />)
                )}
              </div>

              {totalPages > 1 && (
                <Pagination current={currentPage} total={totalPages} onChange={goToPage} />
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  const base =
    "flex size-11 items-center justify-center rounded-[6px] text-sm transition-colors disabled:pointer-events-none disabled:opacity-40";
  return (
    <nav aria-label="Blog pages" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        aria-label="Previous page"
        className={`${base} bg-[#f0f0f0] text-foreground hover:bg-brand hover:text-white`}
      >
        <ArrowLeft className="size-4" />
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-current={n === current ? "page" : undefined}
          className={`${base} ${
            n === current
              ? "bg-brand text-white"
              : "bg-[#f0f0f0] text-foreground hover:bg-brand hover:text-white"
          }`}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        aria-label="Next page"
        className={`${base} bg-[#f0f0f0] text-foreground hover:bg-brand hover:text-white`}
      >
        <ArrowRight className="size-4" />
      </button>
    </nav>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-sm transition-colors ${
        active ? "bg-brand text-white" : "bg-white text-foreground hover:bg-brand hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[8px] border border-border bg-white shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)]">
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-[6px] border-[3px] border-white bg-brand px-3.5 py-1.5 text-xs text-white">
          <Calendar className="size-3.5" strokeWidth={1.5} /> {formatPostDate(post.date)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-[0.68rem] uppercase tracking-[0.2em] text-brand">
          {areaTitle(post.area)}
        </span>
        <h2 className="mt-2 text-xl leading-snug text-foreground">
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="transition-colors hover:text-brand"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mb-5 mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-brand transition-colors hover:text-brand-deep"
          >
            Read More{" "}
            <Plus className="size-4 transition-transform duration-300 group-hover:rotate-90" />
          </Link>
          <div className="flex items-center gap-0.5">
            {(
              [
                ["facebook", Facebook],
                ["twitter", Twitter],
                ["linkedin", Linkedin],
              ] as const
            ).map(([network, Icon]) => (
              <button
                key={network}
                type="button"
                onClick={() => sharePost(network, post)}
                aria-label={`Share on ${network}`}
                className="flex size-8 items-center justify-center rounded-[4px] text-foreground/60 transition-colors hover:bg-brand hover:text-white"
              >
                <Icon className="size-3.5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
