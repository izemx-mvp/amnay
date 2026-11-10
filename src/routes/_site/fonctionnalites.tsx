import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { AgentsPipeline } from "@/components/blocks/AgentsPipeline";
import { CtaBand } from "@/components/blocks/CtaBand";
import { PageHero } from "@/components/blocks/PageHero";
import { StepsStory } from "@/components/blocks/StepsStory";
import { DemoCta, TrialCta } from "@/components/fx/Cta";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  AnalysisRuleMockup,
  BriefMockup,
  IntelligenceMockup,
  LibraryMockup,
  MemoEditorMockup,
  PipelineMockup,
  ScoringMockup,
  TenderSheetMockup,
  WizardMockup,
} from "@/components/sections/features/Mockups";
import { cta } from "@/content/common";
import {
  agentsFull,
  analysisRule,
  dailyBrief,
  deepDiveNav,
  differentiators,
  featuresCta,
  featuresHero,
  featuresMeta,
  intelligence,
  library,
  memo,
  memoPlanNote,
  onboarding,
  pipeline,
  scoring,
  storySection,
  tenderSheet,
} from "@/content/fonctionnalites";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/fonctionnalites")({
  head: () => ({ meta: [{ title: featuresMeta.title }] }),
  component: FeaturesRoute,
});

function FeaturesRoute() {
  return (
    <>
      <PageHero {...featuresHero}>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <TrialCta surface="features_hero">{cta.trialLong}</TrialCta>
          <DemoCta surface="features_hero">{cta.demo}</DemoCta>
        </div>
      </PageHero>

      <StepsStory heading={storySection} variant="story" />

      <DeepDiveNav />

      <DeepDive
        id={onboarding.id}
        n="A"
        kicker={onboarding.kicker}
        title={onboarding.title}
        body={onboarding.body}
        visual={<WizardMockup />}
      >
        <ol className="mt-6 grid gap-x-6 gap-y-1.5 text-sm text-muted-foreground sm:grid-cols-2">
          {onboarding.steps.map((s, i) => (
            <li key={s.title} className="flex gap-2">
              <span className="font-mono text-xs text-primary">{i + 1}.</span>
              {s.title}
            </li>
          ))}
        </ol>
      </DeepDive>
      <DeepDive
        id={dailyBrief.id}
        n="B"
        kicker={dailyBrief.kicker}
        title={dailyBrief.title}
        body={dailyBrief.body}
        bullets={dailyBrief.bullets}
        visual={<BriefMockup />}
        reverse
      />
      <DeepDive
        id={scoring.id}
        n="C"
        kicker={scoring.kicker}
        title={scoring.title}
        body={scoring.body}
        bullets={[scoring.learnNote]}
        visual={<ScoringMockup />}
      />
      <DeepDive
        id={tenderSheet.id}
        n="D"
        kicker={tenderSheet.kicker}
        title={tenderSheet.title}
        body={tenderSheet.body}
        visual={<TenderSheetMockup />}
        reverse
        wide
      />
      <DeepDive
        id={analysisRule.id}
        n="E"
        kicker={analysisRule.kicker}
        title={analysisRule.title}
        body={analysisRule.body}
        visual={<AnalysisRuleMockup />}
      />
      <DeepDive
        id={memo.id}
        n="F"
        kicker={memo.kicker}
        title={memo.title}
        body={memo.body}
        bullets={memo.bullets}
        note={memoPlanNote}
        visual={<MemoEditorMockup />}
        reverse
        wide
      />
      <DeepDive
        id={library.id}
        n="G"
        kicker={library.kicker}
        title={library.title}
        body={library.body}
        bullets={library.bullets}
        visual={<LibraryMockup />}
      />
      <DeepDive
        id={pipeline.id}
        n="H"
        kicker={pipeline.kicker}
        title={pipeline.title}
        body={pipeline.body}
        visual={<PipelineMockup />}
        reverse
      />
      <DeepDive
        id={intelligence.id}
        n="I"
        kicker={intelligence.kicker}
        title={intelligence.title}
        body={intelligence.body}
        visual={<IntelligenceMockup />}
      >
        <dl className="mt-6 divide-y divide-border border-y border-border">
          {intelligence.items.map((it) => (
            <div key={it.title} className="grid gap-1 py-3 sm:grid-cols-[170px_1fr] sm:gap-4">
              <dt className="font-medium text-foreground">{it.title}</dt>
              <dd className="text-sm text-muted-foreground">{it.body}</dd>
            </div>
          ))}
        </dl>
      </DeepDive>

      <AgentsPipeline id={agentsFull.id} heading={agentsFull} variant="full" />

      <Differentiators />

      <CtaBand
        title={featuresCta.title}
        highlight={featuresCta.highlight}
        surface="features_final"
      />
    </>
  );
}

