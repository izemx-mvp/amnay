import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Clock } from "lucide-react";
import { Magnetic } from "@/components/fx/Magnetic";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { demo } from "@/content/home";
import { pushDataLayer } from "@/lib/tracking";
import { cn } from "@/lib/utils";

const f = demo.form;

const schema = z.object({
  name: z.string().trim().min(2, demo.errors.name),
  company: z.string().trim().min(2, demo.errors.company),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9][0-9\s.-]{7,16}$/, demo.errors.phone),
  sector: z.string().min(1, demo.errors.sector),
  size: z.string().min(1, demo.errors.size),
});
type FormValues = z.infer<typeof schema>;

export function Demo() {
  const [slot, setSlot] = useState<string | null>(null);

  return (
    <section id={demo.id} className="relative py-20 lg:py-28">
      {/* full-bleed glowing panel */}
      <div className="relative overflow-hidden border-y border-primary/20 bg-[radial-gradient(ellipse_80%_70%_at_30%_0%,oklch(0.681_0.147_238.6/0.22),transparent_70%),linear-gradient(180deg,oklch(0.19_0.04_257),oklch(0.16_0.03_259))]">
        <div aria-hidden className="grid-fade pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-6">
            <SectionHeader
              index={demo.index}
              label={demo.label}
              title={demo.title}
              highlight={demo.highlight}
            >
              <p className="mt-6 max-w-md text-lg text-muted-foreground">{demo.pitch}</p>
            </SectionHeader>
            <MockCalendar slot={slot} onSlot={setSlot} />
          </div>
          <div className="lg:col-span-6 lg:ps-6">
            <DemoForm slot={slot} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── calendar (visual only) ─────────────── */

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
    <div className="border-light mt-12 max-w-md rounded-2xl bg-background/50 p-5 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-display font-semibold whitespace-nowrap text-foreground capitalize">
          {month?.label ?? " "}
        </p>
        <p className="flex items-center gap-1.5 font-mono text-[11px] text-primary">
          <Clock className="size-3" aria-hidden />
          {demo.calendarTagline}
        </p>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-muted-foreground">
        {demo.weekdays.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
      <div
        className="mt-1 grid min-h-[180px] grid-cols-7 gap-1"
        role="group"
        aria-label="Jours disponibles (indicatif)"
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
        {demo.slots.map((s) => (
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
      <p className="mt-4 text-xs text-muted-foreground">{demo.calendarNote}</p>
    </div>
  );
}

/* ─────────────── form ─────────────── */

function DemoForm({ slot }: { slot: string | null }) {
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

  // No backend endpoint yet: the request goes to the tag manager, which routes it.
  const onSubmit = (values: FormValues) => {
    pushDataLayer("demo_request", { ...values, slot });
    setSent(true);
  };

  return (
    <div className="border-light relative rounded-3xl bg-[oklch(0.17_0.032_258/0.85)] p-6 shadow-elevated sm:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <Success key="ok" />
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            <Field label={f.name} error={errors.name?.message}>
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
            <Field label={f.company} error={errors.company?.message}>
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
            <Field label={f.phone} error={errors.phone?.message}>
              {(id, cls) => (
                <input
                  id={id}
                  type="tel"
                  inputMode="tel"
                  className={cls}
                  placeholder=" "
                  autoComplete="tel"
                  {...register("phone")}
                />
              )}
            </Field>
            <Field label={f.sector} error={errors.sector?.message} floated>
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
                    {f.sectors.map((s) => (
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

            <fieldset>
              <legend className="text-xs text-muted-foreground">{f.size}</legend>
              <input type="hidden" {...register("size")} />
              <div className="mt-2 flex flex-wrap gap-2">
                {f.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={size === s}
                    onClick={() => setValue("size", s, { shouldValidate: true })}
                    className={cn(
                      "rounded-full border px-4 py-2 font-mono text-xs transition-colors",
                      size === s
                        ? "border-primary bg-primary/15 text-foreground"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <ErrorText message={errors.size?.message} />
            </fieldset>

            {slot && (
              <p className="font-mono text-xs text-primary">
                {demo.slotChosen.replace("{slot}", slot)}
              </p>
            )}

            <Magnetic className="flex">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-shine h-13 w-full rounded-full bg-primary text-[15px] font-medium text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.681_0.147_238.6/0.8)] transition-colors hover:bg-primary-glow"
              >
                {f.submit}
              </button>
            </Magnetic>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls =
  "peer h-14 w-full rounded-xl border bg-background/40 px-4 pt-5 text-[15px] text-foreground outline-none transition-colors focus:border-primary focus:bg-background/70";

function Field({
  label,
  error,
  floated,
  children,
}: {
  label: string;
  error: string | undefined;
  floated?: boolean;
  children: (id: string, className: string) => ReactNode;
}) {
  const id = useId();
  const cls = cn(inputCls, error ? "border-destructive/70" : "border-border");
  return (
    <div>
      <div className="relative">
        {children(id, cls)}
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute start-4 top-1/2 origin-[0_0] -translate-y-[130%] scale-[0.8] text-sm text-muted-foreground transition-transform duration-200",
            !floated &&
              "peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[130%] peer-focus:scale-[0.8] peer-focus:text-primary",
          )}
        >
          {label}
        </label>
      </div>
      <ErrorText message={error} />
    </div>
  );
}

function ErrorText({ message }: { message: string | undefined }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          role="alert"
          className="mt-1.5 text-xs text-destructive"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Success() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="flex min-h-[420px] flex-col items-center justify-center text-center"
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      role="status"
    >
      <svg viewBox="0 0 80 80" className="size-24" aria-hidden>
        <motion.circle
          cx="40"
          cy="40"
          r="36"
          fill="oklch(0.723 0.192 149.6 / 0.12)"
          stroke="oklch(0.723 0.192 149.6)"
          strokeWidth="2.5"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.path
          d="M25 41 L36 52 L56 30"
          fill="none"
          stroke="oklch(0.723 0.192 149.6)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, delay: 0.5, ease: "easeOut" }}
        />
      </svg>
      <p className="mt-6 max-w-sm text-lg text-foreground">{f.success}</p>
    </motion.div>
  );
}
