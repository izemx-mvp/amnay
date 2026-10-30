import * as Accordion from "@radix-ui/react-accordion";
import { DemoCta } from "@/components/fx/Cta";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { faq, hero } from "@/content/home";

export function Faq() {
  return (
    <section id={faq.id} className="relative py-28 lg:py-36">
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              index={faq.index}
              label={faq.label}
              title={faq.title}
              highlight={faq.highlight}
            />
            <p className="mt-6 max-w-sm text-muted-foreground">{faq.demoPrompt}</p>
            <div className="mt-8">
              <DemoCta surface="faq">{hero.secondaryCta}</DemoCta>
            </div>
          </div>
        </div>

        <Accordion.Root type="single" collapsible className="border-t border-border lg:col-span-7">
          {faq.items.map((item, i) => (
            <Accordion.Item key={item.q} value={`q${i}`} className="border-b border-border">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center gap-6 py-7 text-start">
                  <span className="font-mono text-xs text-primary/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-display text-[clamp(20px,2.4vw,28px)] leading-tight font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary-glow">
                    {item.q}
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
                <p className="max-w-2xl pb-8 ps-10 text-lg leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
