import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, User } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageBanner } from "@/components/site/PageBanner";
import { SERVICES } from "@/lib/services";
import { POSTS, formatPostDate } from "@/lib/posts";

import logo from "@/assets/darton-logo.png";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} | Darton Attorneys` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:image", content: logo },
        ]
      : [],
  }),
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const service = SERVICES.find((s) => s.slug === post.area);
  const related = POSTS.filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.area === post.area) - Number(a.area === post.area))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageBanner title="Legal Insights" crumbs={[{ label: "Blog", to: "/blog" }, { label: post.title }]} image={post.image} />

      <article className="section-pad">
        <div className="mx-auto max-w-[860px] px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-brand transition-colors hover:text-brand-deep"
          >
            <ArrowLeft className="size-4" /> All articles
          </Link>

          {service && (
            <Link
              to="/blog"
              search={{ area: service.slug }}
              className="mt-8 block text-[0.72rem] uppercase tracking-[0.2em] text-brand"
            >
              {service.title}
            </Link>
          )}
          <h1 className="mt-3 text-4xl leading-[1.15] text-foreground md:text-5xl">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <User className="size-4 text-brand" strokeWidth={1.5} /> {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="size-4 text-brand" strokeWidth={1.5} /> {formatPostDate(post.date)}
            </span>
          </div>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[8px]">
            <img src={post.image} alt={post.title} className="absolute inset-0 size-full object-cover" />
          </div>

          <p className="mt-10 font-display text-xl leading-relaxed text-foreground">{post.excerpt}</p>
          {post.body.map((para) => (
            <p key={para} className="mt-6 text-base leading-relaxed text-muted-foreground">
              {para}
            </p>
          ))}

          {service && (
            <div className="mt-12 flex flex-col items-start gap-4 rounded-[8px] border-l-4 border-brand bg-[#f0f0f0] px-8 py-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-base text-foreground">Need advice on {service.title.toLowerCase()}?</p>
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="shrink-0 rounded-[6px] bg-brand px-6 py-3 text-[0.78rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-brand-deep"
              >
                View Practice Area
              </Link>
            </div>
          )}
        </div>
      </article>

      {/* MORE INSIGHTS */}
      <section className="section-pad bg-[#f0f0f0]">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="text-center text-4xl text-foreground">More Insights</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group overflow-hidden rounded-[8px] bg-white"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs text-muted-foreground">{formatPostDate(p.date)}</p>
                  <h3 className="mt-2 text-xl leading-snug text-foreground transition-colors group-hover:text-brand">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
