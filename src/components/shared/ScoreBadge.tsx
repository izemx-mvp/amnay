import { cn } from "@/lib/utils";

/** Score badge: green ≥ 90, blue ≥ 75, amber ≥ 65, red below. */
export function ScoreBadge({ score, className }: { score: number; className?: string }) {
  const tone =
    score >= 90
      ? "bg-success/15 text-success border-success/30"
      : score >= 75
        ? "bg-primary/15 text-primary border-primary/30"
        : score >= 65
          ? "bg-warning/15 text-warning border-warning/30"
          : "bg-destructive/15 text-destructive border-destructive/30";
  return (
    <span
      className={cn(
        "inline-flex h-8 min-w-12 items-center justify-center rounded-lg border px-2 font-mono text-sm font-medium tabular-nums",
        tone,
        className,
      )}
    >
      {score}
    </span>
  );
}
