import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";

/** Pathless layout: full header, footer, cookie banner, mobile CTA bar. */
export const Route = createFileRoute("/_site")({
  component: () => (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  ),
});
