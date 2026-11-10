import { useId, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { ProductFrame, SampleTag } from "@/components/shared/ProductFrame";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { creditCosts } from "@/config/site";
import {
  analysisRule,
  dailyBrief,
  intelligence,
  library,
  memo,
  onboarding,
  pipeline,
  scoring,
  tenderSheet,
} from "@/content/fonctionnalites";
import { fill, frNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────── 1. onboarding wizard ─────────────────────────── */

export function WizardMockup() {
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  const total = onboarding.steps.length;
  const current = onboarding.steps[step] ?? onboarding.steps[0];
  if (!current) return null;

  return (
    <ProductFrame title={onboarding.windowTitle} meta={<SampleTag />}>
      <div className="grid sm:grid-cols-[190px_1fr]">
        <ol className="hidden border-e border-border/60 p-3 sm:block">
          {onboarding.steps.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-current={i === step ? "step" : undefined}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-start text-xs transition-colors",
                  i === step
                    ? "bg-primary/12 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-full font-mono text-[9px]",
                    i < step
                      ? "bg-success/20 text-success"
                      : i === step
                        ? "bg-primary text-primary-foreground"
                        : "bg-foreground/10",
                  )}
                >
                  {i < step ? <Check className="size-2.5" /> : i + 1}
                </span>
                <span className="truncate">{s.title}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="flex min-h-[300px] flex-col p-5">
          <p className="font-mono text-[10px] text-primary">
            {fill(onboarding.stepsLabel, { n: step + 1, total })}
          </p>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-foreground/10">
            <motion.div
              className="h-full origin-left rounded-full bg-gradient-to-r from-primary to-primary-glow"
              animate={{ scaleX: (step + 1) / total }}
              transition={{ duration: reduce ? 0 : 0.4, ease }}
            />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="flex-1"
              initial={reduce ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <h4 className="mt-5 font-display text-lg font-semibold text-foreground">
                {current.title}
              </h4>
              <p className="mt-1 text-sm text-muted-foreground">{current.body}</p>
              <ul className="mt-4 space-y-2">
                {current.fields.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 rounded-lg border border-border/70 bg-background/40 px-3 py-2 text-xs text-foreground"
                  >
                    <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
          <div className="mt-5 flex justify-between gap-2">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              aria-label={onboarding.prev}
              className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
              disabled={step === total - 1}
              aria-label={onboarding.next}
              className="flex h-9 items-center gap-1 rounded-full bg-primary px-4 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-glow disabled:opacity-40"
            >
              {onboarding.next}
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </ProductFrame>
  );
}

/* ─────────────────────────── 2. daily brief ─────────────────────────── */

export function BriefMockup() {
  const b = dailyBrief.blocks;
  const max = Math.max(...b.funnel.map((f) => f.value));
  return (
    <ProductFrame title={dailyBrief.windowTitle} meta={<SampleTag />}>
      <div className="space-y-4 p-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-foreground/[0.04] p-4">
            <p className="font-mono text-[10px] text-muted-foreground uppercase">{b.newLabel}</p>
            <p className="mt-1 font-display text-4xl font-bold text-foreground">{b.newValue}</p>
          </div>
          <div className="rounded-xl bg-success/10 p-4 ring-1 ring-success/30">
            <p className="font-mono text-[10px] text-success uppercase">{b.priorityLabel}</p>
            <p className="mt-1 font-display text-4xl font-bold text-success">{b.priorityValue}</p>
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] text-muted-foreground uppercase">
            {b.deadlinesLabel}
          </p>
          <ul className="mt-2 space-y-1.5">
            {b.deadlines.map((d) => (
              <li key={d.tag} className="flex items-center gap-3 text-sm">
                <span
                  className={cn(
                    "w-11 rounded-md px-1.5 py-0.5 text-center font-mono text-[11px]",
                    d.tag === "J-1"
                      ? "bg-destructive/15 text-destructive"
                      : d.tag === "J-3"
                        ? "bg-warning/15 text-warning"
                        : "bg-primary/12 text-primary",
                  )}
                >
                  {d.tag}
                </span>
                <span className="truncate text-foreground">{d.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="space-y-1.5">
          {b.alerts.map((a) => (
            <li
              key={a.text}
              className={cn(
                "flex items-start gap-2 rounded-lg px-3 py-2 text-xs",
                a.tone === "warning" ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary",
              )}
            >
              {a.tone === "warning" ? (
                <AlertTriangle className="mt-px size-3.5 shrink-0" aria-hidden />
              ) : (
                <Bell className="mt-px size-3.5 shrink-0" aria-hidden />
              )}
              {a.text}
            </li>
          ))}
        </ul>
        <div>
          <p className="font-mono text-[10px] text-muted-foreground uppercase">{b.funnelLabel}</p>
          <div className="mt-2 flex items-end gap-2">
            {b.funnel.map((f) => (
              <div key={f.label} className="flex-1 text-center">
                <motion.div
                  className="mx-auto w-full origin-bottom rounded-t-md bg-gradient-to-t from-primary/40 to-primary-glow/80"
                  style={{ height: `${Math.max(8, (f.value / max) * 72)}px` }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease }}
                />
                <p className="mt-1 font-mono text-xs text-foreground">{f.value}</p>
                <p className="text-[10px] text-muted-foreground">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProductFrame>
  );
}

/* ─────────────────────────── 3. scoring + decisions ─────────────────────────── */

export function ScoringMockup() {
  const [decision, setDecision] = useState<string | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [read, setRead] = useState(false);
  const sample = scoring.sample;

  return (
    <ProductFrame title={scoring.windowTitle} meta={<SampleTag />}>
      <div className="p-5">
        <p className="font-mono text-[10px] text-muted-foreground uppercase">
          {scoring.profilesLabel}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {scoring.profiles.map((p) => (
            <span
              key={p}
              className="rounded-full bg-primary/12 px-2.5 py-1 font-mono text-[10px] text-primary"
            >
              {p}
            </span>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-border bg-background/40 p-4">
          <p className="text-sm font-medium text-foreground">{sample.title}</p>
          <div className="mt-3 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setRead((r) => !r)}
              aria-pressed={read}
              className="group flex items-center gap-3 rounded-lg text-start outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="text-center">
                <ScoreBadge score={sample.pre} className="opacity-70" />
                <span className="mt-1 block font-mono text-[9px] text-muted-foreground uppercase">
                  {scoring.preLabel}
                </span>
              </span>
              <ArrowRight
                className={cn(
                  "size-4 transition-colors",
                  read ? "text-primary" : "text-muted-foreground",
                )}
                aria-hidden
              />
              <span className="text-center">
                <span
                  className={cn(
                    "inline-flex transition-opacity",
                    read ? "opacity-100" : "opacity-30",
                  )}
                >
                  <ScoreBadge score={sample.full} />
                </span>
                <span className="mt-1 block font-mono text-[9px] text-muted-foreground uppercase">
                  {scoring.fullLabel}
                </span>
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={scoring.kicker}>
          {scoring.decisions.map((d) => (
            <button
              key={d.id}
              type="button"
              aria-pressed={decision === d.id}
              onClick={() => {
                setDecision(d.id);
                setReason(null);
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                decision === d.id
                  ? d.id === "refused"
                    ? "border-destructive/60 bg-destructive/15 text-foreground"
                    : "border-primary bg-primary/15 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {d.label}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {decision === "refused" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <p className="mt-4 font-mono text-[10px] text-muted-foreground uppercase">
                {scoring.reasonLabel}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {scoring.reasons.map((r) => (
                  <button
                    key={r}
                    type="button"
                    aria-pressed={reason === r}
                    onClick={() => setReason(r)}
                    className={cn(
                      "rounded-md px-2 py-1 text-[11px] transition-colors",
                      reason === r
                        ? "bg-destructive/20 text-foreground"
                        : "bg-foreground/[0.05] text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
              {reason && (
                <p className="mt-3 flex items-center gap-1.5 text-xs text-success">
                  <Sparkles className="size-3" aria-hidden />
                  {scoring.learnNote}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ProductFrame>
  );
}

/* ─────────────────────────── 4. tender sheet, 8 tabs ─────────────────────────── */

export function TenderSheetMockup() {
  return (
    <ProductFrame title={tenderSheet.windowTitle} meta={<SampleTag />}>
      <Tabs.Root defaultValue={tenderSheet.tabs[0]?.id}>
        <Tabs.List
          aria-label={tenderSheet.kicker}
          className="flex gap-1 overflow-x-auto border-b border-border/60 px-2 pt-2 [scrollbar-width:none]"
        >
          {tenderSheet.tabs.map((t) => (
            <Tabs.Trigger
              key={t.id}
              value={t.id}
              className="relative shrink-0 rounded-t-md px-3 py-2 text-xs whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-primary/10 data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:inset-x-2 data-[state=active]:after:bottom-0 data-[state=active]:after:h-0.5 data-[state=active]:after:rounded-full data-[state=active]:after:bg-primary"
            >
              {t.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {tenderSheet.tabs.map((t) => (
          <Tabs.Content
            key={t.id}
            value={t.id}
            className="min-h-[220px] p-5 outline-none data-[state=active]:animate-fade-up"
          >
            <dl className="divide-y divide-border/60">
              {t.rows.map((r) => (
                <div
                  key={r.k}
                  className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-4 py-2.5 text-sm"
                >
                  <dt className="truncate font-mono text-xs text-muted-foreground">{r.k}</dt>
                  <dd
                    className={cn(
                      "text-foreground",
                      r.v.startsWith("✓") && "text-success",
                      r.v.startsWith("!") && "text-warning",
                    )}
                  >
                    {r.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </ProductFrame>
  );
}

/* ─────────────────────────── 5. analysis rule ─────────────────────────── */

export function AnalysisRuleMockup() {
  const [mode, setMode] = useState("threshold");
  const [threshold, setThreshold] = useState(analysisRule.defaultThreshold);
  const id = useId();
  const levels = analysisRule.distribution;
  const n =
    mode === "manual"
      ? 0
      : ([...levels].reverse().find((d) => threshold >= d.min)?.perMonth ??
        levels[0]?.perMonth ??
        0);
  const min = levels[0]?.min ?? 60;
  const max = 95;
  const pct = ((threshold - min) / (max - min)) * 100;

  return (
    <ProductFrame title={analysisRule.windowTitle} meta={<SampleTag />}>
      <div className="space-y-5 p-5">
        <div
          role="radiogroup"
          aria-label={analysisRule.kicker}
          className="grid gap-2 sm:grid-cols-2"
        >
          {analysisRule.modes.map((m) => (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={mode === m.id}
              onClick={() => setMode(m.id)}
              className={cn(
                "rounded-xl border p-3 text-start transition-colors",
                mode === m.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/40",
              )}
            >
              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span
                  className={cn(
                    "size-3 rounded-full border-2",
                    mode === m.id ? "border-primary bg-primary" : "border-muted-foreground",
                  )}
                />
                {m.label}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">{m.body}</span>
            </button>
          ))}
        </div>
        <div
          className={cn(
            "transition-opacity",
            mode === "manual" && "pointer-events-none opacity-40",
          )}
        >
          <div className="flex items-baseline justify-between">
            <label htmlFor={id} className="text-sm text-muted-foreground">
              {analysisRule.thresholdLabel}
            </label>
            <output htmlFor={id} className="font-mono text-lg font-semibold text-foreground">
              ≥ {threshold}
            </output>
          </div>
          <input
            id={id}
            type="range"
            min={min}
            max={max}
            step={5}
            value={threshold}
            disabled={mode === "manual"}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="range-glow mt-2"
            style={{ ["--p" as string]: `${pct}%` }}
          />
        </div>
        <div className="rounded-xl bg-foreground/[0.04] p-4">
          <p className="font-mono text-[10px] text-muted-foreground uppercase">
            {analysisRule.estimateLabel}
          </p>
          <p
            className="mt-1 font-display text-2xl font-semibold text-foreground"
            aria-live="polite"
          >
            {fill(analysisRule.estimate, { n, c: frNumber(n * creditCosts.analysis) })}
          </p>
        </div>
      </div>
    </ProductFrame>
  );
}

/* ─────────────────────────── 6. memo editor ─────────────────────────── */

export function MemoEditorMockup() {
  return (
    <ProductFrame title={memo.windowTitle} meta={<SampleTag />}>
      <div className="grid sm:grid-cols-[200px_1fr]">
        <div className="border-b border-border/60 p-3 sm:border-e sm:border-b-0">
          <p className="px-2 font-mono text-[10px] text-muted-foreground uppercase">
            {memo.outlineLabel}
          </p>
          <ul className="mt-2 space-y-1">
            {memo.outline.map((o) => (
              <li
                key={o.title}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs",
                  o.state === "active" ? "bg-primary/12 text-foreground" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    o.state === "done"
                      ? "bg-success"
                      : o.state === "active"
                        ? "bg-primary-glow"
                        : "bg-foreground/20",
                  )}
                  aria-hidden
                />
                <span className="truncate">{o.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5">
          <h4 className="font-display text-lg font-semibold text-foreground">{memo.heading}</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {memo.text}
            <span
              className="animate-caret ms-px inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-primary"
              aria-hidden
            />
          </p>
          <p className="mt-4 font-mono text-[10px] text-muted-foreground uppercase">
            {memo.sourcesLabel}
          </p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {memo.sources.map((s) => (
              <li
                key={s}
                className="inline-flex items-center gap-1 rounded-md bg-primary/12 px-1.5 py-0.5 font-mono text-[10px] text-primary"
              >
                <FileText className="size-2.5" aria-hidden />
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
            {memo.actions.map((a) => (
              <span
                key={a}
                className="rounded-full border border-border px-2.5 py-1 text-[11px] text-foreground"
              >
                {a}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px]">
            <span className="text-success">{memo.compliance}</span>
            <span className="text-muted-foreground">{memo.version}</span>
          </div>
        </div>
      </div>
    </ProductFrame>
  );
}

/* ─────────────────────────── 7. library + vault ─────────────────────────── */

export function LibraryMockup() {
  return (
    <ProductFrame title={library.windowTitle} meta={<SampleTag />}>
      <div className="p-5">
        <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-background/50 px-4 py-2.5 text-xs text-foreground">
          <Search className="size-3.5 shrink-0 text-primary" aria-hidden />
          <span className="truncate">{library.searchPlaceholder}</span>
        </div>
        <ul className="mt-3 space-y-1.5">
          {library.results.map((r) => (
            <li
              key={r.title}
              className="flex items-center gap-3 rounded-lg bg-foreground/[0.03] px-3 py-2"
            >
              <span className="w-20 shrink-0 font-mono text-[10px] text-primary uppercase">
                {r.kind}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-foreground">{r.title}</span>
              <span className="hidden font-mono text-[10px] text-muted-foreground sm:inline">
                {r.meta}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 font-mono text-[10px] text-muted-foreground uppercase">
          {library.vaultLabel}
        </p>
        <ul className="mt-2 divide-y divide-border/60">
          {library.vault.map((v) => {
            const expired = v.days < 0;
            const soon = !expired && v.days <= 30;
            return (
              <li key={v.name} className="flex items-center justify-between gap-3 py-2 text-sm">
                <span className="text-foreground">{v.name}</span>
                <span
                  className={cn(
                    "rounded-md px-2 py-0.5 font-mono text-[10px]",
                    expired
                      ? "bg-destructive/15 text-destructive"
                      : soon
                        ? "bg-warning/15 text-warning"
                        : "bg-success/12 text-success",
                  )}
                >
                  {expired
                    ? library.expiredLabel
                    : soon
                      ? library.reminderLabel
                      : fill(library.validLabel, { n: v.days })}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </ProductFrame>
  );
}

/* ─────────────────────────── 8. pipeline kanban ─────────────────────────── */

export function PipelineMockup() {
  return (
    <ProductFrame title={pipeline.windowTitle} meta={<SampleTag />}>
      <div className="flex gap-2 overflow-x-auto p-3 [scrollbar-width:thin]">
        {pipeline.columns.map((col) => (
          <div key={col.id} className="w-36 shrink-0 rounded-lg bg-foreground/[0.03] p-2">
            <p className="flex items-center justify-between px-1 font-mono text-[10px] text-muted-foreground uppercase">
              <span className="truncate">{col.label}</span>
              <span>{col.cards.length}</span>
            </p>
            <ul className="mt-2 space-y-1.5">
              {col.cards.map((c) => (
                <li
                  key={c}
                  className={cn(
                    "rounded-md border bg-[oklch(0.2_0.04_257)] p-2 text-[11px] leading-snug text-foreground",
                    col.id === "won"
                      ? "border-success/40"
                      : col.id === "lost"
                        ? "border-border opacity-60"
                        : "border-border",
                  )}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-border/60 px-4 py-3">
        {pipeline.channels.map((ch) => (
          <span
            key={ch.label}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px]",
              ch.available
                ? "bg-primary/12 text-primary"
                : "border border-dashed border-border text-muted-foreground",
            )}
          >
            {ch.available ? (
              <Check className="size-3" aria-hidden />
            ) : (
              <X className="size-3" aria-hidden />
            )}
            {ch.label}
            {!ch.available && ` · ${pipeline.soon}`}
          </span>
        ))}
      </div>
    </ProductFrame>
  );
}

/* ─────────────────────────── 9. market intelligence ─────────────────────────── */

export function IntelligenceMockup() {
  const reduce = useReducedMotion();
  return (
    <ProductFrame title={intelligence.windowTitle} meta={<SampleTag />}>
      <div className="p-5">
        <p className="font-mono text-[10px] text-muted-foreground uppercase">
          {intelligence.chartLabel}
        </p>
        <div className="relative mt-4 flex h-40 items-end gap-2 border-b border-border">
          {intelligence.bars.map((h, i) => (
            <motion.span
              key={i}
              className="flex-1 origin-bottom rounded-t-sm bg-foreground/15"
              style={{ height: `${h}%` }}
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.05 }}
            />
          ))}
          <span
            className="absolute inset-x-0 border-t-2 border-dashed border-primary-glow"
            style={{ bottom: `${intelligence.yourBar}%` }}
            aria-hidden
          >
            <span className="absolute -top-6 right-0 rounded-md bg-primary px-1.5 py-0.5 font-mono text-[10px] text-primary-foreground">
              {intelligence.yourPrice}
            </span>
          </span>
        </div>
        <ul className="mt-5 grid gap-x-4 gap-y-2 sm:grid-cols-2">
          {intelligence.items.slice(0, 4).map((it) => (
            <li key={it.title} className="flex items-center gap-2 text-xs text-foreground">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              {it.title}
            </li>
          ))}
        </ul>
      </div>
    </ProductFrame>
  );
}
