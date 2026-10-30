import { Logo } from "@/components/brand/Logo";
import { anchors, legalLinks, offices, site } from "@/config/site";
import { footer } from "@/content/home";

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy/60">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo theme="dark" className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{footer.promise}</p>
          <p className="mt-6 text-sm font-medium text-foreground/80">{footer.solutionLine}</p>
          <a
            href={`mailto:${site.contactEmail}`}
            className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {site.contactEmail}
          </a>
        </div>

        <nav aria-label="Sections de la page">
          <h3 className="font-display text-sm font-semibold text-foreground">La page</h3>
          <ul className="mt-4 space-y-2.5">
            {anchors.map((a) => (
              <li key={a.id}>
                <a
                  href={`#${a.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {a.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#demo"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Réserver une démo
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Liens légaux">
          <h3 className="font-display text-sm font-semibold text-foreground">Légal</h3>
          <ul className="mt-4 space-y-2.5">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-sm font-semibold text-foreground">Bureaux</h3>
          <ul className="mt-4 space-y-3">
            {offices.map((o) => (
              <li key={o.city} className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground/80">{o.city}</span>
                <br />
                {o.address}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <p className="mx-auto w-full max-w-7xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
