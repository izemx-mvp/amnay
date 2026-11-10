import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLink } from "@/components/shared/AppLink";
import { MascotImage } from "@/components/shared/Mascot";
import { botImages } from "@/config/images";
import { site } from "@/config/site";
import { cookieBanner as copy } from "@/content/common";
import { routes } from "@/content/navigation";

type Consent = { analytics: boolean; marketing: boolean; ts: string };

/** Non-blocking cookie banner. Choice stored in localStorage (loi 09-08 / CNDP). */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(site.consentKey)) setVisible(true);
    } catch {
      /* no storage — banner simply won't persist a choice */
    }
  }, []);

  if (!visible) return null;

  const save = (consent: Omit<Consent, "ts">) => {
    try {
      window.localStorage.setItem(
        site.consentKey,
        JSON.stringify({ ...consent, ts: new Date().toISOString() }),
      );
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label={copy.label}
      className="fixed inset-x-4 bottom-4 z-[55] rounded-2xl border border-border bg-popover p-4 shadow-elevated sm:right-6 sm:left-auto sm:max-w-md"
    >
      <div className="flex items-start gap-3">
        {/* mascot from 400px up; plain icon on the narrowest phones */}
        <Cookie className="mt-0.5 size-5 shrink-0 text-primary min-[400px]:hidden" aria-hidden />
        <MascotImage
          image={botImages.cookie}
          alt=""
          sizes="72px"
          className="-my-1 -ms-1 hidden w-14 shrink-0 min-[400px]:block sm:w-[72px]"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm text-foreground">
            {copy.text}{" "}
            <AppLink
              href={routes.cookies}
              className="text-primary underline-offset-4 hover:underline"
            >
              {copy.more}
            </AppLink>
          </p>

          {customize && (
            <div className="mt-3 space-y-2">
              <Toggle label={copy.analytics} checked={analytics} onChange={setAnalytics} />
              <Toggle label={copy.marketing} checked={marketing} onChange={setMarketing} />
            </div>
          )}

          {/* GTM placeholder: load the tag only after consent is accepted. */}

          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => save({ analytics: true, marketing: true })}>
              {copy.accept}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => save({ analytics: false, marketing: false })}
            >
              {copy.refuse}
            </Button>
            {customize ? (
              <Button size="sm" variant="ghost" onClick={() => save({ analytics, marketing })}>
                {copy.save}
              </Button>
            ) : (
              <Button size="sm" variant="ghost" onClick={() => setCustomize(true)}>
                {copy.customize}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg bg-surface px-3 py-2">
      <span className="text-sm text-foreground">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-0.5 size-4 rounded-full bg-background transition-[inset-inline-start] ${
            checked ? "start-[18px]" : "start-0.5"
          }`}
        />
      </button>
    </label>
  );
}
