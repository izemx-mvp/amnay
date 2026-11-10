import { Emblem } from "@/components/brand/Logo";
import { AppLink } from "@/components/shared/AppLink";
import { MascotImage } from "@/components/shared/Mascot";
import { botImages } from "@/config/images";
import { notFound } from "@/content/common";
import { mainNav, routes } from "@/content/navigation";

/** Styled 404, rendered inside the site layout. */
export function NotFound() {
  const links = mainNav.flatMap((i) =>
    i.kind === "link" ? [{ label: i.label, href: i.href }] : i.entries.slice(0, 1),
  );
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-28 pb-20">
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0" />
      <Emblem
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[-10%] w-[640px] max-w-none -translate-y-1/2 opacity-[0.05]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* desktop: the lost agent beside the copy */}
        <figure className="absolute top-1/2 right-6 hidden w-80 -translate-y-1/2 flex-col items-center gap-2 text-center lg:flex">
          <MascotImage image={botImages.perdu} float sizes="288px" className="w-72" />
          <figcaption className="font-mono text-sm text-muted-foreground">
            {notFound.mascot}
          </figcaption>
        </figure>
        <p className="text-outline font-display text-[clamp(120px,22vw,280px)] leading-none font-bold tracking-tighter">
          {notFound.code}
        </p>
        <h1 className="h2-display mt-4 max-w-2xl text-foreground">{notFound.title}</h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">{notFound.body}</p>
        {/* mobile / tablet: the lost agent under the copy */}
        <figure className="mt-8 flex items-center gap-4 lg:hidden">
          <MascotImage image={botImages.perdu} float sizes="112px" className="w-28 shrink-0" />
          <figcaption className="font-mono text-sm text-muted-foreground">
            {notFound.mascot}
          </figcaption>
        </figure>
        <AppLink
          href={routes.home}
          className="btn-shine mt-9 inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-glow"
        >
          {notFound.home}
        </AppLink>
        <p className="section-label mt-14">{notFound.links}</p>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {links.map((l) => (
            <li key={l.href}>
              <AppLink
                href={l.href}
                className="font-display text-lg text-foreground underline-offset-8 transition-colors hover:text-primary-glow hover:underline"
              >
                {l.label}
              </AppLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
