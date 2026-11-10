import { ArrowRight } from "lucide-react";
import { AppLink } from "@/components/shared/AppLink";
import { cn } from "@/lib/utils";

/** Inline "see more" link pointing to a deeper page. */
export function MoreLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <AppLink
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-primary uppercase transition-colors hover:text-primary-glow",
        className,
      )}
    >
      <span className="border-b border-primary/40 pb-0.5 group-hover:border-primary-glow">
        {label}
      </span>
      <ArrowRight
        className="size-3.5 transition-transform group-hover:translate-x-0.5"
        aria-hidden
      />
    </AppLink>
  );
}
