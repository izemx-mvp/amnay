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
import { heroImages } from "@/config/images";
import { heroStats } from "@/config/site";
import { marqueeLabel as defaultMarqueeLabel, sampleDataLabel } from "@/content/common";
import type { TenderRow } from "@/content/product";
import { cn } from "@/lib/utils";

/** Everything the hero needs; home and segment pages each provide their own. */
export type HeroData = {
  badge: string;
  title: string;
  titleHighlight: readonly string[];
  subtitle: string;
  primaryCta: string;
  secondaryCta?: string;
  microcopy: string;
  windowTitle: string;
  rows: readonly TenderRow[];
  statusLines: readonly string[];
  ariaLabel: string;
  sequence: {
    reader: string;
    readerFile: string;
    readerPages: number;
    readerStopPage: number;
    score: number;
    scoreLabel: string;
    eligible: string;
    facts: readonly string[];
  };
};

type HeroProps = {
  hero: HeroData;
  /** Sectors scrolling under the hero. */
  marquee: readonly string[];
  marqueeLabel?: string;
  /** Market figures under the CTAs (home only). */
  stats?: boolean;
  surface?: string;
  /**
   * Home: the duo illustration (user + his agent) as a full-bleed background on
   * desktop, and as a rounded image under the CTAs on smaller screens. The
   * animated product window is then rendered elsewhere (see AgentAtWork).
   */
  backdrop?: boolean;
};

/** Home / segment hero: headline + visual (illustration or animated window) + sector marquee. */
export function Hero({
  hero,
  marquee,
  marqueeLabel = defaultMarqueeLabel,
  stats = false,
  surface = "hero",
  backdrop = false,
}: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* light, not boxes */}
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0 -z-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] -z-30 size-[900px] rounded-full bg-[radial-gradient(circle,oklch(0.681_0.147_238.6/0.22),transparent_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -left-60 -z-30 size-[600px] rounded-full bg-[radial-gradient(circle,oklch(0.681_0.147_238.6/0.1),transparent_65%)]"
      />
      {!backdrop && (
        <Emblem
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-[-12%] -z-30 hidden w-[820px] max-w-none -translate-y-1/2 opacity-[0.045] select-none lg:block"
        />
      )}

      {/* Positioning context of the desktop backdrop: the hero minus the marquee. */}
      <div className="relative pt-28 lg:pt-36">
        {backdrop && <BackdropOverlays />}

        <div
          className={cn(
            "relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8",
            backdrop && "gap-10 lg:static lg:min-h-[640px]",
          )}
        >
          <div className="relative lg:col-span-6">
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
              <TrialCta surface={surface}>{hero.primaryCta}</TrialCta>
              {hero.secondaryCta && <DemoCta surface={surface}>{hero.secondaryCta}</DemoCta>}
            </div>
            <p className="mt-4 font-mono text-xs text-muted-foreground">{hero.microcopy}</p>

            {stats && (
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
            )}
          </div>

          {backdrop ? (
            <HeroBackdrop />
          ) : (
            <div className="lg:col-span-6">
              <HeroWindow hero={hero} />
            </div>
          )}
        </div>
      </div>

      <Marquee items={marquee} label={marqueeLabel} />
    </section>
  );
}

/* ─────────────────────────── duo backdrop ─────────────────────────── */

/**
 * One <picture>, two roles. < md: the portrait crop as a rounded block under the
 * CTAs. md–lg: the wide file, cropped on the characters, still a block (a tall
 * tablet hero would push them behind the text). ≥ lg: the wide file becomes the
 * full-bleed background, width-driven and anchored right so the characters
 * stay clear of the text column at every width.
 */
function HeroBackdrop() {
  const { desktop, mobile } = heroImages;
  return (
    <picture className="relative block overflow-hidden rounded-3xl ring-1 ring-border/60 lg:static lg:col-span-6 lg:overflow-visible lg:rounded-none lg:ring-0">
      <source
        media="(min-width: 768px)"
        srcSet={desktop.src}
        width={desktop.width}
        height={desktop.height}
      />
      <img
        src={mobile.src}
        width={mobile.width}
        height={mobile.height}
        alt={desktop.alt}
        loading="eager"
        fetchPriority="high"
        draggable={false}
        className="block h-auto w-full select-none md:aspect-[16/10] md:object-cover md:object-[right_center] lg:absolute lg:top-1/2 lg:right-0 lg:-z-20 lg:aspect-[2400/1340] lg:-translate-y-1/2 lg:[mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_78%,transparent)]"
      />
    </picture>
  );
}

/** Desktop only: left-to-right scrim for the text, and a fade into the marquee. */
function BackdropOverlays() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-background)_0%,var(--color-background)_38%,oklch(0.149_0.026_259.1/0.75)_46%,transparent_62%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background/80 to-transparent" />
    </div>
  );
}

/* ─────────────────────────── 3D window ─────────────────────────── */

/** Animated product window (agent reading a tender). Exported for the home "after" band. */
export function HeroWindow({ hero }: { hero: HeroData }) {
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
        <HeroSequence hero={hero} />
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

function HeroSequence({ hero }: { hero: HeroData }) {
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
      aria-label={hero.ariaLabel}
    >
      <div className="flex items-center gap-2 border-b border-border/70 bg-navy/70 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="ms-3 font-mono text-[11px] text-muted-foreground">{hero.windowTitle}</span>
        <span className="ms-auto font-mono text-[9px] tracking-wider text-muted-foreground/70 uppercase">
          {sampleDataLabel}
        </span>
      </div>

      <div className="relative h-[408px] overflow-hidden" key={reduce ? "static" : cycle}>
        {hero.rows.map((row, i) => (
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
              <DetailPanel phase={shown} hero={hero} />
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

function DetailPanel({ phase, hero }: { phase: number; hero: HeroData }) {
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
        <ScoreRing value={phase >= 3 ? s.score : 0} label={s.scoreLabel} />
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

function ScoreRing({ value, label }: { value: number; label: string }) {
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
        <span className="-mt-1 font-mono text-[9px] text-muted-foreground uppercase">{label}</span>
      </span>
    </div>
  );
}

/* ─────────────────────────── marquee ─────────────────────────── */

function Marquee({ items: base, label }: { items: readonly string[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const run = useLoop(ref);
  const items = [...base, ...base];
  return (
    <div
      ref={ref}
      data-run={run}
      className="mask-fade-x relative mt-20 overflow-hidden border-y border-border/60 py-5"
      aria-label={label}
    >
      <ul
        className="animate-marquee flex w-max gap-10"
        style={{ ["--marquee-duration" as string]: "55s" }}
      >
        {items.map((c, i) => (
          <li
            key={i}
            aria-hidden={i >= base.length}
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
