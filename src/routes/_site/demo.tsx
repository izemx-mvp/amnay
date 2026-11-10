import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { BookingArea, DemoForm } from "@/components/blocks/DemoForm";
import { RevealWords } from "@/components/fx/RevealWords";
import { MascotImage } from "@/components/shared/Mascot";
import { botImages } from "@/config/images";
import { demoFormCopy } from "@/content/blocks";
import { demoMeta, demoPage } from "@/content/demo";
import { getSegment } from "@/content/segments";
import { fill } from "@/lib/format";

type DemoSearch = { offre?: string; segment?: string };

export const Route = createFileRoute("/_site/demo")({
  validateSearch: (search: Record<string, unknown>): DemoSearch => ({
    ...(typeof search["offre"] === "string" ? { offre: search["offre"] } : {}),
    ...(typeof search["segment"] === "string" ? { segment: search["segment"] } : {}),
  }),
  head: () => ({ meta: [{ title: demoMeta.title }] }),
  component: DemoRoute,
});

function DemoRoute() {
  const { offre, segment } = Route.useSearch();
  const [slot, setSlot] = useState<string | null>(null);

  const offerName = offre ? (demoPage.offerLabels[offre] ?? offre) : undefined;
  const segmentName = segment ? (getSegment(segment)?.name ?? segment) : undefined;
  const contextLabels = [
    offerName && fill(demoFormCopy.offerTag, { offre: offerName }),
    segmentName && fill(demoFormCopy.segmentTag, { segment: segmentName }),
  ].filter((l): l is string => Boolean(l));

  return (
    <section className="relative overflow-hidden pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-[-10%] size-[800px] rounded-full bg-[radial-gradient(circle,oklch(0.681_0.147_238.6/0.2),transparent_62%)]"
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        {/* value */}
        <div className="lg:col-span-6">
          <div className="flex items-end justify-between gap-4">
            <p className="section-label pb-6">{demoPage.label}</p>
            <MascotImage
              image={botImages.salut}
              priority
              float
              sizes="(min-width: 1024px) 192px, 144px"
              className="-mt-14 -mb-8 w-36 shrink-0 sm:w-40 lg:w-48"
            />
          </div>
          <RevealWords
            as="h1"
            immediate
            text={demoPage.pitch}
            highlight={demoPage.pitchHighlight}
            className="mt-6 font-display text-[clamp(32px,4.6vw,56px)] leading-[1.05] font-bold tracking-[-0.03em] text-foreground"
          />
          {offerName && (
            <p className="mt-6 inline-flex rounded-full bg-primary/12 px-3 py-1.5 font-mono text-xs text-primary">
              {fill(demoPage.offerBanner, { offre: offerName })}
            </p>
          )}
          <p className="section-label mt-10 text-muted-foreground">{demoPage.seeLabel}</p>
          <ol className="mt-4 space-y-4">
            {demoPage.bullets.map((b, i) => (
              <li key={b} className="flex gap-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-xs text-primary ring-1 ring-primary/30">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-foreground">{b}</span>
              </li>
            ))}
          </ol>

          <p className="section-label mt-12 text-muted-foreground">{demoPage.bookingTitle}</p>
          <div className="mt-4 max-w-md">
            <BookingArea slot={slot} onSlot={setSlot} />
          </div>
        </div>

        {/* form */}
        <div className="lg:col-span-6 lg:ps-6">
          <div className="lg:sticky lg:top-28">
            <p className="mb-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <Check className="size-3.5 text-success" aria-hidden />
              {demoPage.formTitle}
            </p>
            <DemoForm
              slot={slot}
              context={{ ...(offre ? { offre } : {}), ...(segment ? { segment } : {}) }}
              contextLabels={contextLabels}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
