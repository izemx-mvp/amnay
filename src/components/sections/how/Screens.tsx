import { motion, useReducedMotion } from "framer-motion";
import { Check, FileText, Quote } from "lucide-react";
import { TypeWriter } from "@/components/fx/TypeWriter";
import { ProductFrame, SampleTag } from "@/components/shared/ProductFrame";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { hero, howItWorks, tenderRows } from "@/content/home";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const s = howItWorks.screens;

type ScreenProps = { active: boolean };

/** Shared enter animation: children stagger in each time the screen becomes active. */
function useEnter(active: boolean) {
  const reduce = useReducedMotion();
  return (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
          transition: { duration: 0.45, ease, delay: active ? 0.1 + i * 0.09 : 0 },
        };
}

export function DetectScreen({ active }: ScreenProps) {
  const enter = useEnter(active);
  return (
    <ProductFrame title={s.detect.title} meta={<SampleTag>{hero.demoDataLabel}</SampleTag>}>
      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 px-4 py-3">
        <span className="rounded-full bg-primary/12 px-2.5 py-1 font-mono text-[10px] text-primary">
          {s.detect.profile}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">{s.detect.counter}</span>
      </div>
      <ul>
        {tenderRows.map((row, i) => (
          <motion.li
            key={row.ref}
            {...enter(i)}
            className="flex items-center gap-3 border-b border-border/40 px-4 py-3 last:border-0"
          >
            <ScoreBadge score={row.score} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{row.title}</p>
              <p className="text-xs text-muted-foreground">{row.buyer}</p>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              J-{row.deadlineDays}
            </span>
          </motion.li>
        ))}
      </ul>
    </ProductFrame>
  );
}

const PAGE_LINES = [82, 95, 70, 88, 100, 64, 91, 77, 96, 58, 85, 72];
const HIGHLIGHTED = new Set([3, 4, 8]);

export function ReadScreen({ active }: ScreenProps) {
  const enter = useEnter(active);
  const reduce = useReducedMotion();
  return (
    <ProductFrame title={s.read.title} meta={<SampleTag />}>
      <div className="grid gap-4 p-4 sm:grid-cols-[1.1fr_1fr]">
        <div className="relative rounded-lg bg-foreground/[0.05] p-4">
          <p className="mb-3 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
            <FileText className="size-3" aria-hidden />
            {s.read.file} · p. 47
          </p>
          <div className="space-y-2">
            {PAGE_LINES.map((w, i) => (
              <div key={i} className="relative h-2" style={{ width: `${w}%` }}>
                <span className="absolute inset-0 rounded-full bg-foreground/12" />
                {HIGHLIGHTED.has(i) && (
                  <motion.span
                    className="absolute -inset-y-1 -inset-x-1 origin-left rounded bg-primary/30"
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: active || reduce ? 1 : 0 }}
                    transition={{ duration: 0.6, ease, delay: active ? 0.4 + i * 0.08 : 0 }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <ul className="space-y-3">
          {s.read.facts.map((f, i) => (
            <motion.li
              key={f.label}
              {...enter(i + 3)}
              className="border-light rounded-xl bg-navy/60 p-3"
            >
              <p className="text-[11px] text-muted-foreground">{f.label}</p>
              <p className="mt-0.5 font-display text-lg font-semibold text-foreground">{f.value}</p>
              <p className="mt-2 inline-flex items-center gap-1 rounded-md bg-primary/12 px-1.5 py-0.5 font-mono text-[10px] text-primary">
                <Quote className="size-2.5" aria-hidden />
                {f.cite}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </ProductFrame>
  );
}

export function DecideScreen({ active }: ScreenProps) {
  const enter = useEnter(active);
  const reduce = useReducedMotion();
  return (
    <ProductFrame title={s.decide.title} meta={<SampleTag />}>
      <div className="grid gap-5 p-5 sm:grid-cols-[auto_1fr]">
        <motion.div
          {...enter(0)}
          className="flex flex-col items-center justify-center rounded-xl bg-success/10 px-8 py-6 ring-1 ring-success/30"
        >
          <span className="font-display text-5xl font-bold tracking-tight text-success drop-shadow-[0_0_24px_oklch(0.723_0.192_149.6/0.6)]">
            {s.decide.verdict}
          </span>
          <span className="mt-2 font-mono text-2xl font-semibold text-foreground">
            {hero.sequence.score}
            <span className="text-sm text-muted-foreground">/100</span>
          </span>
          <span className="mt-2 max-w-[9rem] text-center text-[11px] text-muted-foreground">
            {s.decide.verdictNote}
          </span>
        </motion.div>
        <div className="space-y-4">
          {s.decide.criteria.map((c, i) => (
            <div key={c.label}>
              <div className="flex justify-between text-xs">
                <span className="text-foreground">{c.label}</span>
                <span className="font-mono text-muted-foreground">{c.value} %</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                <motion.div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-primary to-primary-glow"
                  style={{ width: `${c.value}%` }}
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={{ scaleX: active || reduce ? 1 : 0 }}
                  transition={{ duration: 0.8, ease, delay: active ? 0.2 + i * 0.12 : 0 }}
                />
              </div>
            </div>
          ))}
          <ul className="flex flex-wrap gap-2 pt-1">
            {s.decide.pieces.map((p, i) => (
              <motion.li
                key={p}
                {...enter(i + 5)}
                className="inline-flex items-center gap-1 rounded-full bg-foreground/[0.06] px-2.5 py-1 text-[11px] text-foreground"
              >
                <Check className="size-3 text-success" aria-hidden />
                {p}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </ProductFrame>
  );
}

export function RespondScreen({ active }: ScreenProps) {
  return (
    <ProductFrame title={s.respond.title} meta={<SampleTag />}>
      <div className="grid min-h-[300px] sm:grid-cols-[150px_1fr]">
        <ul className="hidden space-y-1 border-e border-border/60 p-3 text-xs sm:block">
          {s.respond.outline.map((o, i) => (
            <li
              key={o}
              className={cn(
                "rounded-md px-2 py-1.5",
                i === s.respond.activeOutline
                  ? "bg-primary/12 text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {o}
            </li>
          ))}
        </ul>
        <div className="p-5">
          <span className="inline-flex rounded-full bg-success/12 px-2.5 py-1 font-mono text-[10px] text-success">
            {s.respond.style}
          </span>
          <h4 className="mt-4 font-display text-lg font-semibold text-foreground">
            {s.respond.heading}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            <TypeWriter text={s.respond.text} active={active} speed={22} />
          </p>
        </div>
      </div>
    </ProductFrame>
  );
}

export const screens = [DetectScreen, ReadScreen, DecideScreen, RespondScreen] as const;
