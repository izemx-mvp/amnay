import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, User } from "lucide-react";
import { WebinarForm } from "@/components/blocks/WebinarForm";
import { RevealWords } from "@/components/fx/RevealWords";
import { webinar } from "@/config/site";
import { webinarMeta, webinarPage as copy } from "@/content/webinaire";
import { frDate } from "@/lib/format";

export const Route = createFileRoute("/_site/webinaire")({
  head: () => ({ meta: [{ title: webinarMeta.title }] }),
  component: WebinarRoute,
});

function WebinarRoute() {
  const iso = webinar.nextSessionISO;
  const date = iso ? frDate(iso, { dateStyle: "full", timeStyle: "short" }) : copy.dateTbd;

  return (
    <section className="relative overflow-hidden pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[800px] rounded-full bg-[radial-gradient(circle,oklch(0.681_0.147_238.6/0.2),transparent_62%)]"
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="section-label">{copy.label}</p>
          <RevealWords
            as="h1"
            immediate
            text={copy.title}
            highlight={copy.highlight}
            className="mt-6 font-display text-[clamp(36px,5.6vw,72px)] leading-[1.02] font-bold tracking-[-0.03em] text-foreground"
          />
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{copy.lead}</p>

          {/* next session: broadcast-style slate */}
          <div className="border-light relative mt-10 overflow-hidden rounded-2xl bg-navy/60 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/90 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-foreground uppercase">
                <span
                  className="size-1.5 rounded-full bg-foreground motion-safe:animate-pulse"
                  aria-hidden
                />
                {copy.liveLabel}
              </span>
              <span className="section-label text-muted-foreground">{copy.nextLabel}</span>
            </div>
            <p className="mt-4 flex items-center gap-3 font-display text-2xl font-semibold text-foreground capitalize sm:text-3xl">
              <CalendarClock className="size-6 shrink-0 text-primary" aria-hidden />
              {date}
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">{copy.durationLabel}</p>
            {!iso && <p className="mt-3 text-sm text-muted-foreground">{copy.dateTbdNote}</p>}
          </div>

          {/* agenda as a timecode run-sheet */}
          <h2 className="section-label mt-14 text-muted-foreground">{copy.agendaTitle}</h2>
          <ol className="mt-4 border-t border-border">
            {copy.agenda.map((a) => (
              <li
                key={a.time}
                className="grid grid-cols-[64px_1fr] gap-4 border-b border-border py-5"
              >
                <span className="font-mono text-sm text-primary">{a.time}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{a.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="section-label mt-14 text-muted-foreground">{copy.speakerTitle}</h2>
          <div className="mt-4 flex items-center gap-4">
            <span className="flex size-16 items-center justify-center rounded-full border border-dashed border-border bg-foreground/[0.03]">
              <User className="size-6 text-muted-foreground" aria-hidden />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-foreground">
                {copy.speakerName}
              </p>
              <p className="text-sm text-muted-foreground">{copy.speakerRole}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="section-label mb-4 text-muted-foreground">{copy.formTitle}</p>
            <WebinarForm session={iso || "tbd"} labels={copy} />
          </div>
        </div>
      </div>
    </section>
  );
}
