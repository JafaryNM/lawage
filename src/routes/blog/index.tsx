import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, User } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageBanner } from "@/components/site/PageBanner";
import { SERVICES } from "@/lib/services";
import { POSTS, formatPostDate, type Post } from "@/lib/posts";

import logo from "@/assets/lawage-logo.png";
import banner from "@/assets/law-library-justice.jpg";

type BlogSearch = { area?: string | undefined };

export const Route = createFileRoute("/blog/")({
  // Article pages link here filtered by practice area
  validateSearch: (search: Record<string, unknown>): BlogSearch => {
    const { area } = search;
    return { area: typeof area === "string" && SERVICES.some((s) => s.slug === area) ? area : undefined };
  },
  head: () => ({
    meta: [
      { title: "Legal Updates | LawAge Advocates & Consult" },
      {
        name: "description",
        content:
          "Legal updates, analyses and briefings from LawAge Advocates & Consult on Tanzanian law, regulation and policy.",
      },
      { property: "og:title", content: "Legal Updates | LawAge Advocates & Consult" },
      { property: "og:image", content: logo },
    ],
  }),
  component: Blog,
});

const areaTitle = (slug: string) => SERVICES.find((s) => s.slug === slug)?.title ?? "";

function Blog() {
  const { area } = Route.useSearch();
  const posts = [...POSTS]
    .filter((p) => !area || p.area === area)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageBanner title="Legal Updates" crumbs={[{ label: "Legal Updates" }]} image={banner} />

      {area && (
        <p className="mx-auto max-w-[1200px] px-6 pt-10 text-sm text-muted-foreground">
          Showing updates in <span className="text-brand">{areaTitle(area)}</span> ·{" "}
          <Link to="/blog" className="text-gold underline-offset-4 hover:underline">
            View all
          </Link>
        </p>
      )}

      {/* POSTS */}
      <section className="section-pad">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col bg-brand">
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="relative block aspect-[16/9] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-7 md:p-8">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-white">
          <span className="inline-flex items-center gap-2">
            <User className="size-4 text-white/70" strokeWidth={1.5} /> {post.author}
          </span>
          <span className="inline-flex items-center gap-2">
            <Calendar className="size-4 text-white/70" strokeWidth={1.5} /> {formatPostDate(post.date)}
          </span>
        </div>

        <h2 className="mt-5 text-2xl leading-snug text-white">
          <Link to="/blog/$slug" params={{ slug: post.slug }} className="transition-colors hover:text-gold">
            {post.title}
          </Link>
        </h2>

        <div className="mt-auto pt-7">
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="group/btn inline-flex items-center gap-2 rounded-[4px] bg-gold px-8 py-3.5 text-sm uppercase text-white transition-colors hover:bg-white hover:text-brand"
          >
            Learn More
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:rotate-45" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </article>
  );
}
