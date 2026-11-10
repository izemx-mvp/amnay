import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { routes } from "@/content/navigation";
import { captureUtms } from "@/lib/tracking";
import { CookieBanner } from "./CookieBanner";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LandingHeader } from "./LandingHeader";
import { MobileBottomBar } from "./MobileBottomBar";

type SiteLayoutProps = {
  children: ReactNode;
  /** Ad landing pages: logo + trial CTA only, single-CTA mobile bar. */
  minimal?: boolean;
};

/** Shared chrome of every page: header, footer, cookie banner, mobile CTA bar,
 *  and a subtle page transition keyed on the route. */
export function SiteLayout({ children, minimal = false }: SiteLayoutProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => captureUtms(), []);

  return (
    <MotionConfig reducedMotion="user">
      {minimal ? <LandingHeader /> : <Header />}
      <main key={pathname} className="animate-page-in overflow-x-clip pb-20 lg:pb-0">
        {children}
      </main>
      <Footer />
      {/* No trial push on the enterprise page: contact only. */}
      {pathname !== routes.enterprise && <MobileBottomBar trialOnly={minimal} />}
      <CookieBanner />
    </MotionConfig>
  );
}
