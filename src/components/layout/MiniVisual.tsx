import type { MenuVisual } from "@/content/navigation";
import { cn } from "@/lib/utils";

const bar = "block rounded-full bg-foreground/15";

/** Tiny product-like drawings for the mega-menu entries (pure CSS, decorative). */
export function MiniVisual({ visual, className }: { visual: MenuVisual; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative flex h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-[oklch(0.18_0.034_257)] p-2 transition-colors group-hover:border-primary/50",
        className,
      )}
    >
      {renderVisual(visual)}
    </span>
  );
}

function renderVisual(visual: MenuVisual) {
  switch (visual) {
    case "features":
      return (
        <span className="flex w-full flex-col gap-1.5">
          {[92, 81, 64].map((s, i) => (
            <span key={s} className="flex items-center gap-1">
              <span
                className={cn(
                  "h-2.5 w-4 rounded-[3px]",
                  i === 0 ? "bg-success/60" : i === 1 ? "bg-primary/60" : "bg-warning/60",
                )}
              />
              <span className={cn(bar, "h-1")} style={{ width: `${70 - i * 12}%` }} />
            </span>
          ))}
        </span>
      );
    case "agents":
      return (
        <span className="relative w-full">
          <span className="absolute top-1/2 right-1 left-1 h-px bg-primary/40" />
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={cn(
                "absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full ring-2 ring-[oklch(0.18_0.034_257)]",
                i === 2
                  ? "bg-primary-glow shadow-[0_0_8px_oklch(0.741_0.138_234.8)]"
                  : "bg-primary/50",
              )}
              style={{ left: `${4 + i * 21}%` }}
            />
          ))}
        </span>
      );
    case "server":
      return (
        <span className="flex w-full flex-col justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="flex h-2.5 items-center gap-1 rounded-sm bg-foreground/[0.08] px-1"
            >
              <span
                className={cn("size-1 rounded-full", i === 0 ? "bg-success" : "bg-primary/60")}
              />
              <span className={cn(bar, "h-0.5 flex-1")} />
            </span>
          ))}
        </span>
      );
    case "studies":
      return (
        <span className="relative w-full">
          <svg viewBox="0 0 64 40" className="size-full">
            <path
              d="M2 32 C 12 18, 20 26, 30 14 S 50 8, 62 4"
              fill="none"
              stroke="oklch(0.741 0.138 234.8 / 0.8)"
              strokeWidth="1.5"
            />
            <path
              d="M2 38 C 14 28, 24 34, 34 24 S 52 18, 62 14"
              fill="none"
              stroke="oklch(0.741 0.138 234.8 / 0.35)"
              strokeWidth="1"
            />
            <circle cx="30" cy="14" r="2.5" fill="oklch(0.723 0.192 149.6)" />
          </svg>
        </span>
      );
    case "services":
      return (
        <span className="grid w-full grid-cols-3 gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "rounded-[3px]",
                i === 1 || i === 3 ? "bg-primary/50" : "bg-foreground/10",
              )}
            />
          ))}
        </span>
      );
    case "blog":
      return (
        <span className="flex w-full flex-col gap-1">
          <span className="h-3 w-full rounded-sm bg-primary/30" />
          <span className={cn(bar, "h-1 w-11/12")} />
          <span className={cn(bar, "h-1 w-3/4")} />
          <span className={cn(bar, "h-1 w-5/6")} />
        </span>
      );
    case "webinar":
      return (
        <span className="relative flex w-full items-center justify-center rounded-md bg-foreground/[0.06]">
          <span className="ms-0.5 size-0 border-y-[6px] border-s-[9px] border-y-transparent border-s-primary-glow" />
          <span className="absolute top-1 right-1 flex items-center gap-0.5 rounded-sm bg-destructive/80 px-1 font-mono text-[6px] text-foreground">
            LIVE
          </span>
        </span>
      );
    case "faq":
      return (
        <span className="flex w-full flex-col gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="flex items-center justify-between gap-1 border-b border-border/70 pb-1"
            >
              <span className={cn(bar, "h-1")} style={{ width: `${60 - i * 10}%` }} />
              <span className="font-mono text-[7px] leading-none text-primary">+</span>
            </span>
          ))}
        </span>
      );
  }
}
