import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/blocks/CtaBand";
import { FaqExplorer } from "@/components/blocks/FaqAccordion";
import { PageHero } from "@/components/blocks/PageHero";
import { cta } from "@/content/common";
import { faqCategories, faqPage, objectionIds } from "@/content/faq";
import { routes } from "@/content/navigation";

export const Route = createFileRoute("/_site/faq")({
  head: () => ({ meta: [{ title: `${faqPage.title} — Amnay` }] }),
  component: FaqRoute,
});

function FaqRoute() {
  return (
    <>
      <PageHero
        label={faqPage.label}
        title={faqPage.title}
        lead={faqPage.lead}
        className="pb-12 lg:pb-16"
      />
      <FaqExplorer categories={faqCategories} labels={faqPage} objectionIds={objectionIds} />
      <CtaBand
        title={faqPage.moreTitle}
        note={faqPage.moreBody}
        trial={false}
        secondary={{ label: cta.demo, href: routes.demo }}
        surface="faq_final"
      />
    </>
  );
}
