import { getStoredUtms } from "@/lib/tracking";

export type LeadKind = "demo" | "contact" | "webinar";

/**
 * Single entry point for every form on the site.
 * MVP: no backend — the lead is only logged. Plug the CRM / e-mail endpoint here.
 */
export async function submitLead(kind: LeadKind, data: Record<string, unknown>) {
  const lead = {
    kind,
    ...data,
    page: typeof window === "undefined" ? "" : window.location.pathname,
    attribution: getStoredUtms(),
    ts: new Date().toISOString(),
  };
  console.log("[amnay] lead", lead);
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true as const };
}
