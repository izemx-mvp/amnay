import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileSearch } from "lucide-react";
import { ScoreBadge } from "@/components/shared/ScoreBadge";
import { hero, tenderRows } from "@/content/home";

/** Animated "app.amnay — Daily Brief" window: rows appear one by one,
 *  scores count up, a status line loops the agents at work. */
export function AppWindow({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(
      () => setStatusIndex((i) => (i + 1) % hero.statusLines.length),
      2600,
    );
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div
      className={
        "overflow-hidden rounded-2xl border border-border bg-surface shadow-elevated " +
        (className ?? "")
      }
      aria-label={hero.windowTitle}
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-navy/60 px-4 py-3">
        <span className="size-2.5 rounded-full bg-destructive/60" aria-hidden />
        <span className="size-2.5 rounded-full bg-warning/60" aria-hidden />
        <span className="size-2.5 rounded-full bg-success/60" aria-hidden />
        <span className="ms-3 font-mono text-xs text-muted-foreground">
          {hero.windowTitle}
        </span>
      </div>

      {/* rows */}
      <ul className="divide-y divide-border/60">
        {tenderRows.map((row, i) => (
          <motion.li
            key={row.ref}
            className="flex items-center gap-3 px-4 py-3"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.28, duration: 0.4, ease: "easeOut" }}
          >
            <ScoreBadge score={row.score} countUp />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-primary/90">{row.ref}</span>
              </div>
              <p className="truncate text-sm font-medium text-foreground">{row.title}</p>
              <p className="text-xs text-muted-foreground">{row.buyer}</p>
            </div>
            <span className="font-mono text-xs text-muted-foreground" title="Jours restants">
              J-{row.deadlineDays}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* status line */}
      <div className="flex items-center justify-between gap-3 border-t border-border bg-navy/60 px-4 py-2.5">
        <span className="flex min-w-0 items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <FileSearch className="size-3.5 shrink-0 text-primary" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.span
              key={statusIndex}
              className="truncate"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {hero.statusLines[statusIndex]}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="shrink-0 text-[10px] uppercase tracking-wide text-muted-foreground/70">
          {hero.demoDataLabel}
        </span>
      </div>
    </div>
  );
}
