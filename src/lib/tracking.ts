import { site } from "@/config/site";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "li_fat_id",
] as const;

export type Utms = Partial<Record<(typeof UTM_KEYS)[number], string>>;

const FIRST_KEY = "amnay_utm_first";
const LAST_KEY = "amnay_utm_last";

function readParams(): Utms {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const found: Utms = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }
  return found;
}

/** Capture attribution params on first visit: first-touch + last-touch. */
export function captureUtms() {
  if (typeof window === "undefined") return;
  try {
    const found = readParams();
    if (Object.keys(found).length === 0) return;
    const stamp = { ...found, ts: new Date().toISOString() };
    if (!window.localStorage.getItem(FIRST_KEY)) {
      window.localStorage.setItem(FIRST_KEY, JSON.stringify(stamp));
    }
    window.localStorage.setItem(LAST_KEY, JSON.stringify(stamp));
  } catch {
    /* storage unavailable — attribution simply stays empty */
  }
}

export function getStoredUtms(): Utms {
  if (typeof window === "undefined") return {};
  try {
    const raw =
      window.localStorage.getItem(LAST_KEY) ?? window.localStorage.getItem(FIRST_KEY);
    if (!raw) return {};
    const { ts: _ts, ...utms } = JSON.parse(raw) as Utms & { ts?: string };
    return utms;
  } catch {
    return {};
  }
}

/** Trial URL with every stored attribution param appended. */
export function buildTrialUrl(): string {
  const utms = getStoredUtms();
  try {
    const url = new URL(site.trialUrl);
    for (const [key, value] of Object.entries(utms)) {
      if (value) url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return site.trialUrl;
  }
}

/** Push a tag-manager event with attribution attached. */
export function pushDataLayer(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...getStoredUtms(), ...data });
}
