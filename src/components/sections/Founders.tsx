import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Emblem } from "@/components/brand/Logo";
import { useLoop } from "@/components/fx/hooks";
import { Magnetic } from "@/components/fx/Magnetic";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { founders } from "@/config/site";
import { foundersCopy as copy } from "@/content/home";
import { pushDataLayer } from "@/lib/tracking";
import { cn } from "@/lib/utils";

type Left = { days: number; hours: number; minutes: number };

function timeLeft(target: number): Left {
  const ms = Math.max(0, target - Date.now());
  const m = Math.floor(ms / 60000);
  return { days: Math.floor(m / 1440), hours: Math.floor((m % 1440) / 60), minutes: m % 60 };
}

/** Countdown computed on the client only, so SSR and hydration always agree. */
function useCountdown(iso: string) {
  const [left, setLeft] = useState<Left | null>(null);
  useEffect(() => {
    const target = new Date(iso).getTime();
    const update = () => setLeft(timeLeft(target));
    update();
    const t = setInterval(update, 15000);
    return () => clearInterval(t);
  }, [iso]);
  return left;
}

export function Founders() {
  const ref = useRef<HTMLDivElement>(null);
  const run = useLoop(ref);
  const left = useCountdown(founders.deadlineISO);
  const taken = founders.placesTotal - founders.placesRemaining;
  const serial = `${String(taken + 1).padStart(2, "0")}/${founders.placesTotal}`;

  return (
    <section id={copy.id} className="relative overflow-hidden py-28 lg:py-36">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index={copy.index}
          label={copy.label}
          title={copy.title}
          highlight={copy.highlight}
        />

        <div ref={ref} data-run={run} className="relative mt-16">
          <div
            aria-hidden
            className="absolute inset-x-[10%] -inset-y-6 rounded-full bg-primary/20 blur-[100px]"
          />

          {/* the pass */}
          <div className="relative grid overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,oklch(0.24_0.06_252),oklch(0.17_0.035_258)_55%,oklch(0.21_0.05_245))] shadow-[0_40px_100px_-40px_oklch(0.681_0.147_238.6/0.8)] ring-1 ring-primary/30 lg:grid-cols-[1fr_320px]">
            <div
              aria-hidden
              className="grid-fade pointer-events-none absolute inset-0 opacity-50"
            />

            {/* main */}
            <div className="relative p-7 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                <span>{copy.passLabel}</span>
                <span className="text-primary">
                  {copy.serialPrefix} {serial}
                </span>
              </div>

              <p className="mt-8 font-display text-[clamp(36px,5vw,64px)] leading-none font-bold tracking-[-0.03em] text-foreground">
                {founders.discountLabel}
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {[founders.priceGuarantee, founders.exchange, copy.planNote].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <Check className="size-4 text-primary" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-10 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-end">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                    {copy.countdownLabel}
                  </p>
                  <div className="mt-3 flex gap-3" aria-live="off">
                    <Segment value={left?.days} digits={3} label={copy.units.days} />
                    <Segment value={left?.hours} digits={2} label={copy.units.hours} />
                    <Segment value={left?.minutes} digits={2} label={copy.units.minutes} />
                  </div>
                </div>
                <PlacesBar />
              </div>
            </div>

            {/* stub, separated by a perforated edge */}
            <div className="relative flex flex-col items-center justify-center gap-6 border-t border-dashed border-primary/30 p-8 lg:border-t-0 lg:border-s">
              {/* notches */}
              <span
                aria-hidden
                className="absolute -top-4 -start-4 hidden size-8 rounded-full bg-background lg:block"
              />
              <span
                aria-hidden
                className="absolute -bottom-4 -start-4 hidden size-8 rounded-full bg-background lg:block"
              />

              <div className="relative size-36 overflow-hidden rounded-full bg-navy/60 p-6 ring-1 ring-primary/30">
                <Emblem alt="" aria-hidden className="size-full object-contain" />
                {/* hologram shimmer */}
                <span
                  aria-hidden
                  className="animate-shimmer motion-hide absolute inset-y-[-30%] left-0 w-1/2 bg-[linear-gradient(90deg,transparent,oklch(0.85_0.12_200/0.45),oklch(0.85_0.12_320/0.35),transparent)] mix-blend-screen"
                />
              </div>
              <Magnetic>
                <a
                  href="#demo"
                  data-cta="founders"
                  onClick={() => pushDataLayer("cta_click", { cta: "founders" })}
                  className="btn-shine inline-flex h-12 items-center rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-transform hover:scale-[1.02]"
                >
                  {copy.cta}
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Segment({
  value,
  digits,
  label,
}: {
  value: number | undefined;
  digits: number;
  label: string;
}) {
  const reduce = useReducedMotion();
  const text = value === undefined ? "–".repeat(digits) : String(value).padStart(digits, "0");
  return (
    <div className="text-center">
      <div className="flex gap-1">
        {text.split("").map((d, i) => (
          <span
            key={i}
            className="relative flex h-14 w-10 items-center justify-center overflow-hidden rounded-lg bg-background/70 font-mono text-3xl font-semibold text-foreground ring-1 ring-border"
          >
            <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-border/80" />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={d}
                initial={reduce ? false : { y: "-100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {d}
              </motion.span>
            </AnimatePresence>
          </span>
        ))}
      </div>
      <p className="mt-2 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
        {label}
      </p>
    </div>
  );
}

function PlacesBar() {
  const reduce = useReducedMotion();
  const taken = founders.placesTotal - founders.placesRemaining;
  return (
    <div>
      <p className="font-mono text-xs text-foreground">
        {copy.placesLabel
          .replace("{n}", String(founders.placesRemaining))
          .replace("{total}", String(founders.placesTotal))}
      </p>
      <div
        className="mt-3 grid grid-cols-[repeat(25,minmax(0,1fr))] gap-1 sm:grid-cols-[repeat(50,minmax(0,1fr))]"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={founders.placesTotal}
        aria-valuenow={taken}
        aria-label={copy.placesLabel
          .replace("{n}", String(founders.placesRemaining))
          .replace("{total}", String(founders.placesTotal))}
      >
        {Array.from({ length: founders.placesTotal }).map((_, i) => (
          <motion.span
            key={i}
            className={cn(
              "h-5 rounded-[3px]",
              i < taken
                ? "bg-gradient-to-t from-primary to-primary-glow shadow-[0_0_8px_oklch(0.681_0.147_238.6/0.6)]"
                : "bg-foreground/10",
            )}
            initial={reduce ? false : { opacity: 0, scaleY: 0.3 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.012, duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
