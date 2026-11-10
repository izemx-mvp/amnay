import { useEffect, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Nav from "@radix-ui/react-navigation-menu";
import { useRouterState } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Sparkles, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { DemoCta, TrialCta } from "@/components/fx/Cta";
import { AppLink } from "@/components/shared/AppLink";
import { cta, header } from "@/content/common";
import { mainNav, routes, type MenuEntry, type NavItem } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { MiniVisual } from "./MiniVisual";

/* TODO: move to src/content/common.ts (and read places left from site.ts) */
const announcement = {
  label: "Offre Fondateurs",
  text: "-30 % sur l'annuel pour les 50 premiers clients",
  cta: "En profiter",
  href: "/offre-fondateurs",
  storageKey: "amnay_announce_closed",
};

const MASCOT_MASK = {
  maskImage: "radial-gradient(circle at center, #000 52%, transparent 72%)",
  WebkitMaskImage: "radial-gradient(circle at center, #000 52%, transparent 72%)",
} as const;

const pathOf = (href: string) => href.split(/[?#]/)[0] ?? href;

function usePathname() {
  return useRouterState({ select: (s) => s.location.pathname });
}

function isActive(item: NavItem, pathname: string) {
  return item.kind === "link"
    ? pathOf(item.href) === pathname
    : item.entries.some((e) => pathOf(e.href) === pathname);
}

function readClosed() {
  try {
    return sessionStorage.getItem(announcement.storageKey) === "1";
  } catch {
    return false;
  }
}

/** Floating mascot (respects reduced motion). */
/** Floating mascot (respects reduced motion). */
function Mascot({ src, className }: { src: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden
      width={160}
      height={160}
      loading="lazy"
      decoding="async"
      style={MASCOT_MASK}
      className={cn("pointer-events-none select-none", className)}
      {...(reduce
        ? {}
        : {
            animate: { y: [0, -6, 0] },
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
          })}
    />
  );
}

/** Site header: scroll-aware glass bar, sliding hover pill, mega-menus, full-screen mobile menu. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [barClosed, setBarClosed] = useState(true);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    if (open) return;
    const diff = y - prev;
    if (diff > 6 && y > 320) setHidden(true);
    else if (diff < -6) setHidden(false);
  });

  // Read the announcement state on the client only.
  useEffect(() => setBarClosed(readClosed()), []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll + close with Escape while the full-screen menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const closeBar = () => {
    setBarClosed(true);
    try {
      sessionStorage.setItem(announcement.storageKey, "1");
    } catch {
      /* ignore */
    }
  };

  const showBar = !barClosed && !scrolled && !open;
  const solid = scrolled || open;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      animate={{ y: hidden && !open ? "-100%" : "0%" }}
      transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence initial={false}>
        {showBar && <AnnouncementBar onClose={closeBar} />}
      </AnimatePresence>

      <div
        className={cn(
          "relative border-b transition-[background-color,border-color] duration-300",
          solid ? "glass border-border" : "border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 transition-[height] duration-300 sm:px-6",
            scrolled && !open ? "h-14" : "h-16",
          )}
        >
          <AppLink
            href={routes.home}
            className="group flex shrink-0 items-center"
            aria-label={header.homeLabel}
          >
            <Logo
              theme="dark"
              priority
              className="h-7 w-auto transition-transform duration-300 group-hover:scale-[1.03] sm:h-8"
            />
          </AppLink>

          <DesktopNav pathname={pathname} />

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <DemoCta size="sm" surface="header" className="border-0 bg-transparent">
              {cta.demo}
            </DemoCta>
            <TrialCta size="sm" surface="header">
              {cta.trial}
            </TrialCta>
          </div>

          <button
            type="button"
            className="relative inline-flex size-10 items-center justify-center rounded-xl border border-border/60 bg-foreground/[0.03] text-foreground transition-colors hover:bg-foreground/[0.07] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? header.closeMenu : header.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Scroll progress */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className={cn(
            "absolute inset-x-0 -bottom-px h-px origin-left bg-gradient-to-r from-primary/0 via-primary-glow to-primary/0 transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
      </div>

      <AnimatePresence>
        {open && <MobileMenu pathname={pathname} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </motion.header>
  );
}

/* ─────────────────────────── announcement ─────────────────────────── */

