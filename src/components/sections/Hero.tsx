import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, FileSearch, ScanLine } from "lucide-react";
import { Emblem } from "@/components/brand/Logo";
import { DemoCta, TrialCta } from "@/components/fx/Cta";
import { RevealWords } from "@/components/fx/RevealWords";
import { Ticker } from "@/components/fx/Ticker";
import { useFinePointer, useLoop, useTicker } from "@/components/fx/hooks";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { categories, hero, heroStats, tenderRows } from "@/content/home";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36">
      {/* light, not boxes */}
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[900px] rounded-full bg-[radial-gradient(circle,oklch(0.681_0.147_238.6/0.22),transparent_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -left-60 size-[600px] rounded-full bg-[radial-gradient(circle,oklch(0.681_0.147_238.6/0.1),transparent_65%)]"
      />
      <Emblem
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[-12%] hidden w-[820px] max-w-none -translate-y-1/2 opacity-[0.045] select-none lg:block"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <p className="section-label inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3 py-1.5 text-[11px]">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            {hero.badge}
          </p>

          <RevealWords
            as="h1"
            immediate
            delay={0.1}
            text={hero.title}
            highlight={hero.titleHighlight}
            className="h1-display mt-7 text-foreground"
          />

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrialCta surface="hero">{hero.primaryCta}</TrialCta>
            <DemoCta surface="hero">{hero.secondaryCta}</DemoCta>
          </div>
          <p className="mt-4 font-mono text-xs text-muted-foreground">{hero.microcopy}</p>

          <dl className="mt-12 grid grid-cols-3 divide-x divide-border border-t border-border pt-6">
            {heroStats.map((s) => (
              <div key={s.label} className="px-3 first:ps-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  <Ticker value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </dd>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6">
          <HeroWindow />
        </div>
      </div>

      <Marquee />
    </section>
  );
}

/* ─────────────────────────── 3D window ─────────────────────────── */

function HeroWindow() {
  const fine = useFinePointer();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const rotateY = useTransform(sx, (v) => -14 + v * 6);
  const rotateX = useTransform(sy, (v) => 7 - v * 5);

  useEffect(() => {
    if (!fine) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine, px, py]);

  return (
    <div className="relative" style={fine ? { perspective: 1800 } : undefined}>
      {/* glow under the window */}
      <div
        aria-hidden
        className="absolute inset-x-[8%] top-[12%] bottom-[-6%] rounded-[40px] bg-primary/25 blur-[80px]"
      />
      <motion.div
        className="relative"
        style={fine ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
      >
        <HeroSequence />
        {/* glossy reflection on the glass */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(115deg,oklch(1_0_0/0.09),transparent_38%,transparent_70%,oklch(1_0_0/0.03))]"
        />
      </motion.div>
      {/* floor reflection */}
      <div
        aria-hidden
        className="mx-auto mt-6 h-10 w-4/5 rounded-[50%] bg-[radial-gradient(ellipse,oklch(0.681_0.147_238.6/0.35),transparent_70%)] blur-md"
      />
    </div>
  );
}

/* Phases: 0 rows stream in · 1 row expands · 2 Lecteur scans · 3 score ring · 4 Éligible. */
const PHASE_AT = [0, 1500, 2100, 4300, 5500] as const;
const LOOP_MS = 9500;
const ROW_H = 60;
const PANEL_H = 196;

function HeroSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const run = useLoop(ref);
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [status, setStatus] = useState(0);
  const shown = reduce ? 4 : phase;

  useEffect(() => {
    if (!run) return;
    setPhase(0);
    const timers = PHASE_AT.slice(1).map((at, i) => setTimeout(() => setPhase(i + 1), at));
    const loop = setTimeout(() => setCycle((c) => c + 1), LOOP_MS);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(loop);
    };
  }, [run, cycle]);

  useTicker(run, 2600, () => setStatus((i) => (i + 1) % hero.statusLines.length));

  return (
    <div
      ref={ref}
      data-run={run}
      className="border-light relative overflow-hidden rounded-2xl bg-[oklch(0.18_0.034_257)] shadow-elevated"
      role="img"
      aria-label="Démonstration : Amnay détecte un appel d'offres, lit le dossier et le déclare éligible avec un score de 92."
    >
      <div className="flex items-center gap-2 border-b border-border/70 bg-navy/70 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="ms-3 font-mono text-[11px] text-muted-foreground">{hero.windowTitle}</span>
        <span className="ms-auto font-mono text-[9px] tracking-wider text-muted-foreground/70 uppercase">
          {hero.demoDataLabel}
        </span>
      </div>

      <div className="relative h-[408px] overflow-hidden" key={reduce ? "static" : cycle}>
        {tenderRows.map((row, i) => (
          <motion.div
            key={row.ref}
            className={cn(
              "absolute inset-x-0 flex items-center gap-3 border-b border-border/50 px-4",
              i === 0 && shown >= 1 && "bg-primary/[0.07]",
            )}
            style={{ top: i * ROW_H, height: ROW_H }}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{
              opacity: i > 0 && shown >= 1 ? 0.55 : 1,
              x: 0,
              y: i > 0 && shown >= 1 ? PANEL_H : 0,
            }}
            transition={{
              opacity: { delay: shown >= 1 ? 0 : 0.15 + i * 0.18, duration: 0.4 },
              x: { delay: 0.15 + i * 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            {i === 0 && shown >= 1 && (
              <motion.span
                className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-primary"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
              />
            )}
            <ScoreBadge score={row.score} />
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] text-primary/90">{row.ref}</p>
              <p className="truncate text-sm font-medium text-foreground">{row.title}</p>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              J-{row.deadlineDays}
            </span>
          </motion.div>
        ))}

        <AnimatePresence>
          {shown >= 1 && (
            <motion.div
              className="absolute inset-x-3 origin-top"
              style={{ top: ROW_H + 8, height: PANEL_H - 16 }}
              initial={reduce ? false : { opacity: 0, scaleY: 0.85 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <DetailPanel phase={shown} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 border-t border-border/70 bg-navy/70 px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
        <FileSearch className="size-3.5 shrink-0 text-primary" aria-hidden />
        <AnimatePresence mode="wait">
          <motion.span
            key={status}
            className="truncate"
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            {hero.statusLines[status]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

function DetailPanel({ phase }: { phase: number }) {
  const s = hero.sequence;
  const pageRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    if (phase < 2 || reduce) {
      el.textContent = String(phase < 2 ? 1 : s.readerStopPage);
      return;
    }
    if (phase > 2) return;
    const c = animate(1, s.readerStopPage, {
      duration: 1.9,
      ease: "easeInOut",
      onUpdate: (v) => (el.textContent = String(Math.round(v))),
    });
    return () => c.stop();
  }, [phase, reduce, s.readerStopPage]);

  return (
    <div className="grid h-full grid-cols-[1fr_auto] gap-3 rounded-xl border border-primary/25 bg-navy/80 p-3">
      {/* Lecteur */}
      <div className="flex min-w-0 flex-col">
        <p className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
          <ScanLine className="size-3 text-primary" aria-hidden />
          <span className="text-foreground">{s.reader}</span>
          <span className="truncate">· {s.readerFile}</span>
        </p>
        <p className="mt-0.5 font-mono text-[10px] text-primary">
          p. <span ref={pageRef}>1</span>/{s.readerPages}
        </p>
        <div className="relative mt-2 flex flex-1 gap-2 overflow-hidden">
          {[0, 1, 2].map((p) => (
            <div
              key={p}
              className={cn(
                "flex flex-1 flex-col gap-1.5 rounded-md bg-foreground/[0.06] p-2 transition-opacity",
                phase >= 2 ? "opacity-100" : "opacity-50",
              )}
            >
              {Array.from({ length: 8 }).map((_, l) => (
                <span
                  key={l}
                  className={cn(
                    "h-1 rounded-full",
                    p === 1 && l === 3 && phase >= 3 ? "bg-primary" : "bg-foreground/15",
                  )}
                  style={{ width: `${55 + ((l * 37 + p * 11) % 45)}%` }}
                />
              ))}
            </div>
          ))}
          {phase === 2 && (
            <span
              aria-hidden
              className="animate-scan absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-transparent via-primary/35 to-transparent"
              style={{ ["--scan-distance" as string]: "88px" }}
            >
              <span className="absolute inset-x-0 top-1/2 h-px bg-primary-glow shadow-[0_0_12px_2px_oklch(0.741_0.138_234.8/0.8)]" />
            </span>
          )}
        </div>
        <div className="mt-2 flex h-5 gap-1.5 overflow-hidden">
          {phase >= 3 &&
            s.facts.map((f, i) => (
              <motion.span
                key={f}
                className="truncate rounded-md bg-primary/12 px-1.5 py-0.5 font-mono text-[9px] text-primary"
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
              >
                {f}
              </motion.span>
            ))}
        </div>
      </div>

      {/* Score ring + verdict */}
      <div className="flex w-28 flex-col items-center justify-center gap-2">
        <ScoreRing value={phase >= 3 ? s.score : 0} />
        <div className="h-6">
          <AnimatePresence>
            {phase >= 4 && (
              <motion.span
                className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-semibold text-success ring-1 ring-success/40"
                initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 16 }}
              >
                <Check className="size-3" aria-hidden />
                {s.eligible}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ScoreRing({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    if (reduce || value === 0) {
      el.textContent = String(value);
      return;
    }
    const c = animate(0, value, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = String(Math.round(v))),
    });
    return () => c.stop();
  }, [value, reduce]);

  return (
    <div className="relative size-[84px]">
      <svg viewBox="0 0 84 84" className="size-full -rotate-90" aria-hidden>
        <circle
          cx="42"
          cy="42"
          r="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-foreground/10"
        />
        <motion.circle
          cx="42"
          cy="42"
          r="36"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          stroke="url(#ring-gradient)"
          initial={false}
          animate={{ pathLength: value / 100 }}
          transition={{ duration: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.723 0.192 149.6)" />
            <stop offset="100%" stopColor="oklch(0.741 0.138 234.8)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span ref={numRef} className="font-display text-2xl font-bold text-foreground tabular-nums">
          0
        </span>
        <span className="-mt-1 font-mono text-[9px] text-muted-foreground uppercase">
          {hero.sequence.scoreLabel}
        </span>
      </span>
    </div>
  );
}

/* ─────────────────────────── marquee ─────────────────────────── */

function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const run = useLoop(ref);
  const items = [...categories, ...categories];
  return (
    <div
      ref={ref}
      data-run={run}
      className="mask-fade-x relative mt-20 overflow-hidden border-y border-border/60 py-5"
      aria-label="Secteurs couverts"
    >
      <ul
        className="animate-marquee flex w-max gap-10"
        style={{ ["--marquee-duration" as string]: "55s" }}
      >
        {items.map((c, i) => (
          <li
            key={i}
            aria-hidden={i >= categories.length}
            className="flex items-center gap-10 font-mono text-sm tracking-[0.12em] whitespace-nowrap text-muted-foreground uppercase"
          >
            {c}
            <span className="text-primary/60" aria-hidden>
              ·
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
