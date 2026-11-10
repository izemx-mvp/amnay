import { useRef, useState, type ReactNode } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useLoop, useTicker } from "@/components/fx/hooks";
import { MoreLink } from "@/components/shared/MoreLink";
import { SectionHeader, type SectionHeading } from "@/components/shared/SectionHeader";
import { steps as stepsContent } from "@/content/product";
import { cn } from "@/lib/utils";
import { screens } from "./StepScreens";

const steps = stepsContent.items;

type StepsStoryProps = {
  heading: SectionHeading;
  /** "story": scroll-pinned, screen changes as you scroll. "teaser": compact auto-playing tabs. */
  variant?: "story" | "teaser";
  link?: { label: string; href: string };
  id?: string;
  /** Optional block between the heading and the steps (home: the "after" contrast). */
  intro?: ReactNode;
};

/** The 4 steps (Détecter / Lire / Décider / Répondre et suivre) with product screens. */
export function StepsStory({ heading, variant = "story", link, id, intro }: StepsStoryProps) {
  return (
    <section id={id} className="relative py-28 lg:pt-36 lg:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader {...heading}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{stepsContent.callout}</p>
          </SectionHeader>
          {link && <MoreLink href={link.href} label={link.label} className="shrink-0" />}
        </div>
      </div>

      {intro}

      {variant === "story" ? (
        <>
          <StickySteps />
          <StackedSteps />
        </>
      ) : (
        <TeaserSteps />
      )}
    </section>
  );
}

/* ─────────────────────────── teaser ─────────────────────────── */

/** Horizontal stepper on top, one wide screen below; auto-advances until touched. */
function TeaserSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const run = useLoop(ref);
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  useTicker(run && !touched, 4200, () => setActive((i) => (i + 1) % steps.length));

  return (
    <div ref={ref} className="mx-auto mt-14 w-full max-w-7xl px-4 sm:px-6">
      <Tabs.Root
        value={String(active)}
        onValueChange={(v) => {
          setActive(Number(v));
          setTouched(true);
        }}
      >
        <Tabs.List
          aria-label={stepsContent.items.map((s) => s.name).join(", ")}
          className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4"
        >
          {steps.map((step, i) => (
            <Tabs.Trigger
              key={step.n}
              value={String(i)}
              className="group relative pt-5 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 overflow-hidden rounded-full bg-border"
              >
                <span
                  className={cn(
                    "absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary-glow",
                    i < active && "w-full",
                    i > active && "w-0",
                    i === active &&
                      (touched || !run ? "w-full" : "animate-[amnay-fill_4.2s_linear_forwards]"),
                  )}
                  style={i === active && !touched && run ? { width: 0 } : undefined}
                />
              </span>
              <span className="font-mono text-xs text-primary">{step.n}</span>
              <span
                className={cn(
                  "mt-1 block font-display text-xl font-semibold tracking-tight transition-colors sm:text-2xl",
                  i === active
                    ? "text-foreground"
                    : "text-muted-foreground/50 group-hover:text-muted-foreground",
                )}
              >
                {step.name}
              </span>
              <span className="mt-2 hidden text-sm leading-relaxed text-muted-foreground md:block">
                {step.body}
              </span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {steps.map((step, i) => {
          const Screen = screens[i];
          return (
            <Tabs.Content
              key={step.n}
              value={String(i)}
              className="relative mx-auto mt-12 max-w-4xl outline-none"
            >
              <div
                aria-hidden
                className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,oklch(0.681_0.147_238.6/0.16),transparent_65%)]"
              />
              <p className="relative mb-4 text-sm text-muted-foreground md:hidden">{step.body}</p>
              <div className="relative">{Screen && <Screen active={run || touched} />}</div>
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </div>
  );
}

/* ─────────────────────────── story ─────────────────────────── */

/** Desktop: steps pinned on the left, product screen swaps on the right as you scroll. */
function StickySteps() {
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length))));
  });

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + span * ((i + 0.5) / steps.length),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const Screen = screens[active] ?? screens[0];

  return (
    <div
      ref={track}
      className="relative hidden lg:block"
      style={{ height: `${steps.length * 85}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-12 items-center gap-10 px-6">
          <ol className="relative col-span-5 space-y-2 ps-8">
            {/* progress line */}
            <span aria-hidden className="absolute inset-y-3 start-0 w-px bg-border" />
            <motion.span
              aria-hidden
              className="absolute inset-y-3 start-0 w-px origin-top bg-gradient-to-b from-primary-glow to-primary shadow-[0_0_10px_oklch(0.741_0.138_234.8/0.8)]"
              style={{ scaleY: scrollYProgress }}
            />
            {steps.map((step, i) => (
              <li key={step.n}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === active ? "step" : undefined}
                  className="group relative block w-full py-4 text-start"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-6 -start-8 size-2 -translate-x-[3.5px] rounded-full transition-all duration-300",
                      i <= active ? "scale-125 bg-primary-glow" : "bg-border",
                    )}
                  />
                  <span className="font-mono text-xs text-primary">{step.n}</span>
                  <span
                    className={cn(
                      "mt-1 block font-display text-3xl font-semibold tracking-tight transition-colors duration-300",
                      i === active
                        ? "text-foreground"
                        : "text-muted-foreground/45 group-hover:text-muted-foreground",
                    )}
                  >
                    {step.name}
                  </span>
                  <span
                    className={cn(
                      "mt-2 block max-w-sm text-sm leading-relaxed transition-opacity duration-300",
                      i === active ? "text-muted-foreground opacity-100" : "opacity-0",
                    )}
                  >
                    {step.body}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="relative col-span-7">
            <div
              aria-hidden
              className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,oklch(0.681_0.147_238.6/0.18),transparent_65%)]"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative"
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Screen active />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile / tablet fallback: each step followed by its screen. */
function StackedSteps() {
  return (
    <ol className="mx-auto mt-16 w-full max-w-2xl space-y-20 px-4 sm:px-6 lg:hidden">
      {steps.map((step, i) => (
        <StackedStep key={step.n} index={i} />
      ))}
    </ol>
  );
}

function StackedStep({ index }: { index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const run = useLoop(ref, "-20%");
  const step = steps[index];
  const Screen = screens[index];
  if (!step || !Screen) return null;
  return (
    <li ref={ref}>
      <p className="font-mono text-xs text-primary">{step.n}</p>
      <h3 className="mt-1 font-display text-3xl font-semibold text-foreground">{step.name}</h3>
      <p className="mt-2 text-muted-foreground">{step.body}</p>
      <div className="mt-6">
        <Screen active={run} />
      </div>
    </li>
  );
}
