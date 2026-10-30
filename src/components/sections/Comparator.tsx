import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Ticker, frNumber } from "@/components/fx/Ticker";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { comparator, comparatorCopy as copy } from "@/content/home";
import { cn } from "@/lib/utils";

type Mode = "charged" | "consultant";

export function Comparator() {
  const [mode, setMode] = useState<Mode>("charged");
  const [salary, setSalary] = useState<number>(comparator.charged.default);
  const [perDossier, setPerDossier] = useState<number>(comparator.consultant.default);
  const [dossiers, setDossiers] = useState<number>(comparator.consultant.dossiersDefault);

  const today = mode === "charged" ? salary : perDossier * dossiers;
  const amnay = comparator.amnayMonthly;
  const savings = Math.max(0, (today - amnay) * 12);

  return (
    <section id={copy.id} className="relative overflow-hidden py-28 lg:py-36">
      {/* full-bleed band of light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-navy/70 to-transparent"
      />
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index={copy.index}
          label={copy.label}
          title={copy.title}
          highlight={copy.highlight}
        />

        {/* versus */}
        <div className="mt-16 grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
          <div className="text-center md:text-end">
            <p className="section-label text-muted-foreground">{copy.today}</p>
            <p className="mt-3 font-display text-[clamp(52px,9vw,128px)] leading-none font-bold tracking-[-0.04em] text-foreground">
              <Ticker value={today} duration={0.6} />
            </p>
            <p className="mt-2 font-mono text-sm text-muted-foreground">{copy.perMonth}</p>
          </div>
          <div className="flex items-center justify-center">
            <span className="border-light flex size-16 items-center justify-center rounded-full bg-background font-mono text-sm text-primary">
              VS
            </span>
          </div>
          <div className="text-center md:text-start">
            <p className="section-label">{copy.amnay}</p>
            <p className="mt-3 font-display text-[clamp(52px,9vw,128px)] leading-none font-bold tracking-[-0.04em] text-gradient-blue">
              <Ticker value={amnay} />
            </p>
            <p className="mt-2 font-mono text-sm text-muted-foreground">
              {copy.perMonth} · {copy.amnayNote}
            </p>
          </div>
        </div>

        {/* controls */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div
            className="mx-auto flex w-fit rounded-full border border-border bg-background/60 p-1"
            role="group"
          >
            {(Object.keys(copy.modes) as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm transition-colors",
                  mode === m
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {mode === m && (
                  <motion.span
                    layoutId="cmp-mode"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{copy.modes[m]}</span>
              </button>
            ))}
          </div>

          <div className="mt-10 space-y-8">
            {mode === "charged" ? (
              <Range
                label={comparator.charged.unitLabel}
                value={salary}
                min={comparator.charged.min}
                max={comparator.charged.max}
                step={comparator.charged.step}
                onChange={setSalary}
                format={(v) => `${frNumber(v)} MAD`}
              />
            ) : (
              <>
                <Range
                  label={comparator.consultant.unitLabel}
                  value={perDossier}
                  min={comparator.consultant.min}
                  max={comparator.consultant.max}
                  step={comparator.consultant.step}
                  onChange={setPerDossier}
                  format={(v) => `${frNumber(v)} MAD`}
                />
                <Range
                  label={copy.dossiersLabel}
                  value={dossiers}
                  min={comparator.consultant.dossiersMin}
                  max={comparator.consultant.dossiersMax}
                  step={1}
                  onChange={setDossiers}
                  format={(v) => String(v)}
                />
              </>
            )}
          </div>
        </div>

        {/* giant savings */}
        <div className="mt-20 text-center">
          <p className="font-display text-[clamp(56px,12vw,176px)] leading-none font-bold tracking-[-0.05em] text-gradient-blue drop-shadow-[0_0_60px_oklch(0.681_0.147_238.6/0.35)]">
            <Ticker value={savings} duration={0.8} />
          </p>
          <p className="mt-4 font-mono text-sm tracking-[0.14em] text-foreground uppercase">
            {copy.savingsLabel}
          </p>
        </div>
      </div>
    </section>
  );
}

function Range({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm text-muted-foreground">
          {label}
        </label>
        <output htmlFor={id} className="font-mono text-lg font-semibold text-foreground">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="range-glow mt-3"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--p" as string]: `${pct}%` }}
      />
      <div className="flex justify-between font-mono text-[11px] text-muted-foreground/70">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}
