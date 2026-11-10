import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Clock } from "lucide-react";
import { CostComparator } from "@/components/blocks/CostComparator";
import { CreditSimulator } from "@/components/blocks/CreditSimulator";
import { CtaBand } from "@/components/blocks/CtaBand";
import { FaqAccordion } from "@/components/blocks/FaqAccordion";
import { FoundersPass } from "@/components/blocks/FoundersPass";
import { PageHero } from "@/components/blocks/PageHero";
import { PricingTable } from "@/components/blocks/PricingTable";
import { TrialCta } from "@/components/fx/Cta";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { creditCosts, packs, type Plan, type PlanId } from "@/config/site";
import { foundersPassCopy } from "@/content/blocks";
import { cta } from "@/content/common";
import { pickFaq } from "@/content/faq";
import { foundersHero } from "@/content/fondateurs";
import { routes } from "@/content/navigation";
import {
  comparatorSection,
  creditsSection as credits,
  packsSection,
  paymentSection as pay,
  plansSection,
  pricingCta,
  pricingFaq,
  pricingFounders,
  pricingHero,
  pricingMeta,
  simulatorSection,
  trialSection,
} from "@/content/tarifs";
import { fill, frNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/tarifs")({
  head: () => ({ meta: [{ title: pricingMeta.title }] }),
  component: PricingRoute,
});

const PLANS_ID = "formules";

function PricingRoute() {
  const [recommended, setRecommended] = useState<PlanId>("pro");
  const onRecommend = useCallback((p: Plan) => setRecommended(p.id), []);

  return (
    <>
      <PageHero {...pricingHero} className="pb-0 lg:pb-4" />
      <PricingTable id={PLANS_ID} heading={plansSection} recommendedId={recommended} />
      <Credits />
      <CreditSimulator
        heading={simulatorSection}
        onRecommend={onRecommend}
        plansHref={`${routes.pricing}#${PLANS_ID}`}
      />
      <CostComparator heading={comparatorSection} />
      <Packs />
      <Trial />
      <Payment />
      <FoundersPass
        heading={{
          ...pricingFounders,
          title: foundersHero.title,
          highlight: foundersHero.highlight,
        }}
        cta={{ label: foundersPassCopy.more, href: routes.founders }}
      />
      <FaqAccordion heading={pricingFaq} items={pickFaq(pricingFaq.ids)} />
      <CtaBand title={pricingCta.title} highlight={pricingCta.highlight} surface="pricing_final" />
    </>
  );
}

/* ─────────────────────────── credits: equation + ledger ─────────────────────────── */

