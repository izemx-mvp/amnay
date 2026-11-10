import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Server } from "lucide-react";
import { ContactForm } from "@/components/blocks/ContactForm";
import { PageHero } from "@/components/blocks/PageHero";
import { DemoCta } from "@/components/fx/Cta";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  comparison,
  contactSection,
  enterpriseHero,
  enterpriseMeta,
  enterprisePricing as pricing,
  modes,
  whyPrice,
} from "@/content/entreprise";
import { frNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/entreprise")({
  head: () => ({ meta: [{ title: enterpriseMeta.title }] }),
  component: EnterpriseRoute,
});

function EnterpriseRoute() {
  return (
    <>
      <PageHero {...enterpriseHero} aside={<ServerRack />}>
        <div className="mt-9">
          <DemoCta surface="enterprise_hero" href={enterpriseHero.ctaHref}>
            {enterpriseHero.cta}
          </DemoCta>
        </div>
      </PageHero>
      <Comparison />
      <Modes />
      <Pricing />
      <WhyPrice />
      <Contact />
    </>
  );
}

/** Hero visual: a server rack with live status lines. */
function ServerRack() {
  return (
    <div className="relative mx-auto max-w-md">
      <div
        aria-hidden
        className="absolute inset-x-[10%] top-[10%] bottom-[-5%] rounded-[40px] bg-primary/20 blur-[80px]"
      />
      <div
        className="border-light relative rounded-2xl bg-[oklch(0.18_0.034_257)] p-4 shadow-elevated"
        role="img"
        aria-label={enterpriseHero.serverLabel}
      >
        <p className="flex items-center gap-2 px-1 pb-3 font-mono text-[11px] text-muted-foreground">
          <Server className="size-3.5 text-primary" aria-hidden />
          {enterpriseHero.serverLabel}
        </p>
        <ul className="space-y-2">
          {enterpriseHero.serverLines.map((l, i) => (
            <li
              key={l}
              className="flex items-center gap-3 rounded-lg border border-border/70 bg-navy/70 px-3 py-3"
            >
              <span className="relative flex size-2">
                <span
                  className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-50"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              <span className="font-mono text-xs text-foreground">{l}</span>
              <span className="ms-auto flex gap-0.5" aria-hidden>
                {Array.from({ length: 6 }).map((_, j) => (
                  <span
                    key={j}
                    className={cn(
                      "h-3 w-1 rounded-sm",
                      j < 4 - (i % 3) ? "bg-primary/70" : "bg-foreground/10",
                    )}
                  />
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** SaaS vs self-hosted, row by row. */
function Comparison() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader {...comparison} />
        <div className="border-light mt-14 overflow-hidden rounded-3xl bg-navy/40">
          <table className="w-full border-collapse text-sm">
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-border">
                <th scope="col" className="w-1/4 p-5 text-start" />
                <th
                  scope="col"
                  className="p-5 text-start font-mono text-xs font-normal tracking-wider text-muted-foreground uppercase"
                >
                  {comparison.saas}
                </th>
                <th
                  scope="col"
                  className="bg-primary/[0.07] p-5 text-start font-mono text-xs font-normal tracking-wider text-primary uppercase"
                >
                  {comparison.self}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((r) => (
                <tr
                  key={r.label}
                  className="grid border-b border-border/70 last:border-b-0 md:table-row"
                >
                  <th
                    scope="row"
                    className="px-5 pt-5 text-start font-display font-semibold text-foreground md:py-4 md:font-sans md:font-normal md:text-muted-foreground"
                  >
                    {r.label}
                  </th>
                  <td className="px-5 pt-2 text-muted-foreground md:py-4 md:text-foreground">
                    <span className="me-2 font-mono text-[10px] text-muted-foreground uppercase md:hidden">
                      {comparison.saasShort} ·
                    </span>
                    {r.saas}
                  </td>
                  <td className="px-5 pt-1 pb-5 text-foreground md:bg-primary/[0.07] md:py-4">
                    <span className="me-2 font-mono text-[10px] text-primary uppercase md:hidden">
                      {comparison.selfShort} ·
                    </span>
                    {r.self}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/** Three modes on an isolation scale: more bars = more isolated. */
function Modes() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader {...modes} />
        <ol className="mt-14 grid border-t border-border lg:grid-cols-3">
          {modes.items.map((m, i) => (
            <li
              key={m.id}
              className={cn(
                "relative border-b border-border py-10 lg:border-b-0 lg:border-s lg:px-8 lg:first:border-s-0 lg:first:ps-0",
                i === 0 &&
                  "lg:bg-[radial-gradient(ellipse_at_0%_0%,oklch(0.681_0.147_238.6/0.16),transparent_70%)]",
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-3xl font-bold tracking-tight text-foreground">
                  {m.name}
                </h3>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 font-mono text-[11px]",
                    i === 0
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground",
                  )}
                >
                  {m.tag}
                </span>
              </div>
              <div
                className="mt-6 flex items-end gap-1"
                aria-label={`${modes.levelLabel} ${m.level}/3`}
                role="img"
              >
                {[1, 2, 3].map((l) => (
                  <span
                    key={l}
                    className={cn(
                      "w-6 rounded-sm",
                      l <= m.level
                        ? "bg-gradient-to-t from-primary to-primary-glow"
                        : "bg-foreground/10",
                    )}
                    style={{ height: `${l * 10}px` }}
                  />
                ))}
                <span className="ms-3 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                  {modes.levelLabel}
                </span>
              </div>
              <p className="mt-6 leading-relaxed text-muted-foreground">{m.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Pricing() {
  const opts = [pricing.optionA, pricing.optionB];
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader {...pricing} />
        <div className="mt-14 grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
          {opts.map((o, i) => (
            <div
              key={o.label}
              className={cn(
                "text-center",
                i === 0 ? "md:order-1 md:text-end" : "md:order-3 md:text-start",
              )}
            >
              <p className="section-label text-muted-foreground">{o.label}</p>
              <p
                className={cn(
                  "mt-3 font-display text-[clamp(52px,8vw,104px)] leading-none font-bold tracking-[-0.04em]",
                  i === 0 ? "text-foreground" : "text-gradient-blue",
                )}
              >
                {o.amount}
              </p>
              <p className="mt-2 font-mono text-sm text-muted-foreground">{o.unit}</p>
              <p className="mt-3 text-sm text-foreground/90">{o.extra}</p>
            </div>
          ))}
          <span className="border-light mx-auto flex size-16 items-center justify-center rounded-full bg-background font-mono text-sm text-primary md:order-2">
            {pricing.or}
          </span>
        </div>
      </div>
    </section>
  );
}

/** Two bars: in-house tender officer vs Amnay Entreprise. */
function WhyPrice() {
  const reduce = useReducedMotion();
  const max = Math.max(whyPrice.benchmark, whyPrice.amnay);
  const bars = [
    { label: whyPrice.benchmarkLabel, value: whyPrice.benchmark, approx: true, accent: false },
    { label: whyPrice.amnayLabel, value: whyPrice.amnay, approx: false, accent: true },
  ];
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-navy/70 to-transparent"
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader {...whyPrice}>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">{whyPrice.body}</p>
          </SectionHeader>
        </div>
        <div className="space-y-10 lg:col-span-7 lg:pt-16">
          {bars.map((b, i) => (
            <div key={b.label}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-foreground">{b.label}</p>
                <p
                  className={cn(
                    "font-display text-3xl font-bold tracking-tight",
                    b.accent ? "text-gradient-blue" : "text-foreground",
                  )}
                >
                  {b.approx && `${whyPrice.approx} `}
                  {frNumber(b.value)}{" "}
                  <span className="font-mono text-xs font-normal text-muted-foreground">
                    {whyPrice.unit}
                  </span>
                </p>
              </div>
              <div className="mt-3 h-4 overflow-hidden rounded-full bg-foreground/[0.06]">
                <motion.div
                  className={cn(
                    "h-full origin-left rounded-full",
                    b.accent
                      ? "bg-gradient-to-r from-primary to-primary-glow shadow-glow"
                      : "bg-foreground/30",
                  )}
                  style={{ width: `${(b.value / max) * 100}%` }}
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id={contactSection.id} className="relative py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader {...contactSection}>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">{contactSection.body}</p>
          </SectionHeader>
          <ul className="mt-8 space-y-3">
            {contactSection.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-foreground">
                <Check className="size-4 text-primary" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <ContactForm source="entreprise" />
        </div>
      </div>
    </section>
  );
}
