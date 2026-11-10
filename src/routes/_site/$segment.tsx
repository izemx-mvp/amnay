import { createFileRoute, notFound } from "@tanstack/react-router";
import { SegmentPage } from "@/components/blocks/SegmentPage";
import { getSegment } from "@/content/segments";

/** One landing page per entry of content/segments.ts (e.g. /bureaux-etudes). */
export const Route = createFileRoute("/_site/$segment")({
  loader: ({ params }) => {
    const segment = getSegment(params.segment);
    if (!segment) throw notFound({ routeId: "__root__" });
    return { segment };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `${loaderData.segment.name} — Amnay` }] : [],
  }),
  component: SegmentRoute,
});

function SegmentRoute() {
  const { segment } = Route.useLoaderData();
  return <SegmentPage segment={segment} />;
}