function AnnouncementBar({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden border-b border-primary/20 bg-[linear-gradient(90deg,oklch(0.681_0.147_238.6/0.10),oklch(0.681_0.147_238.6/0.22),oklch(0.681_0.147_238.6/0.10))]"
    >
      <div className="mx-auto flex h-9 w-full max-w-7xl items-center justify-center gap-3 px-10 text-xs sm:text-[13px]">
        <span className="hidden items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] text-primary-glow uppercase sm:inline-flex">
          <Sparkles className="size-3" aria-hidden />
          {announcement.label}
        </span>
        <span className="truncate text-foreground/90">{announcement.text}</span>
        <AppLink
          href={announcement.href}
          className="group inline-flex shrink-0 items-center gap-1 font-medium text-primary-glow hover:text-foreground"
        >
          {announcement.cta}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </AppLink>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer l'annonce"
        className="absolute end-2 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"
      >
        <X className="size-3.5" />
      </button>
    </motion.div>
  );
}

/* ─────────────────────────── desktop ─────────────────────────── */

function DesktopNav({ pathname }: { pathname: string }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Nav.Root
      className="relative hidden flex-1 justify-center lg:flex"
      aria-label={header.mainNavLabel}
      delayDuration={80}
    >
      <Nav.List className="flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
        {mainNav.map((item) => {
          const active = isActive(item, pathname);
          const base = cn(
            "relative isolate inline-flex h-9 items-center gap-1 rounded-full px-3.5 text-sm transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:text-foreground",
            active ? "text-foreground" : "text-muted-foreground",
          );
          const pill = hovered === item.label && (
            <motion.span
              layoutId="nav-hover-pill"
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.07]"
              transition={{ type: "spring", stiffness: 420, damping: 36 }}
            />
          );
          const dot = active && (
            <span
              aria-hidden
              className="absolute -bottom-[3px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary-glow shadow-[0_0_8px_oklch(0.741_0.138_234.8)]"
            />
          );

          if (item.kind === "link") {
            return (
              <Nav.Item key={item.label} onMouseEnter={() => setHovered(item.label)}>
                <Nav.Link asChild active={active}>
                  <AppLink
                    href={item.href}
                    className={base}
                    aria-current={active ? "page" : undefined}
                  >
                    {pill}
                    {item.label}
                    {dot}
                  </AppLink>
                </Nav.Link>
              </Nav.Item>
            );
          }
          return (
            <Nav.Item key={item.label} onMouseEnter={() => setHovered(item.label)}>
              <Nav.Trigger className={cn(base, "group")}>
                {pill}
                {item.label}
                <ChevronDown
                  className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  aria-hidden
                />
                {dot}
              </Nav.Trigger>
              <Nav.Content className="data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out">
                <MegaPanel item={item} pathname={pathname} />
              </Nav.Content>
            </Nav.Item>
          );
        })}
      </Nav.List>

      <div className="absolute top-full left-1/2 flex -translate-x-1/2 justify-center pt-3">
        <Nav.Viewport className="border-light relative h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top overflow-hidden rounded-2xl bg-popover/95 shadow-elevated backdrop-blur-xl transition-[width,height] duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95" />
      </div>
    </Nav.Root>
  );
}

