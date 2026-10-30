import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ProductFrameProps = {
  title: string;
  children: ReactNode;
  className?: string;
  /** Right side of the title bar. */
  meta?: ReactNode;
};

/** App-window chrome used by every product screen on the page. */
export function ProductFrame({ title, children, className, meta }: ProductFrameProps) {
  return (
    <div
      className={cn(
        "border-light overflow-hidden rounded-2xl bg-[oklch(0.18_0.034_257)] shadow-elevated",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/70 bg-navy/70 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-foreground/15" aria-hidden />
        <span className="size-2.5 rounded-full bg-foreground/15" aria-hidden />
        <span className="size-2.5 rounded-full bg-foreground/15" aria-hidden />
        <span className="ms-3 truncate font-mono text-[11px] text-muted-foreground">{title}</span>
        {meta && <span className="ms-auto shrink-0">{meta}</span>}
      </div>
      {children}
    </div>
  );
}

/** Small "sample data" tag so mock screens are never mistaken for real numbers. */
export function SampleTag({ children = "Données d'exemple" }: { children?: ReactNode }) {
  return (
    <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[9px] tracking-wider text-muted-foreground/80 uppercase">
      {children}
    </span>
  );
}
