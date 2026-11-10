import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Emblem } from "@/components/brand/Logo";
import { AppLink } from "@/components/shared/AppLink";
import { urls } from "@/config/site";
import { trialMicrocopy } from "@/content/common";
import { trialMeta, trialPage } from "@/content/demo";
import { routes } from "@/content/navigation";
import { buildTrialUrl, captureUtms } from "@/lib/tracking";

/** /essai — forwards to the trial app with stored UTMs / click IDs. */
export const Route = createFileRoute("/_landing/essai")({
  head: () => ({ meta: [{ title: trialMeta.title }] }),
  component: TrialRedirect,
});

function TrialRedirect() {
  const [href, setHref] = useState<string>(urls.trialUrl);

  useEffect(() => {
    // Capture params of this very visit first, so ads linking to /essai?utm_… keep them.
    captureUtms();
    const target = buildTrialUrl();
    setHref(target);
    const t = setTimeout(() => window.location.replace(target), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 pt-28 pb-20 text-center">
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0" />
      <div className="relative flex max-w-lg flex-col items-center">
        <span className="relative flex size-24 items-center justify-center">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary-glow motion-safe:animate-spin"
          />
          <Emblem alt="" aria-hidden className="size-14" />
        </span>
        <h1
          className="mt-8 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          aria-live="polite"
        >
          {trialPage.title}
        </h1>
        <p className="mt-4 text-muted-foreground">{trialPage.body}</p>
        <a
          href={href}
          className="btn-shine mt-8 inline-flex h-13 items-center gap-2 rounded-full bg-primary px-7 text-[15px] font-medium text-primary-foreground transition-colors hover:bg-primary-glow"
        >
          {trialPage.button}
          <ArrowRight className="size-4" aria-hidden />
        </a>
        <p className="mt-4 font-mono text-xs text-muted-foreground">{trialMicrocopy}</p>
        <AppLink
          href={routes.home}
          className="mt-10 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {trialPage.back}
        </AppLink>
      </div>
    </section>
  );
}
