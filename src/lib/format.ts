const formatters = new Map<number, Intl.NumberFormat>();

/** French number formatting: 14 900 · 0,5 */
export function frNumber(n: number, decimals = 0) {
  let f = formatters.get(decimals);
  if (!f) {
    f = new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    formatters.set(decimals, f);
  }
  return f.format(n);
}

/** Like frNumber but keeps decimals only when needed: 15 · 0,5 · 0,1 */
export function frAuto(n: number) {
  return Number.isInteger(n) ? frNumber(n) : frNumber(n, String(n).split(".")[1]?.length ?? 1);
}

/** Replace {key} placeholders in a copy string. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? `{${k}}`));
}

export function frDate(iso: string, opts: Intl.DateTimeFormatOptions = { dateStyle: "long" }) {
  return new Intl.DateTimeFormat("fr-FR", { timeZone: "Africa/Casablanca", ...opts }).format(
    new Date(iso),
  );
}
