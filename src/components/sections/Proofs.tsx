import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Check, Quote, ScanLine, Sparkles } from "lucide-react";
import { useLoop, useTicker } from "@/components/fx/hooks";
import { Spotlight } from "@/components/fx/Spotlight";
import { TypeWriter } from "@/components/fx/TypeWriter";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { plans, pricing, pricingCopy, proofs } from "@/content/home";
import { cn } from "@/lib/utils";
import { frNumber } from "@/components/fx/Ticker";

const [citation, scans, eligibility, editor, price] = proofs.cards;

export function Proofs() {
  const ref = useRef<HTMLDivElement>(null);
  const run = useLoop(ref);

  return (
    <section id={proofs.id} className="relative py-28 lg:py-36">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index={proofs.index}
          label={proofs.label}
          title={proofs.title}
          highlight={proofs.highlight}
        />

        <div
          ref={ref}
          data-run={run}
          className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[minmax(250px,auto)_minmax(250px,auto)_auto]"
        >
          {citation && (
            <Tile
              className="md:col-span-2 lg:row-span-2"
              title={citation.title}
              body={citation.body}
            >
              <CitationVisual run={run} />
            </Tile>
          )}
          {scans && (
            <Tile className="md:col-span-2" title={scans.title} body={scans.body}>
              <ScanVisual />
            </Tile>
          )}
          {eligibility && (
            <Tile title={eligibility.title} body={eligibility.body}>
              <ChecklistVisual run={run} />
            </Tile>
          )}
          {price && (
            <Tile title={price.title} body={price.body}>
              <PriceVisual run={run} />
            </Tile>
          )}
          {editor && (
            <Tile
              className="md:col-span-2 lg:col-span-4"
              title={editor.title}
              body={editor.body}
              wide
            >
              <EditorVisual run={run} />
            </Tile>
          )}
        </div>
      </div>
    </section>
  );
}

function Tile({
  children,
  title,
  body,
  className,
  wide,
}: {
  children: ReactNode;
  title: string;
  body: string;
  className?: string;
  wide?: boolean;
}) {
  return (
    <Spotlight
      className={cn(
        "border-light flex rounded-3xl bg-[oklch(0.175_0.032_257/0.7)]",
        wide ? "flex-col lg:flex-row-reverse lg:items-center" : "flex-col",
        className,
      )}
    >
      <div className={cn("relative z-10 flex-1 p-5", wide && "lg:w-3/5 lg:flex-none")}>
        {children}
      </div>
      <div className={cn("relative z-10 p-6 pt-2", wide && "lg:flex-1 lg:p-10")}>
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </Spotlight>
  );
}

