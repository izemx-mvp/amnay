import { Logo } from "@/components/brand/Logo";
import { TrialCta } from "@/components/fx/Cta";
import { AppLink } from "@/components/shared/AppLink";
import { cta, header } from "@/content/common";
import { routes } from "@/content/navigation";

/** Minimal header for ad landing pages: logo + one CTA. */
export function LandingHeader() {
  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-border">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <AppLink href={routes.home} className="flex items-center" aria-label={header.homeLabel}>
          <Logo theme="dark" priority className="h-7 w-auto sm:h-8" />
        </AppLink>
        <TrialCta size="sm" surface="landing_header">
          {cta.trial}
        </TrialCta>
      </div>
    </header>
  );
}
