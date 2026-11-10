import { ArrowUpRight } from "lucide-react";
import { AppLink } from "@/components/shared/AppLink";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { SectionHeader, type SectionHeading } from "@/components/shared/SectionHeader";
import { Spotlight } from "@/components/fx/Spotlight";
import type { Segment } from "@/content/segments";
import { cn } from "@/lib/utils";

/** Home: one split panel, a half per segment, each with its own live tender list. */
export function SegmentTiles({
  heading,
  segments,
  linkLabel,
}: {
  heading: SectionHeading;
  segments: Segment[];
  linkLabel: string;
}) {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader {...heading} />
        <div className="border-light mt-14 grid overflow-hidden rounded-[28px] bg-navy/40 md:grid-cols-2">
          {segments.map((seg, i) => (
            <Spotlight
              key={seg.slug}
              className={cn(i > 0 && "border-t border-border md:border-t-0 md:border-s")}
            >
              <AppLink
                href={`/${seg.slug}`}
                className="group relative z-10 flex h-full flex-col p-7 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-10"
              >
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 opacity-60",
                    i === 0
                      ? "blueprint-grid"
                      : "bg-[radial-gradient(ellipse_at_100%_0%,oklch(0.681_0.147_238.6/0.18),transparent_60%)]",
                  )}
                />
                <div className="relative flex items-start justify-between gap-4">
                  <h3 className="font-display text-[clamp(28px,3.4vw,44px)] leading-[1.05] font-bold tracking-tight text-foreground">
                    {seg.name}
                  </h3>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="size-5" aria-hidden />
                  </span>
                </div>
                <p className="relative mt-3 max-w-md text-muted-foreground">{seg.tagline}</p>

                <ul className="relative mt-8 flex-1 space-y-2">
                  {seg.hero.rows.slice(0, 3).map((row, r) => (
                    <li
                      key={row.ref}
                      className="flex items-center gap-3 rounded-xl border border-border/70 bg-[oklch(0.18_0.034_257/0.8)] px-3 py-2.5 transition-transform duration-300 group-hover:translate-x-1"
                      style={{ transitionDelay: `${r * 40}ms` }}
                    >
                      <ScoreBadge score={row.score} />
                      <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                        {row.title}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        J-{row.deadlineDays}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="relative mt-8 font-mono text-[11px] leading-relaxed tracking-[0.12em] text-muted-foreground uppercase">
                  {seg.trades.slice(0, 6).join(" · ")}
                </p>
                <span className="relative mt-6 font-mono text-xs tracking-[0.12em] text-primary uppercase">
                  {linkLabel} →
                </span>
              </AppLink>
            </Spotlight>
          ))}
        </div>
      </div>
    </section>
  );
}
