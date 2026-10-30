import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { buildTrialUrl } from "@/lib/tracking";

/** Mobile sticky bottom bar — appears once the hero is scrolled past. */
export function MobileBottomBar() {
  const [visible, setVisible] = useState(false);
  const trialHref = buildTrialUrl();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 glass border-t border-border p-3 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      } transition-transform duration-300`}
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-2 gap-2">
        <Button asChild>
          <a href={trialHref} target="_blank" rel="noreferrer" data-cta="trial">
            Essai gratuit
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href="#demo" data-cta="demo">
            Démo
          </a>
        </Button>
      </div>
    </div>
  );
}
