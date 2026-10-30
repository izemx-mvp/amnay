import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { anchors } from "@/config/site";
import { buildTrialUrl, pushDataLayer } from "@/lib/tracking";

const navLinks = [...anchors, { id: "demo", label: "Démo" }] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const trialHref = buildTrialUrl();

  // Lock scroll while the full-screen menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 glass border-b border-border">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center" aria-label="Amnay by IZEMX — accueil">
          <Logo theme="dark" className="h-7 w-auto sm:h-8" />
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <a href="#demo" data-cta="demo" onClick={() => pushDataLayer("cta_click", { cta: "demo" })}>
              Réserver une démo
            </a>
          </Button>
          <Button size="sm" asChild>
            <a
              href={trialHref}
              target="_blank"
              rel="noreferrer"
              data-cta="trial"
              onClick={() => pushDataLayer("cta_click", { cta: "trial" })}
            >
              Essai gratuit
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg text-foreground md:hidden"
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 top-16 z-40 flex flex-col bg-background md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-1 flex-col gap-2 px-6 pt-8" aria-label="Menu mobile">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-4 font-display text-2xl font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="grid grid-cols-1 gap-3 border-t border-border p-6 pb-10">
              <Button size="lg" asChild>
                <a
                  href={trialHref}
                  target="_blank"
                  rel="noreferrer"
                  data-cta="trial"
                  onClick={() => pushDataLayer("cta_click", { cta: "trial", surface: "mobile_menu" })}
                >
                  Essai gratuit
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#demo" data-cta="demo" onClick={() => setOpen(false)}>
                  Réserver une démo
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
