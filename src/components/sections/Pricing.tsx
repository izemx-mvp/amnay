import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import { TrialCta } from "@/components/fx/Cta";
import { Ticker, frNumber } from "@/components/fx/Ticker";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { site, type Plan } from "@/config/site";
import { plans, pricing, pricingCopy as copy, simulator } from "@/content/home";
import { buildTrialUrl, pushDataLayer } from "@/lib/tracking";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";
type Usage = Record<(typeof simulator.items)[number]["key"], number>;

const initialUsage = Object.fromEntries(simulator.items.map((i) => [i.key, i.default])) as Usage;
const stepFor = (weight: number) => (weight < 1 ? 10 : 1);

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("yearly");
  const [usage, setUsage] = useState<Usage>(initialUsage);
  const table = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const credits = simulator.items.reduce((sum, i) => sum + usage[i.key] * i.weight, 0);
  const recommended = simulator.recommend(credits);

  const showPlan = () =>
    table.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });

  return (
    <section id={copy.id} className="relative py-28 lg:py-36">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            index={copy.index}
            label={copy.label}
            title={copy.title}
            highlight={copy.highlight}
          />
          <BillingToggle billing={billing} onChange={setBilling} />
        </div>

        {/* plans: one connected panel */}
        <div
          ref={table}
          className="border-light mt-16 grid scroll-mt-28 rounded-3xl bg-navy/40 md:grid-cols-3"
        >
          {plans.map((plan) => (
            <PlanColumn
              key={plan.id}
              plan={plan}
              billing={billing}
              recommended={recommended.id === plan.id}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-b border-border pb-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-foreground">
            <span className="font-semibold">{pricing.hosted.label}</span>
            <span className="text-muted-foreground"> · {pricing.hosted.detail} · </span>
            <span className="font-mono">
              {frNumber(pricing.hosted.yearly)} {pricing.currencyLabel}
              {copy.perYear}
            </span>
          </p>
          <a
            href={`mailto:${site.contactEmail}`}
            className="text-primary underline-offset-4 hover:underline"
          >
            {copy.hostedCta}
          </a>
        </div>
        <p className="mt-4 font-mono text-xs text-muted-foreground">{pricing.creditLine}</p>

        <Simulator
          usage={usage}
          setUsage={setUsage}
          credits={credits}
          plan={recommended}
          onShowPlan={showPlan}
        />
      </div>
    </section>
  );
}

function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
}) {
  const options: { id: Billing; label: string }[] = [
    { id: "monthly", label: copy.monthly },
    { id: "yearly", label: copy.yearly },
  ];
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative flex rounded-full border border-border bg-background/60 p-1"
        role="group"
        aria-label="Facturation"
      >
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={billing === o.id}
            onClick={() => onChange(o.id)}
            className={cn(
              "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
              billing === o.id
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {billing === o.id && (
              <motion.span
                layoutId="billing-pill"
                className="absolute inset-0 rounded-full bg-primary shadow-glow"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        ))}
      </div>
      <span className="rounded-full bg-success/12 px-2.5 py-1 font-mono text-[11px] text-success">
        {pricing.yearlyNote}
      </span>
    </div>
  );
}

