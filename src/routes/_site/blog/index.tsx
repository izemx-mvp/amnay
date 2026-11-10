import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/blocks/CtaBand";
import { PageHero } from "@/components/blocks/PageHero";
import { AppLink } from "@/components/shared/AppLink";
import { EmptyState } from "@/components/shared/Mascot";
import { botImages } from "@/config/images";
import { articleCopy, blogPage, posts, type Post } from "@/content/blog";
import { routes } from "@/content/navigation";
import { fill, frDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/blog/")({
  head: () => ({ meta: [{ title: `${blogPage.label} — Amnay` }] }),
  component: BlogIndex,
});

const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

function BlogIndex() {
  const featured = sorted.find((p) => p.featured) ?? sorted[0];
  const rest = sorted.filter((p) => p !== featured);
  return (
    <>
      <PageHero {...blogPage} className="pb-12 lg:pb-16" />
      <section className="relative pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          {featured ? (
            <Featured post={featured} />
          ) : (
            <EmptyState image={botImages.dort} text={blogPage.empty} />
          )}
          {rest.length > 0 && (
            <>
              <h2 className="section-label mt-20">{blogPage.allLabel}</h2>
              <ul className="mt-4 border-t border-border">
                {rest.map((p) => (
                  <li key={p.slug}>
                    <AppLink
                      href={`${routes.blog}/${p.slug}`}
                      className="group grid gap-2 border-b border-border py-6 md:grid-cols-[160px_1fr_auto] md:items-baseline md:gap-8"
                    >
                      <span className="font-mono text-xs text-muted-foreground">
                        {frDate(p.date)}
                      </span>
                      <span>
                        <span className="block font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary-glow">
                          {p.title}
                        </span>
                        <span className="mt-1 block text-sm text-muted-foreground">
                          {p.excerpt}
                        </span>
                      </span>
                      <span className="font-mono text-xs text-primary">{p.sector}</span>
                    </AppLink>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
      <CtaBand title={articleCopy.ctaTitle} note={articleCopy.ctaBody} surface="blog_final" />
    </>
  );
}

/** Featured post: big split with a miniature of its tender sheet. */
function Featured({ post }: { post: Post }) {
  const b = post.brief;
  return (
    <AppLink
      href={`${routes.blog}/${post.slug}`}
      className="group border-light relative grid overflow-hidden rounded-[28px] bg-navy/40 lg:grid-cols-12"
    >
      <div className="relative p-7 sm:p-10 lg:col-span-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-primary px-2.5 py-1 font-mono text-[10px] text-primary-foreground uppercase">
            {blogPage.featuredLabel}
          </span>
          {post.sample && (
            <span className="rounded-full border border-warning/50 px-2.5 py-1 font-mono text-[10px] text-warning">
              {articleCopy.sampleBanner}
            </span>
          )}
        </div>
        <h2 className="mt-6 font-display text-[clamp(28px,3.6vw,48px)] leading-[1.05] font-bold tracking-[-0.03em] text-foreground transition-colors group-hover:text-primary-glow">
          {post.title}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">{post.excerpt}</p>
        <p className="mt-8 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
          <span>{frDate(post.date)}</span>
          <span>{fill(blogPage.minutes, { n: post.readingMinutes })}</span>
          <span className="text-primary">{post.sector}</span>
        </p>
        <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-primary uppercase">
          {blogPage.readLabel}
          <ArrowUpRight
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      </div>
      <div className="relative border-t border-border bg-[radial-gradient(ellipse_at_100%_0%,oklch(0.681_0.147_238.6/0.2),transparent_65%)] p-7 sm:p-10 lg:col-span-5 lg:border-t-0 lg:border-s">
        <div aria-hidden className="blueprint-grid absolute inset-0" />
        <div className="relative rotate-1 rounded-xl border border-border bg-[oklch(0.18_0.034_257)] p-5 shadow-elevated transition-transform duration-500 group-hover:rotate-0">
          <p className="font-mono text-[10px] text-muted-foreground uppercase">
            {articleCopy.briefTitle}
          </p>
          <p className="mt-2 text-sm font-medium text-foreground">{b.object}</p>
          <ul className="mt-4 space-y-2">
            {b.criteria.map((c) => (
              <li key={c.label} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{c.label}</span>
                <span className="font-mono text-foreground">{c.weight}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="font-mono text-[10px] text-muted-foreground uppercase">
              {articleCopy.verdictTitle}
            </span>
            <span
              className={cn(
                "rounded-md px-2 py-0.5 font-display text-sm font-bold",
                b.verdict === "go"
                  ? "bg-success/15 text-success"
                  : "bg-destructive/15 text-destructive",
              )}
            >
              {articleCopy.verdicts[b.verdict]}
            </span>
          </div>
        </div>
      </div>
    </AppLink>
  );
}
