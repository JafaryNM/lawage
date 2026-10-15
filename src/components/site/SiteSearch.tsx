"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CornerDownLeft, Loader2, Search } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { SearchResult } from "@/lib/search";
import { SEARCH_GROUPS } from "@/lib/search-labels";

/**
 * Search button for the header. Opens a pop-up with instant results from GET /api/search;
 * Enter on an empty selection goes to the full results page (/search?q=…). Ctrl/Cmd+K opens it too.
 */
export function SiteSearch({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  // Ctrl/Cmd+K anywhere on the site
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Results as you type: wait 200 ms after the last key, cancel stale requests
  useEffect(() => {
    const q = query.trim();
    setActive(-1);
    if (!q) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=8`, {
          signal: controller.signal,
        });
        const body = (await res.json()) as { data?: SearchResult[] };
        setResults(body.data ?? []);
      } catch {
        if (!controller.signal.aborted) setResults([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 200);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  // Results in the same order they are shown (grouped), for arrow-key navigation
  const ordered = SEARCH_GROUPS.flatMap(({ type }) => results.filter((r) => r.type === type));

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };
  const seeAll = () => query.trim() && go(`/search?q=${encodeURIComponent(query.trim())}`);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!ordered.length) return;
      const next =
        e.key === "ArrowDown" ? Math.min(active + 1, ordered.length - 1) : Math.max(active - 1, -1);
      setActive(next);
      listRef.current
        ?.querySelector(`[data-index="${next}"]`)
        ?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = ordered[active];
      if (selected) go(selected.href);
      else seeAll();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the website"
        title="Search (Ctrl+K)"
        className={`flex size-10 cursor-pointer items-center justify-center text-foreground transition-colors hover:text-brand ${className}`}
      >
        <Search className="size-5" strokeWidth={1.75} />
      </button>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setQuery("");
        }}
      >
        <DialogContent className="top-[12vh] w-[calc(100%-1.5rem)] max-w-2xl translate-y-0 gap-0 overflow-hidden rounded-none border-0 p-0 sm:rounded-none [&>button:last-child]:top-5">
          <DialogTitle className="sr-only">Search the website</DialogTitle>
          <DialogDescription className="sr-only">
            Search articles, practice areas, team members and pages.
          </DialogDescription>

          <div className="flex items-center gap-3 border-b border-border px-5 pr-12">
            {loading ? (
              <Loader2 className="size-5 shrink-0 animate-spin text-brand/60" />
            ) : (
              <Search className="size-5 shrink-0 text-brand/60" />
            )}
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search articles, practice areas, team…"
              aria-label="Search"
              aria-controls="site-search-results"
              aria-activedescendant={active >= 0 ? `site-search-${active}` : undefined}
              className="min-w-0 flex-1 bg-transparent py-5 text-base text-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
            />
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {!query.trim() && (
              <p className="px-6 py-8 text-sm text-muted-foreground">
                Try a topic like <em>land</em>, <em>data protection</em> or <em>arbitration</em>, or
                a team member&rsquo;s name.
              </p>
            )}

            {query.trim() && !loading && !results.length && (
              <p className="px-6 py-8 text-sm text-muted-foreground">
                No results for &ldquo;{query.trim()}&rdquo;. Try fewer or different words.
              </p>
            )}

            {results.length > 0 && (
              <ul id="site-search-results" ref={listRef} role="listbox" className="py-2">
                {SEARCH_GROUPS.map(({ type, label }) => {
                  const group = ordered.filter((r) => r.type === type);
                  if (!group.length) return null;
                  return (
                    <li key={type} role="presentation">
                      <p className="px-6 pt-3 pb-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                        {label}
                      </p>
                      <ul role="presentation">
                        {group.map((r) => {
                          const index = ordered.indexOf(r);
                          return (
                            <li
                              key={r.href}
                              id={`site-search-${index}`}
                              data-index={index}
                              role="option"
                              aria-selected={index === active}
                            >
                              <button
                                type="button"
                                onClick={() => go(r.href)}
                                onMouseMove={() => setActive(index)}
                                className={`flex w-full cursor-pointer items-center gap-4 px-6 py-2.5 text-left transition-colors ${
                                  index === active ? "bg-[#f4f3f8]" : ""
                                }`}
                              >
                                {r.image ? (
                                  <img
                                    src={r.image}
                                    alt=""
                                    className={`size-11 shrink-0 object-cover ${r.type === "person" ? "object-top" : ""}`}
                                  />
                                ) : (
                                  <span className="flex size-11 shrink-0 items-center justify-center bg-brand/10 text-brand">
                                    <ArrowRight className="size-4" />
                                  </span>
                                )}
                                <span className="min-w-0">
                                  <span className="block truncate text-sm text-foreground">
                                    {r.title}
                                  </span>
                                  <span className="block truncate text-xs text-muted-foreground">
                                    {r.meta ? `${r.meta} · ${r.excerpt}` : r.excerpt}
                                  </span>
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {query.trim() && (
            <button
              type="button"
              onClick={seeAll}
              className="flex w-full cursor-pointer items-center justify-between border-t border-border bg-[#f4f3f8] px-6 py-3.5 text-sm text-brand transition-colors hover:bg-[#e4e6ee]"
            >
              <span>See all results for &ldquo;{query.trim()}&rdquo;</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <CornerDownLeft className="size-3.5" /> Enter
              </span>
            </button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
