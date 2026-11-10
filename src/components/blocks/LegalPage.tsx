import { AlertTriangle } from "lucide-react";
import { contacts } from "@/config/site";
import { legalCopy as copy, type LegalPage as LegalPageData } from "@/content/legal";

/** Long-form legal layout: validation banner, sticky table of contents, sections. */
export function LegalPage({ page }: { page: LegalPageData }) {
  return (
    <div className="relative pt-28 pb-24 lg:pt-36">
      <div
        aria-hidden
        className="grid-fade pointer-events-none absolute inset-x-0 top-0 h-[480px]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <p className="section-label">{copy.label}</p>
        <h1 className="mt-4 font-display text-[clamp(36px,5vw,64px)] leading-[1.02] font-bold tracking-[-0.03em] text-foreground">
          {page.title}
        </h1>
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          {copy.updatedLabel} {page.updated}
        </p>

        <div
          role="note"
          className="mt-8 flex max-w-3xl gap-3 rounded-2xl border border-warning/40 bg-warning/10 p-4"
        >
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden />
          <div>
            <p className="font-semibold text-foreground">{copy.banner}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{copy.bannerNote}</p>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <nav aria-label={copy.tocTitle} className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="section-label text-muted-foreground">{copy.tocTitle}</p>
              <ol className="mt-4 space-y-1 border-s border-border">
                {page.sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ms-px block border-s border-transparent py-1.5 ps-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                    >
                      <span className="me-2 font-mono text-[10px] text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="max-w-3xl lg:col-span-9">
            {page.sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className="border-t border-border py-10 first:border-t-0 first:pt-0"
              >
                <h2 className="flex items-baseline gap-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                  <span className="font-mono text-xs text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {s.list && (
                  <ul className="mt-4 list-disc space-y-1.5 ps-5 text-muted-foreground marker:text-primary">
                    {s.list.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <p className="mt-6 border-t border-border pt-8 text-sm text-muted-foreground">
              {copy.contactTitle}{" "}
              <a
                href={`mailto:${contacts.email}`}
                className="text-primary underline-offset-4 hover:underline"
              >
                {contacts.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
