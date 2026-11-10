import { useState, type ReactNode } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { TrialCta, trialLinkProps } from "@/components/fx/Cta";
import { Ticker } from "@/components/fx/Ticker";
import { AppLink } from "@/components/shared/AppLink";
import { MoreLink } from "@/components/shared/MoreLink";
import { SectionHeader, type SectionHeading } from "@/components/shared/SectionHeader";
import { billing, creditCosts, plans, selfHosted, type Plan, type PlanId } from "@/config/site";
import { pricingTableCopy as copy } from "@/content/blocks";
import { routes } from "@/content/navigation";
import { fill, frNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export type Billing = "monthly" | "yearly";

type Cell = string | boolean;
type ColumnId = PlanId | "selfHosted";

/** Comparison rows, computed from config. */
function buildRows(): { label: string; values: Record<ColumnId, Cell> }[] {
  const per = (fn: (p: Plan) => Cell) =>
    Object.fromEntries(plans.map((p) => [p.id, fn(p)])) as Record<PlanId, Cell>;
  const sh = copy.selfHostedValues;
  return [
    {
      label: copy.rows.credits,
      values: { ...per((p) => frNumber(p.credits)), selfHosted: sh.credits },
    },
    {
      label: copy.rows.analyses,
      values: {
        ...per((p) => frNumber(Math.floor(p.credits / creditCosts.analysis))),
        selfHosted: "—",
      },
    },
    {
      label: copy.rows.members,
      values: { ...per((p) => String(p.members)), selfHosted: sh.members },
    },
    {
      label: copy.rows.profiles,
      values: {
        ...per((p) => (p.profiles === null ? copy.unlimited : String(p.profiles))),
        selfHosted: sh.profiles,
      },
    },
    {
      label: copy.rows.storage,
      values: { ...per((p) => `${p.storageGb} Go`), selfHosted: sh.storage },
    },
    { label: copy.rows.watch, values: { ...per(() => true), selfHosted: true } },
    { label: copy.rows.memo, values: { ...per((p) => p.memo), selfHosted: true } },
    { label: copy.rows.market, values: { ...per((p) => p.market), selfHosted: true } },
    { label: copy.rows.api, values: { ...per((p) => p.api), selfHosted: true } },
    { label: copy.rows.support, values: { ...per((p) => p.support), selfHosted: sh.support } },
    {
      label: copy.rows.hosting,
      values: { ...per(() => copy.hostingCloud), selfHosted: copy.hostingSelf },
    },
  ];
}

const priceOf = (plan: Plan, b: Billing) => (b === "monthly" ? plan.monthly : plan.yearly);

/* ─────────────────────────── billing toggle ─────────────────────────── */

export function BillingToggle({
  billing: value,
  onChange,
  layoutId = "billing-pill",
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
  layoutId?: string;
}) {
  const options: { id: Billing; label: string }[] = [
    { id: "monthly", label: copy.monthly },
    { id: "yearly", label: copy.yearly },
  ];
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div
        className="relative flex rounded-full border border-border bg-background/60 p-1"
        role="group"
        aria-label={copy.billingLabel}
      >
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={value === o.id}
            onClick={() => onChange(o.id)}
            className={cn(
              "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
              value === o.id
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {value === o.id && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-primary shadow-glow"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        ))}
      </div>
      <span className="rounded-full bg-success/12 px-2.5 py-1 font-mono text-[11px] text-success">
        {copy.freeMonths}
      </span>
    </div>
  );
}

/* ─────────────────────────── full table ─────────────────────────── */

type PricingTableProps = {
  heading: SectionHeading;
  /** Highlight the plan recommended by the simulator. */
  recommendedId?: PlanId;
  id?: string;
};

/** Full comparison: Starter / Pro / Business + Entreprise auto-hébergé.
 *  Desktop: one wide table. Mobile: a plan switcher. */
export function PricingTable({ heading, recommendedId, id }: PricingTableProps) {
  const [bill, setBill] = useState<Billing>("yearly");
  const rows = buildRows();

  return (
    <section id={id} className="relative scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader {...heading} />
          <BillingToggle billing={bill} onChange={setBill} />
        </div>

        <DesktopTable rows={rows} bill={bill} recommendedId={recommendedId} />
        <MobilePlans rows={rows} bill={bill} recommendedId={recommendedId} />

        <p className="mt-6 font-mono text-xs text-muted-foreground">
          {billing.currencyLabel} · 1 crédit = {creditCosts.madPerCredit} {billing.currencyLabel}
        </p>
      </div>
    </section>
  );
}

const columns: ColumnId[] = [...plans.map((p) => p.id), "selfHosted"];

function DesktopTable({
  rows,
  bill,
  recommendedId,
}: {
  rows: ReturnType<typeof buildRows>;
  bill: Billing;
  recommendedId: PlanId | undefined;
}) {
  return (
    <div className="border-light relative mt-14 hidden rounded-3xl bg-navy/40 lg:block">
      <table className="w-full table-fixed border-collapse text-sm">
        <caption className="sr-only">{heading(bill)}</caption>
        <colgroup>
          <col className="w-[22%]" />
          {columns.map((c) => (
            <col key={c} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className="p-6 text-start align-bottom">
              <span className="section-label text-[10px]">{copy.rowsLabel}</span>
            </th>
            {columns.map((c) => (
              <th
                key={c}
                scope="col"
                className={cn(
                  "relative p-6 text-start align-top font-normal",
                  c === "pro" && "bg-primary/[0.06]",
                  c === "selfHosted" && "border-s border-dashed border-border",
                )}
              >
                {c === "pro" && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-primary-glow"
                  />
                )}
                <PlanHead column={c} bill={bill} recommended={recommendedId === c} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-border/70">
              <th scope="row" className="px-6 py-3.5 text-start font-normal text-muted-foreground">
                {row.label}
              </th>
              {columns.map((c) => (
                <td
                  key={c}
                  className={cn(
                    "px-6 py-3.5 text-foreground",
                    c === "pro" && "bg-primary/[0.06]",
                    c === "selfHosted" && "border-s border-dashed border-border",
                  )}
                >
                  <CellValue value={row.values[c]} />
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-border/70">
            <td />
            {columns.map((c) => (
              <td
                key={c}
                className={cn(
                  "p-6",
                  c === "pro" && "rounded-b-3xl bg-primary/[0.06]",
                  c === "selfHosted" && "border-s border-dashed border-border",
                )}
              >
                <PlanCta column={c} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const heading = (bill: Billing) => (bill === "monthly" ? copy.monthly : copy.yearly);

function PlanHead({
  column,
  bill,
  recommended,
}: {
  column: ColumnId;
  bill: Billing;
  recommended: boolean;
}) {
  if (column === "selfHosted") {
    return (
      <div>
        <p className="font-display text-lg font-semibold text-foreground">{copy.selfHostedName}</p>
        <p className="mt-1 min-h-10 text-xs leading-snug text-muted-foreground">
          {copy.selfHostedTarget}
        </p>
        <p className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground">
          {frNumber(selfHosted.yearly)}
        </p>
        <p className="font-mono text-[11px] text-muted-foreground">
          {billing.currencyLabel}
          {copy.perYear}
        </p>
        <p className="mt-1 h-4 font-mono text-[11px] text-primary">
          {fill(copy.selfHostedSetup, { n: frNumber(selfHosted.setup) })}
        </p>
      </div>
    );
  }
  const plan = plans.find((p) => p.id === column);
  if (!plan) return null;
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-display text-lg font-semibold text-foreground">{plan.name}</p>
        {plan.highlighted && (
          <span className="rounded-full bg-gradient-to-r from-primary to-primary-glow px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
            {copy.popular}
          </span>
        )}
      </div>
      <p className="mt-1 min-h-10 text-xs leading-snug text-muted-foreground">{plan.target}</p>
      <p className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground">
        <Ticker value={priceOf(plan, bill)} duration={0.5} />
      </p>
      <p className="font-mono text-[11px] text-muted-foreground">
        {billing.currencyLabel}
        {bill === "monthly" ? copy.perMonth : copy.perYear}
      </p>
      <p className="mt-1 h-4 font-mono text-[11px] text-primary">
        {bill === "yearly" &&
          fill(copy.yearlyEquivalent, { n: frNumber(Math.round(plan.yearly / 12)) })}
      </p>
      {recommended && (
        <span className="mt-3 inline-flex rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">
          {copy.recommended}
        </span>
      )}
    </div>
  );
}

function PlanCta({ column }: { column: ColumnId }) {
  if (column === "selfHosted") {
    return (
      <AppLink
        href={routes.enterprise}
        className="flex h-11 w-full items-center justify-center rounded-full border border-border text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
      >
        {copy.selfHostedCta}
      </AppLink>
    );
  }
  if (column === "pro") {
    return (
      <TrialCta size="md" surface={`pricing_${column}`} block>
        {copy.cta}
      </TrialCta>
    );
  }
  return (
    <a
      {...trialLinkProps(`pricing_${column}`)}
      className="flex h-11 w-full items-center justify-center rounded-full border border-border text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
    >
      {copy.cta}
    </a>
  );
}

function CellValue({ value }: { value: Cell }) {
  if (value === true)
    return (
      <>
        <Check className="size-4 text-primary" aria-hidden />
        <span className="sr-only">{copy.included}</span>
      </>
    );
  if (value === false)
    return (
      <>
        <Minus className="size-4 text-muted-foreground/40" aria-hidden />
        <span className="sr-only">{copy.notIncluded}</span>
      </>
    );
  return <span>{value}</span>;
}

/* ─────────────────────────── mobile switcher ─────────────────────────── */

function MobilePlans({
  rows,
  bill,
  recommendedId,
}: {
  rows: ReturnType<typeof buildRows>;
  bill: Billing;
  recommendedId: PlanId | undefined;
}) {
  const names: Record<ColumnId, string> = {
    ...(Object.fromEntries(plans.map((p) => [p.id, p.name])) as Record<PlanId, string>),
    selfHosted: copy.selfHostedName,
  };
  return (
    <Tabs.Root defaultValue="pro" className="mt-10 lg:hidden">
      <Tabs.List
        aria-label={copy.switcherLabel}
        className="grid grid-cols-4 gap-1 rounded-full border border-border bg-background/60 p-1"
      >
        {columns.map((c) => (
          <Tabs.Trigger
            key={c}
            value={c}
            className="rounded-full px-1 py-2 text-xs font-medium text-muted-foreground transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:text-sm"
          >
            {names[c]}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {columns.map((c) => (
        <Tabs.Content
          key={c}
          value={c}
          className={cn(
            "border-light mt-5 rounded-3xl p-6 outline-none",
            c === "pro" ? "bg-[oklch(0.2_0.045_256)]" : "bg-navy/40",
          )}
        >
          <PlanHead column={c} bill={bill} recommended={recommendedId === c} />
          <dl className="mt-6 divide-y divide-border/70 border-t border-border/70">
            {rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 py-3 text-sm">
                <dt className="text-muted-foreground">{row.label}</dt>
                <dd className="text-end text-foreground">
                  <CellValue value={row.values[c]} />
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <PlanCta column={c} />
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

/* ─────────────────────────── home summary ─────────────────────────── */

type PricingSummaryProps = {
  heading: SectionHeading;
  link: { label: string; href: string };
  labels: { perMonth: string; fromYearly: string; credits: string };
  children?: ReactNode;
};

/** Short pricing strip for the home page: three plans on one rail, link to /tarifs. */
export function PricingSummary({ heading, link, labels }: PricingSummaryProps) {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader {...heading} />
          <MoreLink href={link.href} label={link.label} className="shrink-0" />
        </div>
        <ol className="mt-14 grid border-y border-border md:grid-cols-3">
          {plans.map((plan) => (
            <li
              key={plan.id}
              className={cn(
                "relative py-8 md:px-8 md:first:ps-0 [&:not(:first-child)]:border-t md:[&:not(:first-child)]:border-t-0 md:[&:not(:first-child)]:border-s",
                plan.highlighted &&
                  "md:bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.681_0.147_238.6/0.14),transparent_70%)]",
              )}
            >
              {plan.highlighted && (
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 hidden h-0.5 bg-gradient-to-r from-primary to-primary-glow md:block"
                />
              )}
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl font-semibold text-foreground">{plan.name}</h3>
                {plan.highlighted && (
                  <span className="rounded-full bg-gradient-to-r from-primary to-primary-glow px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                    {copy.popular}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{plan.target}</p>
              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display text-5xl font-bold tracking-tight text-foreground">
                  {frNumber(plan.monthly)}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {billing.currencyLabel}
                  {labels.perMonth}
                </span>
              </p>
              <p className="mt-1 font-mono text-xs text-primary">
                {fill(labels.fromYearly, { n: frNumber(Math.round(plan.yearly / 12)) })}
              </p>
              <p className="mt-4 text-sm text-foreground/90">
                {fill(labels.credits, { n: frNumber(plan.credits) })}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
