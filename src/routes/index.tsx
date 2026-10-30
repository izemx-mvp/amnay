import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { Agents } from "@/components/sections/Agents";
import { Comparator } from "@/components/sections/Comparator";
import { Demo } from "@/components/sections/Demo";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Founders } from "@/components/sections/Founders";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { Proofs } from "@/components/sections/Proofs";
import { captureUtms } from "@/lib/tracking";

// (including og:image) from __root.tsx.
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => captureUtms(), []);

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main className="overflow-x-clip pb-20 md:pb-0">
        <Hero />
        <Problem />
        <HowItWorks />
        <Proofs />
        <Agents />
        <Comparator />
        <Pricing />
        <Founders />
        <Faq />
        <Demo />
        <FinalCta />
      </main>
      <Footer />
      <MobileBottomBar />
      <CookieBanner />
    </MotionConfig>
  );
}