/** Sticky chip rail linking to every deep dive. */
function DeepDiveNav() {
  return (
    <nav
      aria-label={featuresHero.label}
      className="glass sticky top-16 z-30 border-y border-border"
    >
      <ul className="mx-auto flex w-full max-w-7xl gap-1 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:px-6">
        {deepDiveNav.map((d) => (
          <li key={d.id} className="shrink-0">
            <a
              href={`#${d.id}`}
              className="block rounded-full px-3.5 py-1.5 text-xs whitespace-nowrap text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
            >
              {d.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

type DeepDiveProps = {
  id: string;
  /** Letter shown as a large outlined marker. */
  n: string;
  kicker: string;
  title: string;
  body: string;
  bullets?: readonly string[];
  note?: string;
  visual: ReactNode;
  /** Visual on the left. */
  reverse?: boolean;
  /** Give the visual more room. */
  wide?: boolean;
  children?: ReactNode;
};

/** One feature: copy on one side, its own product mockup on the other, alternating. */
function DeepDive({
  id,
  n,
  kicker,
  title,
  body,
  bullets,
  note,
  visual,
  reverse,
  wide,
  children,
}: DeepDiveProps) {
  return (
    <section id={id} className="relative scroll-mt-6 py-20 lg:py-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className={cn(wide ? "lg:col-span-5" : "lg:col-span-6", reverse && "lg:order-2")}>
          <div className="flex items-center gap-4">
            <span className="text-outline font-display text-6xl leading-none font-bold">{n}</span>
            <span className="section-label">{kicker}</span>
          </div>
          <h2 className="mt-6 font-display text-[clamp(28px,3.4vw,44px)] leading-[1.08] font-bold tracking-[-0.03em] text-foreground">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{body}</p>
          {bullets && (
            <ul className="mt-6 space-y-2.5">
              {bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-foreground">
                  <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {children}
          {note && <p className="mt-6 font-mono text-xs text-primary">{note}</p>}
        </div>
        <Reveal
          className={cn(
            "relative",
            wide ? "lg:col-span-7" : "lg:col-span-6",
            reverse && "lg:order-1",
          )}
        >
          <div
            aria-hidden
            className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,oklch(0.681_0.147_238.6/0.14),transparent_65%)]"
          />
          <div className="relative">{visual}</div>
        </Reveal>
      </div>
    </section>
  );
}

/** 8 differentiators as a two-column ledger, under one punchline. */
function Differentiators() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-navy/70 to-transparent"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader {...differentiators} />
        <ol className="mt-14 grid border-t border-border md:grid-cols-2 md:gap-x-12">
          {differentiators.items.map((d, i) => (
            <li key={d.title} className="flex items-baseline gap-5 border-b border-border py-6">
              <span className="font-mono text-xs text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">{d.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <blockquote className="mx-auto mt-20 max-w-4xl text-center font-display text-[clamp(26px,3.6vw,46px)] leading-[1.15] font-semibold tracking-[-0.02em] text-foreground">
          <span className="text-gradient-blue">«</span> {differentiators.punchline}{" "}
          <span className="text-gradient-blue">»</span>
        </blockquote>
      </div>
    </section>
  );
}