function Credits() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader {...credits} />

        {/* the equation */}
        <p className="mt-12 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-display text-[clamp(44px,8vw,112px)] leading-none font-bold tracking-[-0.04em]">
          <span className="text-foreground">{credits.equation.left}</span>
          <span className="text-primary/60">=</span>
          <span className="text-gradient-blue">{credits.equation.right}</span>
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          {/* ledger */}
          <div className="lg:col-span-7">
            <h3 className="section-label text-muted-foreground">{credits.tableTitle}</h3>
            <table className="mt-4 w-full border-collapse text-sm">
              <thead className="sr-only">
                <tr>
                  <th scope="col">{credits.operationLabel}</th>
                  <th scope="col">{credits.costLabel}</th>
                </tr>
              </thead>
              <tbody>
                {credits.operations.map((op) => (
                  <tr key={op.label} className="border-b border-dashed border-border">
                    <th scope="row" className="py-4 pe-4 text-start font-normal">
                      <span className="block text-foreground">{op.label}</span>
                      {op.note && (
                        <span className="mt-0.5 block font-mono text-[11px] text-muted-foreground">
                          {op.note}
                        </span>
                      )}
                    </th>
                    <td className="py-4 text-end align-top font-mono whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex rounded-md px-2 py-0.5",
                          op.cost === credits.included
                            ? "bg-success/12 text-success"
                            : "text-foreground",
                        )}
                      >
                        {op.cost}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* rules + order */}
          <div className="lg:col-span-5">
            <h3 className="section-label text-muted-foreground">{credits.rulesTitle}</h3>
            <ul className="mt-4 space-y-4">
              {credits.rules.map((r) => (
                <li key={r} className="flex gap-3 text-foreground">
                  <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
            <h3 className="section-label mt-12 text-muted-foreground">{credits.orderTitle}</h3>
            <ol className="mt-4 flex flex-wrap items-center gap-2">
              {credits.order.map((o, i) => (
                <li key={o} className="flex items-center gap-2">
                  <span className="flex items-center gap-2 rounded-full border border-border bg-navy/60 px-3 py-1.5 text-sm text-foreground">
                    <span className="font-mono text-[10px] text-primary">{i + 1}</span>
                    {o}
                  </span>
                  {i < credits.order.length - 1 && (
                    <ArrowRight className="size-4 text-muted-foreground" aria-hidden />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── packs: price ladder ─────────────────────────── */

function Packs() {
  const reduce = useReducedMotion();
  const max = Math.max(...packs.map((p) => p.credits));
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader {...packsSection}>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{packsSection.lead}</p>
        </SectionHeader>
        <ol className="mt-14 space-y-3">
          {packs.map((p, i) => {
            const perCredit = p.price / p.credits;
            const bonus = Math.round((creditCosts.madPerCredit / perCredit - 1) * 100);
            return (
              <li
                key={p.id}
                className="grid items-center gap-x-6 gap-y-2 sm:grid-cols-[140px_1fr_auto]"
              >
                <p className="font-display text-xl font-semibold text-foreground">{p.name}</p>
                <div className="relative h-12 overflow-hidden rounded-xl bg-foreground/[0.04]">
                  <motion.div
                    className="absolute inset-y-0 left-0 flex origin-left items-center rounded-xl bg-gradient-to-r from-primary/30 to-primary/60 ps-4"
                    style={{ width: `${Math.max(18, (p.credits / max) * 100)}%` }}
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                  >
                    <span className="font-mono text-sm whitespace-nowrap text-foreground">
                      {frNumber(p.credits)} {packsSection.creditsLabel}
                    </span>
                  </motion.div>
                </div>
                <div className="flex items-baseline gap-3 sm:justify-end">
                  <span className="font-display text-2xl font-bold text-foreground">
                    {frNumber(p.price)}{" "}
                    <span className="font-mono text-xs font-normal text-muted-foreground">MAD</span>
                  </span>
                  <span className="w-28 font-mono text-[11px] text-muted-foreground">
                    {fill(packsSection.perCredit, { p: frNumber(perCredit, 2) })}
                    {bonus > 0 && (
                      <span className="block text-success">
                        {fill(packsSection.bonus, { n: bonus })}
                      </span>
                    )}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-success">
          <Clock className="size-3.5" aria-hidden />
          {packsSection.neverExpire}
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────── trial: four big numbers ─────────────────────────── */

function Trial() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="border-light relative overflow-hidden rounded-[28px] bg-[radial-gradient(ellipse_80%_80%_at_0%_0%,oklch(0.681_0.147_238.6/0.22),transparent_70%),linear-gradient(180deg,oklch(0.19_0.04_257),oklch(0.16_0.03_259))] p-7 sm:p-12">
          <div aria-hidden className="blueprint-grid pointer-events-none absolute inset-0" />
          <div className="relative">
            <SectionHeader {...trialSection} />
            <dl className="mt-12 grid grid-cols-2 gap-y-10 border-t border-border pt-10 md:grid-cols-4">
              {trialSection.terms.map((t) => (
                <div
                  key={t.label}
                  className="border-border md:border-s md:ps-6 md:first:border-s-0 md:first:ps-0"
                >
                  <dt className="sr-only">{t.label}</dt>
                  <dd className="font-display text-6xl font-bold tracking-tight text-foreground">
                    {t.value}
                  </dd>
                  <dd className="mt-1 font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    {t.label}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground">
                {trialSection.notes.map((n) => (
                  <li key={n} className="flex items-center gap-2">
                    <Check className="size-4 text-success" aria-hidden />
                    {n}
                  </li>
                ))}
              </ul>
              <TrialCta surface="pricing_trial">{cta.trialLong}</TrialCta>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── payment ─────────────────────────── */

function Payment() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeader {...pay} />
          <ul className="mt-12 border-t border-border">
            {pay.methods.map((m, i) => (
              <li
                key={m.id}
                className="flex flex-wrap items-start justify-between gap-4 border-b border-border py-6"
              >
                <div className="max-w-md">
                  <h3
                    className={cn(
                      "font-display text-xl font-semibold",
                      m.available ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {m.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.detail}</p>
                </div>
                {i === 0 && (
                  <span className="rounded-full bg-primary/12 px-2.5 py-1 font-mono text-[11px] text-primary">
                    {pay.default}
                  </span>
                )}
                {!m.available && (
                  <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                    {pay.soon}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground">
            <span className="flex items-center gap-2">
              <Check className="size-4 text-primary" aria-hidden />
              {pay.invoices}
            </span>
            <span className="flex items-center gap-2">
              <Check className="size-4 text-primary" aria-hidden />
              {pay.noCut}
            </span>
          </p>
        </div>

        <div className="lg:col-span-5 lg:pt-24">
          <div className="border-light rounded-3xl bg-navy/50 p-7">
            <h3 className="section-label">{pay.changesTitle}</h3>
            <dl className="mt-5 space-y-5">
              {pay.changes.map((c) => (
                <div key={c.label}>
                  <dt className="font-display font-semibold text-foreground">{c.label}</dt>
                  <dd className="mt-0.5 text-sm text-muted-foreground">{c.body}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 border-t border-dashed border-border pt-6">
              <h3 className="section-label">{pay.referralTitle}</h3>
              <p className="mt-3 font-display text-lg leading-snug text-foreground">
                {pay.referral}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
