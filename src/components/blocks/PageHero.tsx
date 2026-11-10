import type { ReactNode } from "react";
import { RevealWords } from "@/components/fx/RevealWords";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  label: string;
  title: string;
  highlight?: readonly string[];
  lead?: string;
  /** Buttons, chips… under the lead. */
  children?: ReactNode;
  /** Right-hand visual; without it the hero is a single wide column. */
  aside?: ReactNode;
  className?: string;
};

/** Inner-page hero: mono label, word-reveal H1, lead, optional visual. */
export function PageHero({
  label,
  title,
  highlight,
  lead,
  children,
  aside,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28", className)}>
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 right-[-15%] size-[820px] rounded-full bg-[radial-gradient(circle,oklch(0.681_0.147_238.6/0.2),transparent_62%)]"
      />
      <div
        className={cn(
          "relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6",
          aside && "lg:grid-cols-12 lg:gap-10",
        )}
      >
        <div className={cn(aside ? "lg:col-span-6" : "max-w-4xl")}>
          <p className="section-label inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3 py-1.5 text-[11px]">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            {label}
          </p>
          <RevealWords
            as="h1"
            immediate
            delay={0.05}
            text={title}
            highlight={highlight ?? []}
            className="mt-7 font-display text-[clamp(38px,6vw,76px)] leading-[1.02] font-bold tracking-[-0.03em] text-foreground"
          />
          {lead && (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">{lead}</p>
          )}
          {children}
        </div>
        {aside && <div className="lg:col-span-6">{aside}</div>}
      </div>
    </section>
  );
}