function MegaPanel({
  item,
  pathname,
}: {
  item: Extract<NavItem, { kind: "menu" }>;
  pathname: string;
}) {
  return (
    <div className="w-[680px]">
      <div className="grid grid-cols-[200px_1fr]">
        <div className="relative flex flex-col overflow-hidden border-e border-border bg-[radial-gradient(circle_at_0%_0%,oklch(0.681_0.147_238.6/0.24),transparent_70%)] p-5">
          <div aria-hidden className="blueprint-grid absolute inset-0 opacity-70" />
          <p className="section-label relative text-[10px]">{item.label}</p>
          <p className="relative mt-3 font-display text-base leading-snug font-semibold text-foreground">
            {item.intro}
          </p>
          <Mascot
            src="/images/bot/bot-salut.webp"
            className="relative -me-3 -mb-6 mt-auto size-28 self-end"
          />
        </div>
        <ul className="p-2">
          {item.entries.map((entry, i) => (
            <motion.li
              key={entry.href}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.03 * i, duration: 0.2 }}
            >
              <MegaEntry entry={entry} active={pathOf(entry.href) === pathname} />
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-border bg-foreground/[0.02] px-5 py-3">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">14 jours d'essai</span> · 150 crédits
          offerts · sans carte bancaire
        </p>
        <TrialCta size="sm" surface="header">
          {cta.trial}
        </TrialCta>
      </div>
    </div>
  );
}

function MegaEntry({ entry, active }: { entry: MenuEntry; active: boolean }) {
  return (
    <Nav.Link asChild active={active}>
      <AppLink
        href={entry.href}
        className={cn(
          "group flex items-center gap-4 rounded-xl p-3 transition-colors outline-none hover:bg-foreground/[0.04] focus-visible:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-ring",
          active && "bg-primary/[0.07]",
        )}
      >
        <MiniVisual visual={entry.visual} />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            {entry.label}
            {active && <span className="size-1.5 rounded-full bg-primary-glow" aria-hidden />}
          </span>
          <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
            {entry.description}
          </span>
        </span>
        <ArrowRight
          aria-hidden
          className="size-4 shrink-0 -translate-x-1 text-primary-glow opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
      </AppLink>
    </Nav.Link>
  );
}

/* ─────────────────────────── mobile ─────────────────────────── */

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

function MobileMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const openByDefault = mainNav.find((i) => i.kind === "menu" && isActive(i, pathname))?.label;
  return (
    <motion.div
      id="mobile-menu"
      className="fixed inset-0 top-16 z-40 flex flex-col overflow-hidden bg-background lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div aria-hidden className="blueprint-grid pointer-events-none absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-24 -top-24 size-72 rounded-full bg-primary/20 blur-3xl"
      />

      <nav
        className="relative flex-1 overflow-y-auto px-4 pt-4 pb-6"
        aria-label={header.mobileNavLabel}
      >
        <Accordion.Root type="single" collapsible defaultValue={openByDefault}>
          <motion.div variants={listVariants} initial="hidden" animate="show">
            {mainNav.map((item) =>
              item.kind === "link" ? (
                <motion.div key={item.label} variants={itemVariants}>
                  <AppLink
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between border-b border-border px-2 py-5 font-display text-2xl font-semibold",
                      isActive(item, pathname) ? "text-primary-glow" : "text-foreground",
                    )}
                  >
                    {item.label}
                    <ArrowRight className="size-5 text-muted-foreground" aria-hidden />
                  </AppLink>
                </motion.div>
              ) : (
                <motion.div key={item.label} variants={itemVariants}>
                  <Accordion.Item value={item.label} className="border-b border-border">
                    <Accordion.Header>
                      <Accordion.Trigger
                        className={cn(
                          "group flex w-full items-center justify-between px-2 py-5 text-start font-display text-2xl font-semibold",
                          isActive(item, pathname) ? "text-primary-glow" : "text-foreground",
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className="size-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
                          aria-hidden
                        />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="data-[state=open]:animate-fade-up overflow-hidden">
                      <ul className="space-y-1 pb-4">
                        {item.entries.map((e) => (
                          <li key={e.href}>
                            <AppLink
                              href={e.href}
                              onClick={onClose}
                              className={cn(
                                "group flex items-center gap-3 rounded-xl p-2 transition-colors active:bg-foreground/[0.06]",
                                pathOf(e.href) === pathname && "bg-primary/[0.08]",
                              )}
                            >
                              <MiniVisual visual={e.visual} className="h-11 w-16" />
                              <span className="min-w-0">
                                <span className="block font-medium text-foreground">{e.label}</span>
                                <span className="block text-xs text-muted-foreground">
                                  {e.description}
                                </span>
                              </span>
                            </AppLink>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Content>
                  </Accordion.Item>
                </motion.div>
              ),
            )}
          </motion.div>
        </Accordion.Root>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-foreground/[0.03] p-3"
        >
          <Mascot src="/images/bot/bot-salut.webp" className="size-16 shrink-0" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Votre agent veille pour vous.</span>{" "}
            Première veille en 10 minutes, sans carte bancaire.
          </p>
        </motion.div>
      </nav>

      <div className="relative grid gap-3 border-t border-border bg-navy/70 p-4 pb-8 backdrop-blur">
        <TrialCta size="lg" surface="mobile_menu" block>
          {cta.trial}
        </TrialCta>
        <DemoCta size="lg" surface="mobile_menu" block>
          {cta.demo}
        </DemoCta>
      </div>
    </motion.div>
  );
}