function PlanColumn({
  plan,
  billing,
  recommended,
}: {
  plan: Plan;
  billing: Billing;
  recommended: boolean;
}) {
  const pro = plan.highlighted;
  const price = billing === "monthly" ? plan.monthly : plan.yearly;

  return (
    <div
      className={cn(
        "relative flex flex-col p-8 [&:not(:first-child)]:border-t md:[&:not(:first-child)]:border-t-0 md:[&:not(:first-child)]:border-s",
        pro &&
          "border-light z-10 rounded-3xl bg-[oklch(0.2_0.045_256)] shadow-[0_30px_80px_-30px_oklch(0.681_0.147_238.6/0.7)] md:-my-5 md:border-s-0! md:py-12",
      )}
      data-active={pro ? "true" : undefined}
    >
      {recommended && (
        <motion.div
          layoutId="plan-recommended"
          aria-hidden
          className="pointer-events-none absolute inset-1.5 rounded-[20px] bg-primary/[0.05] ring-1 ring-primary-glow/70"
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        />
      )}
      <div className="relative flex min-h-6 flex-wrap items-center gap-2">
        <h3 className="font-display text-xl font-semibold text-foreground">{plan.name}</h3>
        {pro && (
          <span className="rounded-full bg-gradient-to-r from-primary to-primary-glow px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground">
            {copy.popular}
          </span>
        )}
        {recommended && (
          <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-[11px] font-medium text-success">
            {copy.recommended}
          </span>
        )}
      </div>
      <p className="relative mt-1 text-sm text-muted-foreground">{plan.tagline}</p>

      <p className="relative mt-8 flex items-baseline gap-1.5">
        <span className="font-display text-5xl font-bold tracking-tight text-foreground">
          <Ticker value={price} duration={0.5} />
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {pricing.currencyLabel}
          {billing === "monthly" ? copy.perMonth : copy.perYear}
        </span>
      </p>
      <p className="relative mt-1 h-5 font-mono text-xs text-primary">
        {billing === "yearly" &&
          copy.yearlyEquivalent.replace("{n}", frNumber(Math.round(plan.yearly / 12)))}
      </p>

      <p className="relative mt-6 font-mono text-xs text-muted-foreground">
        {frNumber(plan.creditsPerMonth)} crédits · {plan.approxAnalyses}
      </p>
      <ul className="relative mt-5 flex-1 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            {f}
          </li>
        ))}
      </ul>

      <div className="relative mt-8">
        {pro ? (
          <TrialCta size="md" surface={`pricing_${plan.id}`} block>
            {copy.cta}
          </TrialCta>
        ) : (
          <a
            href={buildTrialUrl()}
            target="_blank"
            rel="noreferrer"
            data-cta="trial"
            onClick={() =>
              pushDataLayer("cta_click", { cta: "trial", surface: `pricing_${plan.id}` })
            }
            className="flex h-11 w-full items-center justify-center rounded-full border border-border text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
          >
            {copy.cta}
          </a>
        )}
      </div>
    </div>
  );
}

function Simulator({
  usage,
  setUsage,
  credits,
  plan,
  onShowPlan,
}: {
  usage: Usage;
  setUsage: (fn: (u: Usage) => Usage) => void;
  credits: number;
  plan: Plan;
  onShowPlan: () => void;
}) {
  const reduce = useReducedMotion();
  const ratio = Math.min(1, credits / plan.creditsPerMonth);
  const bump = (key: keyof Usage, delta: number) =>
    setUsage((u) => ({ ...u, [key]: Math.max(0, u[key] + delta) }));

  return (
    <div className="mt-20 overflow-hidden rounded-2xl border border-border bg-[oklch(0.13_0.024_259)] font-mono shadow-elevated">
      <div className="flex items-center gap-2 border-b border-border bg-navy/70 px-4 py-2.5 text-[11px] text-muted-foreground">
        <span className="text-success">●</span>
        {copy.simulator.title}
      </div>
      <div className="grid md:grid-cols-[1.3fr_1fr]">
        <div className="divide-y divide-border/60 p-2 sm:p-4">
          <p className="px-2 pt-2 pb-4 text-xs text-muted-foreground">$ {copy.simulator.intro}</p>
          {simulator.items.map((item) => {
            const step = stepFor(item.weight);
            return (
              <div key={item.key} className="flex items-center gap-4 px-2 py-4">
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-sm font-medium text-foreground">{item.label}</p>
                  <p className="mt-0.5 truncate font-sans text-xs text-muted-foreground">
                    {item.hint}
                  </p>
                  <p className="mt-1 text-[10px] text-primary/80">
                    {copy.simulator.perUnit.replace(
                      "{n}",
                      frNumber(item.weight, item.weight < 1 ? 1 : 0),
                    )}
                  </p>
                </div>
                <div className="flex items-center rounded-full border border-border">
                  <button
                    type="button"
                    aria-label={`Moins de ${item.label}`}
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
                    aria-label={`Plus de ${item.label}`}
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
              <p className="text-[11px] text-muted-foreground">{copy.simulator.total}</p>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground">
            {Math.round(ratio * 100)} % {copy.simulator.usage} {plan.name}
          </p>
          <div className="text-center">
            <p className="text-[11px] tracking-wider text-muted-foreground uppercase">
              {copy.simulator.plan}
            </p>
            <button
              type="button"
              onClick={onShowPlan}
              className="mt-1 font-display text-3xl font-bold text-gradient-blue underline-offset-8 hover:underline"
            >
              {plan.name} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
