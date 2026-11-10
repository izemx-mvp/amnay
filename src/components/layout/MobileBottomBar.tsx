import { useEffect, useState } from "react";
import { DemoCta, TrialCta } from "@/components/fx/Cta";
import { cta } from "@/content/common";
import { cn } from "@/lib/utils";

/** Mobile sticky CTA bar — appears once the first screen is scrolled past.
 *  `trialOnly` is used by the ad landing pages (one CTA). */
export function MobileBottomBar({ trialOnly = false }: { trialOnly?: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "glass fixed inset-x-0 bottom-0 z-40 border-t border-border p-3 transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className={cn("grid gap-2", !trialOnly && "grid-cols-2")}>
        <TrialCta size="md" surface="mobile_bar" block>
          {cta.trial}
        </TrialCta>
        {!trialOnly && (
          <DemoCta size="md" surface="mobile_bar" block>
            {cta.demoShort}
          </DemoCta>
        )}
      </div>
    </div>
  );
}
