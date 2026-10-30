import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildTrialUrl, pushDataLayer } from "@/lib/tracking";
import { Magnetic } from "./Magnetic";

type CtaProps = {
  children: ReactNode;
  className?: string;
  size?: "md" | "lg";
  /** Where the click came from, for the dataLayer event. */
  surface: string;
  /** Stretch to the full width of the parent. */
  block?: boolean;
};

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
} as const;

/** Primary trial CTA: magnetic on desktop, shine sweep on hover, UTMs appended. */
export function TrialCta({ children, className, size = "lg", surface, block }: CtaProps) {
  return (
    <Magnetic className={block ? "flex w-full" : "inline-flex"}>
      <a
        href={buildTrialUrl()}
        target="_blank"
        rel="noreferrer"
        data-cta="trial"
        onClick={() => pushDataLayer("cta_click", { cta: "trial", surface })}
        className={cn(
          "btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-primary font-medium text-primary-foreground shadow-[0_0_0_1px_oklch(0.82_0.12_230/0.5)_inset,0_10px_40px_-10px_oklch(0.681_0.147_238.6/0.8)] transition-colors hover:bg-primary-glow",
          sizes[size],
          block && "w-full",
          className,
        )}
      >
        {children}
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden
        />
      </a>
    </Magnetic>
  );
}

/** Secondary demo CTA: ghost pill with a light hairline border. */
export function DemoCta({ children, className, size = "lg", surface }: CtaProps) {
  return (
    <a
      href="#demo"
      data-cta="demo"
      onClick={() => pushDataLayer("cta_click", { cta: "demo", surface })}
      className={cn(
        "border-light inline-flex items-center justify-center gap-2 rounded-full bg-foreground/[0.03] font-medium text-foreground transition-colors hover:bg-foreground/[0.07]",
        sizes[size],
        className,
      )}
    >
      {children}
    </a>
  );
}
