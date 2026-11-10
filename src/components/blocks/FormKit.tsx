import { useEffect, useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/fx/Magnetic";
import { MascotImage } from "@/components/shared/Mascot";
import { botImages } from "@/config/images";
import { forms } from "@/content/common";
import { cn } from "@/lib/utils";

/** Shared form primitives: floating-label fields, chip groups, success state. */

export const inputCls =
  "peer h-14 w-full rounded-xl border bg-background/40 px-4 pt-5 text-[15px] text-foreground outline-none transition-colors focus:border-primary focus:bg-background/70";

export function Field({
  label,
  error,
  floated,
  prefix,
  multiline,
  children,
}: {
  label: string;
  error: string | undefined;
  /** Label always floated (selects). */
  floated?: boolean;
  /** Fixed prefix inside the field (e.g. +212). */
  prefix?: string;
  /** Textarea: label pinned to the top edge. */
  multiline?: boolean;
  children: (id: string, className: string) => ReactNode;
}) {
  const id = useId();
  const cls = cn(inputCls, error ? "border-destructive/70" : "border-border", prefix && "ps-16");
  const errorId = `${id}-error`;
  return (
    <div>
      <div className="relative">
        {children(id, cls)}
        {prefix && (
          <span className="pointer-events-none absolute start-4 bottom-[9px] font-mono text-[15px] text-muted-foreground">
            {prefix}
          </span>
        )}
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute start-4 origin-[0_0] scale-[0.8] text-sm text-muted-foreground transition-transform duration-200",
            multiline ? "top-2" : "top-1/2 -translate-y-[130%]",
            !floated &&
              !multiline &&
              !prefix &&
              "peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[130%] peer-focus:scale-[0.8] peer-focus:text-primary",
          )}
        >
          {label}
        </label>
      </div>
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

export function ErrorText({ message, id }: { message: string | undefined; id?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={id}
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

/** Single-choice chips bound to a hidden form value. */
export function ChipGroup({
  legend,
  options,
  value,
  onChange,
  error,
}: {
  legend: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error: string | undefined;
}) {
  return (
    <fieldset>
      <legend className="text-xs text-muted-foreground">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={value === s}
            onClick={() => onChange(s)}
            className={cn(
              "rounded-full border px-4 py-2 font-mono text-xs transition-colors",
              value === s
                ? "border-primary bg-primary/15 text-foreground"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <ErrorText message={error} />
    </fieldset>
  );
}

export function SubmitButton({ children, pending }: { children: ReactNode; pending: boolean }) {
  // Disabled until hydrated: a pre-hydration click would do a native GET and put the lead in the URL.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <Magnetic className="flex">
      <button
        type="submit"
        disabled={pending || !ready}
        className="btn-shine h-13 w-full rounded-full bg-primary text-[15px] font-medium text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.681_0.147_238.6/0.8)] transition-colors hover:bg-primary-glow disabled:opacity-70"
      >
        {pending ? forms.sending : children}
      </button>
    </Magnetic>
  );
}

export function FormShell({ children }: { children: ReactNode }) {
  return (
    <div className="border-light relative rounded-3xl bg-[oklch(0.17_0.032_258/0.85)] p-6 shadow-elevated sm:p-9">
      {children}
    </div>
  );
}

export function Success({ title, message }: { title: string; message: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="flex min-h-[420px] flex-col items-center justify-center text-center"
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      role="status"
    >
      {/* the agent gives a thumbs-up: springs in, then idles */}
      <motion.div
        initial={reduce ? false : { scale: 0.3, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 14, delay: 0.1 }}
      >
        <MascotImage
          image={botImages.pouce}
          priority
          float
          sizes="176px"
          className="w-40 sm:w-44"
        />
      </motion.div>
      <p className="mt-6 font-display text-2xl font-semibold text-foreground">{title}</p>
      <p className="mt-2 max-w-sm text-muted-foreground">{message}</p>
    </motion.div>
  );
}

/** Moroccan phone: accepts 06…, 6…, +212 6…, with spaces/dots/dashes. */
export const phoneRegex = /^(\+?212|0)?\s?[5-7]([\s.-]?\d){8}$/;
