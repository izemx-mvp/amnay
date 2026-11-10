import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";

/** Pathless layout for ad landing pages: minimal header, one CTA. */
export const Route = createFileRoute("/_landing")({
  component: () => (
    <SiteLayout minimal>
      <Outlet />
    </SiteLayout>
  ),
});
