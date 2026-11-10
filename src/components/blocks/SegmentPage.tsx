import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { TrialCta } from "@/components/fx/Cta";
import { TypeWriter } from "@/components/fx/TypeWriter";
import { useLoop } from "@/components/fx/hooks";
import { Hero, type HeroData } from "@/components/sections/Hero";
import { ProductFrame, SampleTag } from "@/components/shared/ProductFrame";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { billing, getPlan } from "@/config/site";
import { cta, sampleDataLabel, trialMicrocopy } from "@/content/common";
import { pickFaq } from "@/content/faq";
import { hero as homeHero } from "@/content/home";
import { segmentPageCopy as copy, type Segment } from "@/content/segments";
import { frNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { CostComparator } from "./CostComparator";
import { CtaBand } from "./CtaBand";
import { FaqAccordion } from "./FaqAccordion";
import { ProofsBento } from "./ProofsBento";
import { DetectScreen } from "./StepScreens";

const ease = [0.22, 1, 0.36, 1] as const;

/** Ad landing page for one segment: home storyline in the segment's words, one CTA (trial). */
export function SegmentPage({ segment }: { segment: Segment }) {
  const hero: HeroData = {
    ...segment.hero,
    primaryCta: cta.trialLong,
    microcopy: trialMicrocopy,
    ariaLabel: `${segment.hero.windowTitle} — ${sampleDataLabel}`,
    sequence: {
      ...segment.hero.sequence,
      reader: homeHero.sequence.reader,
      scoreLabel: homeHero.sequence.scoreLabel,
      eligible: homeHero.sequence.eligible,
    },
  };

  return (
    <>
      <Hero
        hero={hero}
        marquee={segment.trades}
        marqueeLabel={copy.marqueeLabel}
        surface={`segment_${segment.slug}_hero`}
      />
      <Pains segment={segment} />
      <Answers segment={segment} />
      <ProofsBento
        heading={{
          index: "03",
          label: copy.proofsLabel,
          title: copy.proofsTitle,
          highlight: copy.proofsHighlight,
        }}
      />
      <Memo segment={segment} />
      <CostComparator
        heading={{
          index: "05",
          label: copy.comparatorLabel,
          title: copy.comparatorTitle,
          highlight: copy.comparatorHighlight,
        }}
      />
      <RecommendedPlan segment={segment} />
      <FaqAccordion
        heading={{
          index: "07",
          label: copy.faqLabel,
          title: copy.faqTitle,
          highlight: copy.faqHighlight,
        }}
        items={pickFaq(segment.faqIds)}
        demo={false}
      />
      <CtaBand
        title={segment.closing.title}
        highlight={segment.closing.highlight}
        secondary={null}
        surface={`segment_${segment.slug}_final`}
      />
    </>
  );
}

/* ─────────────────────────── pains: big numbered rail ─────────────────────────── */

function Pains({ segment }: { segment: Segment }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="01"
          label={copy.painsLabel}
          title={copy.painsTitle}
          highlight={copy.painsHighlight}
        />
        <ol className="mt-14 grid border-t border-border md:grid-cols-3">
          {segment.pains.map((p, i) => (
            <motion.li
              key={p.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="border-b border-border py-10 md:border-b-0 md:border-s md:px-8 md:first:border-s-0 md:first:ps-0"
            >
              <span className="text-outline block font-display text-[88px] leading-none font-bold tracking-tighter">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground">
                {p.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{p.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────── answers: timeline + sticky screen ─────────────────────────── */

function Answers({ segment }: { segment: Segment }) {
  const ref = useRef<HTMLDivElement>(null);
  const run = useLoop(ref);
  return (
    <section className="relative py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      <div ref={ref} className="mx-auto grid w-full max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeader
            index="02"
            label={copy.answersLabel}
            title={copy.answersTitle}
            highlight={copy.answersHighlight}
          />
          <ol className="relative mt-12 space-y-10 ps-8">
            <span
              aria-hidden
              className="absolute inset-y-2 start-0 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent"
            />
            {segment.answers.map((a) => (
              <li key={a.step} className="relative">
                <span
                  aria-hidden
                  className="absolute top-1.5 -start-8 size-2 -translate-x-[3.5px] rounded-full bg-primary-glow shadow-[0_0_10px_oklch(0.741_0.138_234.8)]"
                />
                <p className="font-mono text-xs tracking-[0.14em] text-primary uppercase">
                  {a.step}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">
                  {a.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{a.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-28">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,oklch(0.681_0.147_238.6/0.16),transparent_65%)]"
              />
              <div className="relative">
                <DetectScreen active={run} rows={segment.hero.rows} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── memo: two-pane editor ─────────────────────────── */

function Memo({ segment }: { segment: Segment }) {
  const ref = useRef<HTMLDivElement>(null);
  const run = useLoop(ref);
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        ref={ref}
        className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12"
      >
        <div className="lg:col-span-5">
          <SectionHeader
            index="04"
            label={copy.memoLabel}
            title={copy.memoTitle}
            highlight={copy.memoHighlight}
          >
            <p className="mt-6 max-w-md text-lg text-muted-foreground">{copy.memoBody}</p>
          </SectionHeader>
        </div>
        <div className="lg:col-span-7">
          <ProductFrame title={`app.amnay — ${copy.memoLabel}`} meta={<SampleTag />}>
            <div className="grid sm:grid-cols-[1fr_1.3fr]">
              <div className="border-b border-border/60 p-5 sm:border-e sm:border-b-0">
                <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                  {copy.memoSource}
                </p>
                <div className="mt-4 space-y-2">
                  {[90, 100, 76, 94, 62, 88].map((w, i) => (
                    <span
                      key={i}
                      className={cn(
                        "block h-1.5 rounded-full",
                        i === 2 || i === 3 ? "bg-primary/40" : "bg-foreground/12",
                      )}
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="p-5">
                <p className="flex items-center gap-1.5 font-mono text-[10px] text-primary uppercase">
                  <Sparkles className="size-3" aria-hidden />
                  {copy.memoAgent}
                </p>
                <h4 className="mt-3 font-display text-lg font-semibold text-foreground">
                  {segment.memo.section}
                </h4>
                <p className="mt-2 min-h-[7.5em] text-sm leading-relaxed text-muted-foreground">
                  <TypeWriter text={segment.memo.text} active={run} speed={24} />
                </p>
              </div>
            </div>
          </ProductFrame>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── recommended plan ─────────────────────────── */

function RecommendedPlan({ segment }: { segment: Segment }) {
  const plans = segment.recommendedPlans.map(getPlan);
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="border-light relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,oklch(0.22_0.05_252),oklch(0.17_0.035_258))] p-7 sm:p-12">
          <div aria-hidden className="grid-fade pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <SectionHeader
                index="06"
                label={copy.planLabel}
                title={copy.planTitle}
                highlight={copy.planHighlight}
              >
                <p className="mt-6 max-w-md text-muted-foreground">{segment.planReason}</p>
              </SectionHeader>
            </div>
            <div className="lg:col-span-6">
              <ul className="divide-y divide-border border-y border-border">
                {plans.map((p) => (
                  <li
                    key={p.id}
                    className="flex flex-wrap items-baseline justify-between gap-3 py-5"
                  >
                    <span className="font-display text-3xl font-bold tracking-tight text-foreground">
                      {p.name}
                    </span>
                    <span className="font-mono text-sm text-muted-foreground">
                      <span className="font-display text-2xl font-semibold text-foreground">
                        {frNumber(Math.round(p.yearly / 12))}
                      </span>{" "}
                      {billing.currencyLabel}
                      {copy.planPerMonth}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <TrialCta surface={`segment_${segment.slug}_plan`}>{cta.trialLong}</TrialCta>
                <p className="mt-3 font-mono text-xs text-muted-foreground">{trialMicrocopy}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
