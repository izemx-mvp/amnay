import { createFileRoute } from "@tanstack/react-router";
import { AgentsPipeline } from "@/components/blocks/AgentsPipeline";
import { CostComparator } from "@/components/blocks/CostComparator";
import { CtaBand } from "@/components/blocks/CtaBand";
import { FaqAccordion } from "@/components/blocks/FaqAccordion";
import { FoundersPass } from "@/components/blocks/FoundersPass";
import { PricingSummary } from "@/components/blocks/PricingTable";
import { ProofsBento } from "@/components/blocks/ProofsBento";
import { StepsStory } from "@/components/blocks/StepsStory";
import { AgentAtWork } from "@/components/sections/AgentAtWork";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { SegmentTiles } from "@/components/sections/SegmentTiles";
import { heroImages, sceneImages } from "@/config/images";
import { foundersPassCopy } from "@/content/blocks";
import { pickFaq } from "@/content/faq";
import {
  afterContrast,
  agentsTeaser,
  comparatorSection,
  faqTeaser,
  finalCta,
  foundersTeaser,
  hero,
  homeMeta,
  pricingSummary,
  proofsSection,
  segmentTiles,
  stepsTeaser,
} from "@/content/home";
import { categories } from "@/content/product";
import { segments } from "@/content/segments";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [{ title: homeMeta.title }],
    // LCP: start fetching the hero illustration that matches the viewport.
    links: [
      {
        rel: "preload",
        as: "image",
        href: heroImages.desktop.src,
        media: "(min-width: 768px)",
        fetchPriority: "high",
      },
      {
        rel: "preload",
        as: "image",
        href: heroImages.mobile.src,
        media: "(max-width: 767.98px)",
        fetchPriority: "high",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero hero={hero} marquee={categories} stats backdrop />
      <Problem />
      <StepsStory
        heading={stepsTeaser}
        variant="teaser"
        link={stepsTeaser.link}
        intro={<AgentAtWork hero={hero} line={afterContrast.line} />}
      />
      <ProofsBento heading={proofsSection} />
      <AgentsPipeline heading={agentsTeaser} link={agentsTeaser.link} />
      <SegmentTiles heading={segmentTiles} segments={segments} linkLabel={segmentTiles.linkLabel} />
      <CostComparator heading={comparatorSection} />
      <PricingSummary heading={pricingSummary} link={pricingSummary.link} labels={pricingSummary} />
      <FoundersPass
        heading={foundersTeaser}
        cta={{ label: foundersPassCopy.more, href: foundersTeaser.link.href }}
        scene={sceneImages.fondateurs}
      />
      <FaqAccordion heading={faqTeaser} items={pickFaq(faqTeaser.ids)} link={faqTeaser.link} />
      <CtaBand title={finalCta.title} highlight={finalCta.highlight} surface="home_final" />
    </>
  );
}