/* PDF page with a pulsing citation highlight. */
function CitationVisual({ run }: { run: boolean }) {
  const sample = proofs.cards[0]?.sample as { file: string; page: string; quote: string } | null;
  return (
    <div className="relative flex h-full min-h-[300px] items-center justify-center">
      <div className="relative w-[78%] max-w-sm rotate-[-2deg] rounded-md bg-[oklch(0.96_0.008_250)] p-6 shadow-[0_30px_60px_-20px_oklch(0_0_0/0.6)]">
        <div className="flex justify-between font-mono text-[9px] text-[oklch(0.45_0.03_258)]">
          <span>{sample?.file}</span>
          <span>{sample?.page}</span>
        </div>
        <div className="mt-4 space-y-2">
          {[92, 100, 84, 96, 70, 100, 88, 60, 94, 78].map((w, i) => (
            <div key={i} className="relative h-1.5" style={{ width: `${w}%` }}>
              <span className="absolute inset-0 rounded-full bg-[oklch(0.25_0.03_258/0.18)]" />
              {(i === 4 || i === 5) && (
                <span className="animate-pulse-hl absolute -inset-1 rounded-sm bg-primary/45" />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* answer bubble pointing at the source */}
      <motion.div
        className="border-light absolute right-2 bottom-4 max-w-[70%] rounded-2xl bg-navy/95 p-3.5 shadow-elevated sm:right-6"
        animate={run ? { y: [0, -6, 0] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="flex items-start gap-1.5 text-xs text-foreground">
          <Quote className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden />
          {sample?.quote}
        </p>
        <p className="mt-2 inline-flex rounded-md bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] text-primary">
          {sample?.file} · {sample?.page}
        </p>
      </motion.div>
    </div>
  );
}

/* Arabic scan being OCR'd: scan line + extracted French. */
function ScanVisual() {
  const sample = proofs.cards[1]?.sample as { file: string; pages: string; lang: string } | null;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="relative overflow-hidden rounded-lg bg-[oklch(0.9_0.012_85)] p-4 text-[oklch(0.3_0.02_60)] contrast-125 grayscale-[0.3]">
        <p className="font-mono text-[9px] opacity-60">{sample?.file}</p>
        <p dir="rtl" lang="ar" className="mt-3 text-[15px] leading-loose font-medium blur-[0.3px]">
          {proofs.scanArabic}
        </p>
        <div className="mt-2 space-y-1.5" dir="rtl">
          {[90, 70, 84].map((w, i) => (
            <span
              key={i}
              className="block h-1 rounded-full bg-current/25"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        <span
          aria-hidden
          className="animate-scan absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
          style={{ ["--scan-distance" as string]: "150px" }}
        >
          <span className="absolute inset-x-0 top-1/2 h-px bg-primary shadow-[0_0_10px_2px_oklch(0.681_0.147_238.6/0.7)]" />
        </span>
      </div>
      <div className="rounded-lg bg-navy/70 p-4">
        <p className="flex items-center gap-1.5 font-mono text-[10px] text-primary">
          <ScanLine className="size-3" aria-hidden />
          OCR · {sample?.lang} · {sample?.pages}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-foreground">{proofs.scanFrench}</p>
      </div>
    </div>
  );
}

/* Eligibility checklist ticking items one by one. */
function ChecklistVisual({ run }: { run: boolean }) {
  const reduce = useReducedMotion();
  const total = proofs.checklist.length;
  const [n, setN] = useState(reduce ? total : 0);
  useTicker(run, 650, () => setN((v) => (v >= total + 3 ? 0 : v + 1)));
  const done = reduce ? total : Math.min(n, total);

  return (
    <ul className="space-y-2">
      {proofs.checklist.map((item, i) => {
        const checked = i < done;
        return (
          <li key={item.label} className="flex items-center gap-2.5 text-[13px]">
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-md border transition-all duration-300",
                checked
                  ? item.ok
                    ? "scale-100 border-success/50 bg-success/15 text-success"
                    : "border-warning/50 bg-warning/15 text-warning"
                  : "scale-90 border-border text-transparent",
              )}
            >
              {item.ok ? <Check className="size-3" /> : <AlertTriangle className="size-3" />}
            </span>
            <span className={checked ? "text-foreground" : "text-muted-foreground/60"}>
              {item.label}
            </span>
            {!item.ok && checked && (
              <span className="ms-auto font-mono text-[10px] text-warning">
                {proofs.checklistTodo}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* Price tag flipping between price and trial terms. */
function PriceVisual({ run }: { run: boolean }) {
  const starter = plans[0];
  const [back, setBack] = useState(false);
  useTicker(run, 3200, () => setBack((b) => !b));
  return (
    <div
      className="flex h-full min-h-[150px] items-center justify-center"
      style={{ perspective: 800 }}
    >
      <motion.div
        className="relative h-28 w-full max-w-[220px] cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: back ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onHoverStart={() => setBack((b) => !b)}
        aria-hidden
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.55_0.15_245)] text-primary-foreground shadow-glow"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-70">
            {proofs.priceFrom}
          </span>
          <span className="font-display text-3xl font-bold tracking-tight">
            {frNumber(starter?.monthly ?? 0)}
          </span>
          <span className="font-mono text-[11px]">
            {pricing.currencyLabel}
            {pricingCopy.perMonth}
          </span>
        </div>
        <div
          className="border-light absolute inset-0 flex items-center justify-center rounded-2xl bg-navy px-4 text-center text-sm font-medium text-foreground"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {proofs.priceBack}
        </div>
      </motion.div>
    </div>
  );
}

/* Editor writing a new paragraph in the style of past mémoires. */
function EditorVisual({ run }: { run: boolean }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg bg-foreground/[0.04] p-4">
        <p className="font-mono text-[10px] text-muted-foreground uppercase">
          {proofs.editorSource}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground italic">
          « {proofs.editorSourceText} »
        </p>
      </div>
      <div className="rounded-lg bg-navy/70 p-4 ring-1 ring-primary/25">
        <p className="flex items-center gap-1.5 font-mono text-[10px] text-primary uppercase">
          <Sparkles className="size-3" aria-hidden />
          Rédacteur
        </p>
        <p className="mt-2 min-h-[4.5em] text-sm leading-relaxed text-foreground">
          <TypeWriter text={proofs.editorText} active={run} speed={30} loopAfter={2600} />
        </p>
      </div>
    </div>
  );
}
