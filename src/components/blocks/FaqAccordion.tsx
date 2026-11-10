import { useId, useMemo, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Search } from "lucide-react";
import { DemoCta } from "@/components/fx/Cta";
import { EmptyState } from "@/components/shared/Mascot";
import { MoreLink } from "@/components/shared/MoreLink";
import { SectionHeader, type SectionHeading } from "@/components/shared/SectionHeader";
import { botImages } from "@/config/images";
import { cta } from "@/content/common";
import type { FaqCategory, FaqItem } from "@/content/faq";
import { cn } from "@/lib/utils";

type FaqAccordionProps = {
  heading: SectionHeading;
  items: FaqItem[];
  /** Line under the heading. */
  lead?: string;
  link?: { label: string; href: string };
  /** Show the demo button in the sticky aside. */
  demo?: boolean;
};

/** Sticky heading on the left, big-type accordion on the right. */
export function FaqAccordion({ heading, items, lead, link, demo = true }: FaqAccordionProps) {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeader {...heading} />
            {lead && <p className="mt-6 max-w-sm text-muted-foreground">{lead}</p>}
            <div className="mt-8 flex flex-col items-start gap-6">
              {demo && <DemoCta surface="faq">{cta.demo}</DemoCta>}
              {link && <MoreLink href={link.href} label={link.label} />}
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}

export function FaqList({
  items,
  numbered = true,
  tag,
}: {
  items: FaqItem[];
  numbered?: boolean;
  /** Small label shown next to flagged items. */
  tag?: { ids: readonly string[]; label: string };
}) {
  return (
    <Accordion.Root type="single" collapsible className="border-t border-border">
      {items.map((item, i) => (
        <Accordion.Item key={item.id} value={item.id} className="border-b border-border">
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center gap-5 py-6 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring sm:gap-6 sm:py-7">
              {numbered && (
                <span className="font-mono text-xs text-primary/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <span className="flex-1">
                <span className="block font-display text-[clamp(18px,2.2vw,26px)] leading-tight font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary-glow">
                  {item.q}
                </span>
                {tag?.ids.includes(item.id) && (
                  <span className="mt-2 inline-flex rounded-full bg-primary/12 px-2 py-0.5 font-mono text-[10px] tracking-wider text-primary uppercase">
                    {tag.label}
                  </span>
                )}
              </span>
              {/* plus → minus: the vertical bar rotates flat */}
              <span
                aria-hidden
                className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:border-primary/50 group-data-[state=open]:border-primary/60 group-data-[state=open]:bg-primary/10"
              >
                <span className="absolute h-px w-3.5 bg-foreground" />
                <span className="absolute h-3.5 w-px bg-foreground transition-transform duration-300 ease-out group-data-[state=open]:rotate-90" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="data-[state=open]:animate-fade-up overflow-hidden">
            <p
              className={cn(
                "max-w-2xl pb-8 text-base leading-relaxed text-muted-foreground sm:text-lg",
                numbered && "ps-10",
              )}
            >
              {item.a}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

/* ─────────────────────────── /faq explorer ─────────────────────────── */

type FaqExplorerProps = {
  categories: FaqCategory[];
  labels: {
    searchLabel: string;
    searchPlaceholder: string;
    allLabel: string;
    empty: string;
    objectionTag: string;
  };
  objectionIds: readonly string[];
};

const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Category rail + live search across every question and answer. */
export function FaqExplorer({ categories, labels, objectionIds }: FaqExplorerProps) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");
  const inputId = useId();

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return categories
      .filter((c) => cat === "all" || c.id === cat)
      .map((c) => ({
        ...c,
        items: q ? c.items.filter((i) => normalize(`${i.q} ${i.a}`).includes(q)) : c.items,
      }))
      .filter((c) => c.items.length > 0);
  }, [categories, cat, query]);

  const tabs = [
    { id: "all", label: labels.allLabel },
    ...categories.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <div className="lg:sticky lg:top-28">
          <label htmlFor={inputId} className="sr-only">
            {labels.searchLabel}
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className="h-12 w-full rounded-full border border-border bg-background/60 ps-11 pe-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
            />
          </div>
          <div
            role="group"
            aria-label={labels.allLabel}
            className="mt-6 flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:overflow-visible"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={cat === t.id}
                onClick={() => setCat(t.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-start text-sm whitespace-nowrap transition-colors lg:rounded-lg",
                  cat === t.id
                    ? "bg-primary/12 text-foreground lg:bg-transparent lg:text-primary-glow lg:shadow-[inset_2px_0_0_var(--color-primary)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="lg:col-span-9" aria-live="polite">
        {filtered.length === 0 ? (
          <EmptyState
            image={botImages.perdu}
            text={labels.empty}
            className="border-t border-border py-10"
          />
        ) : (
          filtered.map((c) => (
            <section key={c.id} id={c.id} className="mb-14 scroll-mt-28 last:mb-0">
              <h2 className="section-label mb-4">{c.label}</h2>
              <FaqList
                items={c.items}
                numbered={false}
                tag={{ ids: objectionIds, label: labels.objectionTag }}
              />
            </section>
          ))
        )}
      </div>
    </div>
  );
}
