import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp } from "lucide-react";
import { CtaBand } from "@/components/blocks/CtaBand";
import { FaqAccordion } from "@/components/blocks/FaqAccordion";
import { FoundersPass } from "@/components/blocks/FoundersPass";
import { PageHero } from "@/components/blocks/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SceneImage } from "@/components/shared/Mascot";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { sceneImages } from "@/config/images";
import { billing, founderPrice, founders, plans } from "@/config/site";
import { foundersPassCopy } from "@/content/blocks";
import {
  foundersConditions as cond,
  foundersCta,
  foundersFaq,
  foundersHero,
  foundersMeta,
  foundersPrices as prices,
  foundersSteps,
} from "@/content/fondateurs";
import { fill, frNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/offre-fondateurs")({
  head: () => ({ meta: [{ title: foundersMeta.title }] }),
  component: FoundersRoute,
});

function FoundersRoute() {
  return (
    <>
      <PageHero
        {...foundersHero}
        className="pb-12 lg:pb-16"
        aside={
          <SceneImage
            image={sceneImages.fondateurs}
            fade
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="mx-auto w-full max-w-xl lg:max-w-none"
          />
        }
      />
      <FoundersPass flush cta={{ label: foundersPassCopy.cta, href: foundersCta.href }} />
      <Conditions />
      <Prices />
      <Steps />
      <FaqAccordion heading={foundersFaq} items={foundersFaq.items} demo={false} />
      <CtaBand
        title={foundersCta.title}
        highlight={foundersCta.highlight}
        trial={false}
        secondary={{ label: foundersCta.cta, href: foundersCta.href }}
        note={`${cond.deadlineLabel} ${cond.deadline} · ${cond.placesNote}`}
        surface="founders_final"
      />
    </>
  );
}

/** Two-way exchange: what you get (up) vs what you give (down), split by a hairline. */
function Conditions() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader {...cond} />
        <div className="mt-14 grid gap-0 border-t border-border lg:grid-cols-[1.4fr_1fr]">
          <ul className="divide-y divide-border lg:border-e lg:pe-10">
            {cond.get.map((g) => (
              <li key={g.title} className="flex gap-5 py-7">
                <ArrowUp className="mt-1 size-5 shrink-0 text-success" aria-hidden />
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                    {g.title}
                  </h3>
                  <p className="mt-1 text-muted-foreground">{g.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="lg:ps-10">
            <p className="section-label pt-7 text-muted-foreground">{cond.giveLabel}</p>
            <ul className="divide-y divide-border">
              {cond.give.map((g) => (
                <li key={g.title} className="flex gap-5 py-7">
                  <ArrowDown className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {g.title}
                    </h3>
                    <p className="mt-1 text-muted-foreground">{g.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-2xl bg-primary/[0.08] p-5 font-mono text-sm text-foreground ring-1 ring-primary/25">
              {cond.deadlineLabel} <span className="text-primary-glow">{cond.deadline}</span>
              <br />
              <span className="text-xs text-muted-foreground">{cond.placesNote}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Public annual price struck through, founder price computed from config. */
function Prices() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-navy/70 to-transparent"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader {...prices} />
        <ol className="mt-14 divide-y divide-border border-y border-border">
          {plans.map((plan, i) => {
            const fp = founderPrice(plan);
            return (
              <li key={plan.id}>
                <Reveal
                  delay={i * 0.08}
                  className="grid items-baseline gap-4 py-8 md:grid-cols-[1fr_1.2fr_1.6fr_auto]"
                >
                  <div>
                    <p className="font-display text-3xl font-bold tracking-tight text-foreground">
                      {plan.name}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.target}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                      {prices.publicLabel}
                    </p>
                    <p className="mt-1 font-mono text-lg text-muted-foreground line-through decoration-destructive/70">
                      {frNumber(plan.yearly)} {billing.currencyLabel}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.14em] text-primary uppercase">
                      {prices.founderLabel}
                    </p>
                    <p
                      className={cn(
                        "mt-1 font-display text-4xl font-bold tracking-tight",
                        plan.highlighted ? "text-gradient-blue" : "text-foreground",
                      )}
                    >
                      {frNumber(fp)}{" "}
                      <span className="font-mono text-sm font-normal text-muted-foreground">
                        {billing.currencyLabel}
                      </span>
                    </p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {fill(prices.perMonthLabel, { n: frNumber(Math.round(fp / 12)) })}
                    </p>
                  </div>
                  <div className="md:text-end">
                    <span className="inline-flex rounded-full bg-success/12 px-3 py-1 font-mono text-xs text-success">
                      {fill(prices.savingLabel, { n: frNumber(plan.yearly - fp) })}
                    </span>
                    <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                      {fill(prices.lockedLabel, { n: founders.priceLockYears })}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** Démo → virement → activation, on one connected rail. */
function Steps() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader {...foundersSteps} />
        <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          <span
            aria-hidden
            className="absolute top-7 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-primary via-primary-glow to-success md:block"
          />
          {foundersSteps.steps.map((s, i) => (
            <li key={s.title} className="relative md:text-center">
              <span className="relative z-10 flex size-14 items-center justify-center rounded-full bg-background font-display text-xl font-bold text-foreground ring-1 ring-primary/50 shadow-glow md:mx-auto">
                {i + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
