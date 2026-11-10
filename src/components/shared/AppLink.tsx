import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "@tanstack/react-router";

type AppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
  /** Classes added when the link's path is the current route. */
  activeClassName?: string;
};

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/**
 * One link component for copy-driven hrefs: internal paths ("/tarifs",
 * "/fonctionnalites#agents", "/demo?offre=fondateurs") go through the router,
 * everything else is a plain anchor.
 */
export function AppLink({ href, children, activeClassName, ...rest }: AppLinkProps) {
  if (href.startsWith("#")) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  if (isExternal(href)) {
    const blank = href.startsWith("http");
    return (
      <a
        href={href}
        target={blank ? "_blank" : undefined}
        rel={blank ? "noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }
  const url = new URL(href, "https://x.local");
  const search = Object.fromEntries(url.searchParams);
  const linkProps = {
    to: url.pathname as never,
    ...(url.hash ? { hash: url.hash.slice(1) } : {}),
    ...(Object.keys(search).length ? { search: search as never } : {}),
    ...(activeClassName ? { activeProps: { className: activeClassName } } : {}),
  };
  return (
    <Link
      {...linkProps}
      activeOptions={{ exact: url.pathname === "/", includeHash: false }}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </Link>
  );
}
