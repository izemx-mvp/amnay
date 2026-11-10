import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/blocks/LegalPage";
import { legalPages } from "@/content/legal";

const page = legalPages.terms;

export const Route = createFileRoute("/_site/conditions-generales")({
  head: () => ({ meta: [{ title: `${page.title} — Amnay` }] }),
  component: () => <LegalPage page={page} />,
});
