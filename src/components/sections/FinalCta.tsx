import { useRef } from "react";
import { Emblem } from "@/components/brand/Logo";
import { DemoCta, TrialCta } from "@/components/fx/Cta";
import { RevealWords } from "@/components/fx/RevealWords";
import { useLoop } from "@/components/fx/hooks";
import { finalCta, hero } from "@/content/home";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const run = useLoop(ref);

  return (
    <section ref={ref} data-run={run} className="relative overflow-hidden py-32 lg:py-44">
      {/* perspective grid flowing toward the horizon */}
      <div aria-hidden className="pointer-events-none absolute inset-0 [perspective:600px]">
        <div className="absolute inset-x-[-50%] bottom-[-10%] h-[70%] origin-bottom [transform:rotateX(62deg)] [mask-image:linear-gradient(to_top,black,transparent_85%)]">
          <div className="animate-grid-flow absolute inset-x-0 -top-16 bottom-0 bg-[linear-gradient(to_right,oklch(0.681_0.147_238.6/0.25)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.681_0.147_238.6/0.25)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
      </div>

      {/* rings converging on the emblem */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="animate-converge motion-hide absolute top-1/2 left-1/2 -ms-[350px] -mt-[350px] size-[700px] rounded-full border border-primary/40"
            style={{ animationDelay: `${i * 2}s` }}
          />
        ))}
        <span className="absolute top-1/2 left-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.681_0.147_238.6/0.35),transparent_65%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center sm:px-6">
        <Emblem
          alt=""
          aria-hidden
          className="size-20 drop-shadow-[0_0_30px_oklch(0.681_0.147_238.6/0.8)]"
        />
        <RevealWords
          text={finalCta.title}
          highlight={finalCta.highlight}
          className="mt-10 font-display text-[clamp(44px,8vw,112px)] leading-[0.98] font-bold tracking-[-0.04em] text-foreground"
        />
        <p className="mt-6 font-mono text-sm text-muted-foreground">{hero.microcopy}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <TrialCta surface="final">{finalCta.primary}</TrialCta>
          <DemoCta surface="final">{finalCta.secondary}</DemoCta>
        </div>
      </div>
    </section>
  );
}
