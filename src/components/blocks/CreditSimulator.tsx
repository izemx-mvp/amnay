import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Ticker } from "@/components/fx/Ticker";
import { AppLink } from "@/components/shared/AppLink";
import { SectionHeader, type SectionHeading } from "@/components/shared/SectionHeader";
import { simulator, type Plan } from "@/config/site";
import { simulatorCopy as copy } from "@/content/blocks";
import { fill, frAuto } from "@/lib/format";

type Key = (typeof simulator.items)[number]["key"];
type Usage = Record<Key, number>;

const initialUsage = Object.fromEntries(simulator.items.map((i) => [i.key, i.default])) as Usage;
const stepFor = (weight: number) => (weight < 1 ? 10 : 1);

type CreditSimulatorProps = {
  heading: SectionHeading;
  /** Called with the recommended plan whenever it changes. */
  onRecommend?: (plan: Plan) => void;
  /** Anchor of the plans table, linked from the recommendation. */
  plansHref?: string;
};

/** Monthly usage → credits → recommended plan (defaults land on Pro). */
export function CreditSimulator({ heading, onRecommend, plansHref }: CreditSimulatorProps) {
  const [usage, setUsage] = useState<Usage>(initialUsage);
  const reduce = useReducedMotion();

  const credits = simulator.items.reduce((sum, i) => sum + usage[i.key] * i.weight, 0);
  const plan = simulator.recommend(credits);
  const ratio = Math.min(1, credits / plan.credits);

  useEffect(() => onRecommend?.(plan), [plan, onRecommend]);

  const bump = (key: Key, delta: number) =>
    setUsage((u) => ({ ...u, [key]: Math.max(0, u[key] + delta) }));

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader {...heading} />

        <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-[oklch(0.13_0.024_259)] font-mono shadow-elevated">
          <div className="flex items-center gap-2 border-b border-border bg-navy/70 px-4 py-2.5 text-[11px] text-muted-foreground">
            <span className="text-success">●</span>
            {copy.title}
          </div>
          <div className="grid md:grid-cols-[1.3fr_1fr]">
            <div className="divide-y divide-border/60 p-2 sm:p-4">
              <p className="px-2 pt-2 pb-4 text-xs text-muted-foreground">$ {copy.intro}</p>
              {simulator.items.map((item) => {
                const step = stepFor(item.weight);
                const label = copy.items[item.key];
                return (
                  <div key={item.key} className="flex items-center gap-4 px-2 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-sans text-sm font-medium text-foreground">{label.label}</p>
                      <p className="mt-0.5 font-sans text-xs text-muted-foreground">{label.hint}</p>
                      <p className="mt-1 text-[10px] text-primary/80">
                        {fill(copy.perUnit, { n: frAuto(item.weight) })}
                      </p>
                    </div>
                    <div className="flex items-center rounded-full border border-border">
                      <button
                        type="button"
                        aria-label={`${copy.minus} ${label.label}`}
                        onClick={() => bump(item.key, -step)}
                        className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span
                        className="w-10 text-center text-sm text-foreground tabular-nums"
                        aria-live="polite"
                      >
                        {usage[item.key]}
                      </span>
                      <button
                        type="button"
                        aria-label={`${copy.plus} ${label.label}`}
                        onClick={() => bump(item.key, step)}
                        className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative flex flex-col items-center justify-center gap-4 border-t border-border bg-[radial-gradient(circle_at_50%_40%,oklch(0.681_0.147_238.6/0.15),transparent_70%)] p-8 md:border-t-0 md:border-s">
              <div className="relative w-56">
                <svg viewBox="0 0 200 110" className="w-full" aria-hidden>
                  <path
                    d="M 15 100 A 85 85 0 0 1 185 100"
                    fill="none"
                    stroke="oklch(0.945 0.014 248 / 0.08)"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M 15 100 A 85 85 0 0 1 185 100"
                    fill="none"
                    stroke="url(#gauge)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    initial={false}
                    animate={{ pathLength: Math.max(0.02, ratio) }}
                    transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <defs>
                    <linearGradient id="gauge" x1="0" x2="1">
                      <stop offset="0%" stopColor="oklch(0.681 0.147 238.6)" />
                      <stop offset="100%" stopColor="oklch(0.82 0.12 230)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-x-0 bottom-0 text-center">
                  <p className="font-display text-4xl font-bold text-foreground">
                    <Ticker value={Math.round(credits)} duration={0.5} />
                  </p>
                  <p className="text-[11px] text-muted-foreground">{copy.total}</p>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {Math.round(ratio * 100)} % {copy.usage} {plan.name}
              </p>
              <div className="text-center" aria-live="polite">
                <p className="text-[11px] tracking-wider text-muted-foreground uppercase">
                  {copy.plan}
                </p>
                {plansHref ? (
                  <AppLink
                    href={plansHref}
                    className="mt-1 inline-block font-display text-3xl font-bold text-gradient-blue underline-offset-8 hover:underline"
                  >
                    {plan.name} →
                  </AppLink>
                ) : (
                  <p className="mt-1 font-display text-3xl font-bold text-gradient-blue">
                    {plan.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
