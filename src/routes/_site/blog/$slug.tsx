import { createFileRoute, notFound } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, Check } from "lucide-react";
import { DemoCta, TrialCta } from "@/components/fx/Cta";
import { AppLink } from "@/components/shared/AppLink";
import { articleCopy as copy, blogPage, getPost, type Post } from "@/content/blog";
import { cta } from "@/content/common";
import { routes } from "@/content/navigation";
import { fill, frDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound({ routeId: "__root__" });
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `${loaderData.post.title} — Amnay` }] : [],
  }),
  component: ArticleRoute,
});

function ArticleRoute() {
  const { post } = Route.useLoaderData();
  return (
    <article className="relative pt-28 pb-24 lg:pt-36">
      <div
        aria-hidden
        className="grid-fade pointer-events-none absolute inset-x-0 top-0 h-[600px]"
      />
      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6">
        <AppLink
          href={routes.blog}
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          {copy.back}
        </AppLink>

        {post.sample && (
          <div role="note" className="mt-8 rounded-2xl border border-warning/40 bg-warning/10 p-4">
            <p className="font-mono text-xs font-semibold tracking-wider text-warning">
              {copy.sampleBanner}
            </p>
            <p className="mt-1 text-sm text-foreground/90">{copy.sampleNote}</p>
          </div>
        )}

        <p className="section-label mt-10">{post.sector}</p>
        <h1 className="mt-4 font-display text-[clamp(32px,5vw,56px)] leading-[1.05] font-bold tracking-[-0.03em] text-foreground">
          {post.title}
        </h1>
        <p className="mt-5 flex flex-wrap gap-x-4 font-mono text-xs text-muted-foreground">
          <time dateTime={post.date}>{frDate(post.date)}</time>
          <span>{fill(blogPage.minutes, { n: post.readingMinutes })}</span>
        </p>

        <div className="mt-10 space-y-5 text-lg leading-relaxed text-foreground/90">
          {post.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-14 w-full max-w-5xl px-4 sm:px-6">
        <TenderSheet post={post} />
      </div>

      <div className="relative mx-auto mt-14 w-full max-w-3xl px-4 sm:px-6">
        <div className="space-y-5 text-lg leading-relaxed text-foreground/90">
          {post.conclusion.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <aside className="border-light relative mt-16 overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_0%_0%,oklch(0.681_0.147_238.6/0.22),transparent_70%),oklch(0.17_0.032_258)] p-7 sm:p-10">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
            {copy.ctaTitle}
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">{copy.ctaBody}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrialCta surface="article">{cta.trialLong}</TrialCta>
            <DemoCta surface="article" href={copy.ctaDemoHref}>
              {copy.ctaDemo}
            </DemoCta>
          </div>
        </aside>
      </div>
    </article>
  );
}

/** "Fiche AO" block of the weekly-decryption template. */
function TenderSheet({ post }: { post: Post }) {
  const b = post.brief;
  const rows = [
    { k: copy.rows.buyer, v: b.buyer },
    { k: copy.rows.object, v: b.object },
    { k: copy.rows.estimate, v: b.estimate },
    { k: copy.rows.deadline, v: b.deadline },
  ];
  const go = b.verdict === "go";
  return (
    <section
      aria-label={copy.briefTitle}
      className="border-light overflow-hidden rounded-3xl bg-[oklch(0.18_0.034_257)] shadow-elevated"
    >
      <div className="flex items-center justify-between gap-4 border-b border-border bg-navy/70 px-5 py-3">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          {copy.briefTitle}
        </p>
        <span
          className={cn(
            "rounded-md px-2.5 py-1 font-display text-sm font-bold",
            go ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
          )}
        >
          {copy.verdicts[b.verdict]}
        </span>
      </div>
      <dl className="grid border-b border-border sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((r, i) => (
          <div
            key={r.k}
            className={cn(
              "border-border p-5",
              i < rows.length - 1 && "border-b sm:border-b-0",
              i % 2 === 1 && "sm:border-s",
              i < 2 && "sm:border-b lg:border-b-0",
              i > 0 && "lg:border-s",
            )}
          >
            <dt className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              {r.k}
            </dt>
            <dd className="mt-1.5 text-foreground">{r.v}</dd>
          </div>
        ))}
      </dl>
      <div className="grid md:grid-cols-3">
        <div className="border-b border-border p-6 md:border-e md:border-b-0">
          <h3 className="section-label">{copy.criteriaTitle}</h3>
          <ul className="mt-4 space-y-3">
            {b.criteria.map((c) => (
              <li key={c.label}>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{c.label}</span>
                  <span className="font-mono text-muted-foreground">{c.weight}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow"
                    style={{ width: c.weight.replace(/\s/g, "") }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-b border-border p-6 md:border-e md:border-b-0">
          <h3 className="section-label">{copy.piecesTitle}</h3>
          <ul className="mt-4 space-y-2">
            {b.pieces.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6">
          <h3 className="section-label text-warning">{copy.watchoutsTitle}</h3>
          <ul className="mt-4 space-y-3">
            {b.watchouts.map((w) => (
              <li key={w} className="flex items-start gap-2 text-sm text-foreground">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={cn(
          "border-t p-6",
          go
            ? "border-success/30 bg-success/[0.06]"
            : "border-destructive/30 bg-destructive/[0.06]",
        )}
      >
        <h3 className="section-label text-muted-foreground">{copy.verdictTitle}</h3>
        <p className="mt-2 font-display text-xl leading-snug text-foreground">{b.verdictReason}</p>
      </div>
    </section>
  );
}
