import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock } from "lucide-react";
import { urls } from "@/config/site";
import { bookingCopy, demoFormCopy as copy } from "@/content/blocks";
import { forms } from "@/content/common";
import { fill } from "@/lib/format";
import { submitLead } from "@/lib/leads";
import { cn } from "@/lib/utils";
import { ChipGroup, Field, FormShell, SubmitButton, Success, phoneRegex } from "./FormKit";

const e = forms.errors;
const schema = z.object({
  name: z.string().trim().min(2, e.name),
  company: z.string().trim().min(2, e.company),
  phone: z.string().trim().regex(phoneRegex, e.phone),
  sector: z.string().min(1, e.sector),
  size: z.string().min(1, e.size),
});
type FormValues = z.infer<typeof schema>;

export type DemoContext = { offre?: string; segment?: string };

/** Demo request form (zod-validated). Context from the URL is sent with the lead. */
export function DemoForm({
  slot,
  context = {},
  contextLabels,
}: {
  slot?: string | null;
  context?: DemoContext;
  contextLabels?: string[];
}) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { name: "", company: "", phone: "", sector: "", size: "" },
  });
  const size = watch("size");

  const onSubmit = async (values: FormValues) => {
    await submitLead("demo", {
      ...values,
      phone: `${forms.phonePrefix} ${values.phone}`,
      slot,
      ...context,
    });
    setSent(true);
  };

  return (
    <FormShell>
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <Success key="ok" title={copy.successTitle} message={copy.success} />
        ) : (
          <motion.form
            key="form"
            noValidate
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            {contextLabels && contextLabels.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {contextLabels.map((l) => (
                  <li
                    key={l}
                    className="rounded-full bg-primary/12 px-3 py-1 font-mono text-[11px] text-primary"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            )}
            <Field label={forms.name} error={errors.name?.message}>
              {(id, cls) => (
                <input
                  id={id}
                  className={cls}
                  placeholder=" "
                  autoComplete="name"
                  {...register("name")}
                />
              )}
            </Field>
            <Field label={forms.company} error={errors.company?.message}>
              {(id, cls) => (
                <input
                  id={id}
                  className={cls}
                  placeholder=" "
                  autoComplete="organization"
                  {...register("company")}
                />
              )}
            </Field>
            <Field label={forms.phone} error={errors.phone?.message} prefix={forms.phonePrefix}>
              {(id, cls) => (
                <input
                  id={id}
                  type="tel"
                  inputMode="tel"
                  className={cls}
                  placeholder="6 12 34 56 78"
                  autoComplete="tel-national"
                  {...register("phone")}
                />
              )}
            </Field>
            <Field label={forms.sector} error={errors.sector?.message} floated>
              {(id, cls) => (
                <>
                  <select
                    id={id}
                    className={cn(cls, "appearance-none pe-10")}
                    {...register("sector")}
                  >
                    <option value="" disabled>
                      —
                    </option>
                    {forms.sectors.map((s) => (
                      <option key={s} value={s} className="bg-popover">
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                </>
              )}
            </Field>

            <input type="hidden" {...register("size")} />
            <ChipGroup
              legend={forms.size}
              options={forms.sizes}
              value={size}
              onChange={(v) => setValue("size", v, { shouldValidate: true })}
              error={errors.size?.message}
            />

            {slot && (
              <p className="font-mono text-xs text-primary">
                {fill(bookingCopy.slotChosen, { slot })}
              </p>
            )}

            <SubmitButton pending={isSubmitting}>{copy.submit}</SubmitButton>
            <p className="text-center text-xs text-muted-foreground">{forms.consent}</p>
          </motion.form>
        )}
      </AnimatePresence>
    </FormShell>
  );
}

/* ─────────────── booking: iframe when configured, styled calendar otherwise ─────────────── */

export function BookingArea({
  slot,
  onSlot,
}: {
  slot: string | null;
  onSlot: (s: string | null) => void;
}) {
  if (urls.demoBookingUrl) {
    return (
      <div className="border-light overflow-hidden rounded-2xl bg-background/50">
        <iframe
          src={urls.demoBookingUrl}
          title={bookingCopy.iframeTitle}
          className="h-[640px] w-full"
          loading="lazy"
        />
      </div>
    );
  }
  return <MockCalendar slot={slot} onSlot={onSlot} />;
}

function MockCalendar({
  slot,
  onSlot,
}: {
  slot: string | null;
  onSlot: (s: string | null) => void;
}) {
  // Dates are computed on the client so SSR output never disagrees with hydration.
  const [today, setToday] = useState<Date | null>(null);
  const [day, setDay] = useState<number | null>(null);
  useEffect(() => setToday(new Date()), []);

  const month = useMemo(() => {
    if (!today) return null;
    const build = (y: number, m: number) => {
      const first = new Date(y, m, 1);
      const count = new Date(y, m + 1, 0).getDate();
      const days = Array.from({ length: count }, (_, i) => {
        const date = new Date(y, m, i + 1);
        const wd = date.getDay();
        return { d: i + 1, open: date > today && wd !== 0 && wd !== 6 };
      });
      return {
        label: new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(first),
        offset: (first.getDay() + 6) % 7, // Monday-first
        days,
      };
    };
    // Near the end of a month, show the next one so there are always slots to pick.
    const current = build(today.getFullYear(), today.getMonth());
    return current.days.filter((x) => x.open).length >= 5
      ? current
      : build(today.getFullYear(), today.getMonth() + 1);
  }, [today]);

  useEffect(() => {
    if (month && day === null) setDay(month.days.find((x) => x.open)?.d ?? null);
  }, [month, day]);

  return (
    <div className="border-light rounded-2xl bg-background/50 p-5 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-display font-semibold whitespace-nowrap text-foreground capitalize">
          {month?.label ?? " "}
        </p>
        <p className="flex items-center gap-1.5 font-mono text-[11px] text-primary">
          <Clock className="size-3" aria-hidden />
          {bookingCopy.tagline}
        </p>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-muted-foreground">
        {bookingCopy.weekdays.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
      <div
        className="mt-1 grid min-h-[180px] grid-cols-7 gap-1"
        role="group"
        aria-label={bookingCopy.daysLabel}
      >
        {month && Array.from({ length: month.offset }).map((_, i) => <span key={`e${i}`} />)}
        {month?.days.map(({ d, open }) => (
          <button
            key={d}
            type="button"
            disabled={!open}
            onClick={() => {
              setDay(d);
              onSlot(null);
            }}
            aria-pressed={day === d}
            className={cn(
              "aspect-square rounded-lg text-xs transition-colors",
              !open && "text-muted-foreground/30",
              open && day !== d && "text-foreground hover:bg-primary/10",
              day === d && "bg-primary font-semibold text-primary-foreground shadow-glow",
            )}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {bookingCopy.slots.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={slot === s}
            onClick={() => onSlot(slot === s ? null : s)}
            className={cn(
              "rounded-full border px-3 py-1.5 font-mono text-xs transition-colors",
              slot === s
                ? "border-primary bg-primary/15 text-foreground"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">{bookingCopy.note}</p>
    </div>
  );
}
