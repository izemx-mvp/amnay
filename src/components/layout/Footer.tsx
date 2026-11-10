import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { DemoCta, TrialCta } from "@/components/fx/Cta";
import { AppLink } from "@/components/shared/AppLink";
import { contacts, offices } from "@/config/site";
import { cta, footer } from "@/content/common";
import { footerColumns } from "@/content/navigation";

/* TODO: move to src/content/common.ts */
const footerCta = {
  label: "Prêt à essayer ?",
  title: "Votre première veille en 10 minutes.",
  text: "Inscription, critères, mémoires gagnés : l'Éclaireur se met au travail aussitôt.",
  note: "14 jours · 150 crédits offerts · sans carte bancaire",
  credit: "Conçu par IZEMX",
  backToTop: "Haut de page",
};

const MASCOT_MASK = {
  maskImage: "radial-gradient(circle at center, #000 52%, transparent 72%)",
  WebkitMaskImage: "radial-gradient(circle at center, #000 52%, transparent 72%)",
} as const;

export function Footer() {
  const reduce = useReducedMotion();
  const toTop = () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-border bg-navy/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      {/* ── CTA band ── */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6">
        <div className="border-light relative overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_85%_50%,oklch(0.681_0.147_238.6/0.28),transparent_60%)] p-8 sm:p-12">
          <div aria-hidden className="blueprint-grid absolute inset-0 opacity-60" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div className="max-w-xl">
              <p className="section-label text-[11px]">{footerCta.label}</p>
              <h2 className="mt-3 font-display text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
                {footerCta.title}
              </h2>
              <p className="mt-3 text-muted-foreground">{footerCta.text}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <TrialCta size="lg" surface="footer">
                  {cta.trial}
                </TrialCta>
                <DemoCta size="lg" surface="footer">
                  {cta.demo}
                </DemoCta>
              </div>
              <p className="mt-4 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
                {footerCta.note}
              </p>
            </div>
                        <motion.img
              src="/images/bot/bot-salut.webp"
              alt="L'agent Amnay vous fait signe"
              width={260}
              height={260}
              loading="lazy"
              decoding="async"
              style={MASCOT_MASK}
              className="mx-auto hidden size-52 select-none md:block lg:size-64"
              {...(reduce
                ? {}
                : {
                    animate: { y: [0, -8, 0], rotate: [0, -2, 0] },
                    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
                  })}
            />
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_2.4fr]">
        <div>
          <Logo theme="dark" className="h-10 w-auto" />
          <p className="mt-5 max-w-xs font-display text-lg leading-snug font-semibold text-foreground">
            {footer.promise}
          </p>
          <p className="mt-4 text-sm font-medium text-foreground/80">{footer.solutionLine}</p>

          <p className="mt-8 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            {footer.contactTitle}
          </p>
          <div className="mt-3 space-y-2">
            <a
              href={`mailto:${contacts.email}`}
              className="group flex items-center gap-2.5 text-sm text-foreground transition-colors hover:text-primary-glow"
            >
              <span className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-foreground/[0.03] transition-colors group-hover:border-primary/40">
                <Mail className="size-4" aria-hidden />
              </span>
              {contacts.email}
            </a>
            {contacts.phone && (
              <a
                href={`tel:${contacts.phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-foreground/[0.03] transition-colors group-hover:border-primary/40">
                  <Phone className="size-4" aria-hidden />
                </span>
                {contacts.phone}
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <AppLink
                      href={l.href}
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                      <ArrowUpRight
                        aria-hidden
                        className="size-3.5 -translate-x-1 translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                      />
                    </AppLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* ── Offices ── */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {offices.map((o) => (
            <div
              key={o.city}
              className="group flex items-start gap-3 rounded-2xl border border-border/70 bg-foreground/[0.02] p-4 transition-colors hover:border-primary/30 hover:bg-primary/[0.04]"
            >
              <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-glow">
                <MapPin className="size-4" aria-hidden />
              </span>
              <p className="text-sm text-muted-foreground">
                <span className="font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">
                  {o.city}
                </span>
                <br />
                {o.address}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Giant wordmark ── */}
      <div aria-hidden className="relative mx-auto w-full max-w-7xl overflow-hidden px-4 sm:px-6">
        <p className="pointer-events-none mt-10 -mb-[0.22em] bg-gradient-to-b from-foreground/[0.10] to-transparent bg-clip-text text-center font-display text-[clamp(5rem,22vw,18rem)] leading-none font-bold tracking-tighter text-transparent select-none">
          Amnay
        </p>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-border/60 bg-navy/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-3 px-4 py-5 sm:flex-row sm:items-center sm:px-6">
          <p className="text-xs text-muted-foreground">{footer.copyright}</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground/80 uppercase">
              {footerCta.credit}
            </span>
            <button
              type="button"
              onClick={toTop}
              className="group inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {footerCta.backToTop}
              <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}