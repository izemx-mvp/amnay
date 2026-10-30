import type { ReactNode } from "react";
import { RevealWords } from "@/components/fx/RevealWords";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  highlight?: readonly string[];
  className?: string;
  children?: ReactNode;
};

/** Mono index label ("02 — LE PROBLÈME") + H2 revealed word by word. */
export function SectionHeader({
  index,
  label,
  title,
  highlight,
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="section-label flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary" aria-hidden />
        {index} — {label}
      </p>
      <RevealWords
        text={title}
        highlight={highlight ?? []}
        className="h2-display mt-5 text-foreground"
      />
      {children}
    </div>
  );
}
