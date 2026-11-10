import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { forms } from "@/content/common";
import { submitLead } from "@/lib/leads";
import { Field, FormShell, SubmitButton, Success } from "./FormKit";

const e = forms.errors;
const schema = z.object({
  name: z.string().trim().min(2, e.name),
  company: z.string().trim().min(2, e.company),
  email: z.string().trim().email(e.email),
});
type FormValues = z.infer<typeof schema>;

/** Webinar registration: name, company, e-mail → submitLead("webinar"). */
export function WebinarForm({
  session,
  labels,
}: {
  /** Session identifier sent with the lead (ISO date or "tbd"). */
  session: string;
  labels: { submit: string; success: string; successTitle: string };
}) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { name: "", company: "", email: "" },
  });

  const onSubmit = async (values: FormValues) => {
    await submitLead("webinar", { ...values, session });
    setSent(true);
  };

  return (
    <FormShell>
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <Success key="ok" title={labels.successTitle} message={labels.success} />
        ) : (
          <motion.form
            key="form"
            noValidate
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
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
            <Field label={forms.email} error={errors.email?.message}>
              {(id, cls) => (
                <input
                  id={id}
                  type="email"
                  className={cls}
                  placeholder=" "
                  autoComplete="email"
                  {...register("email")}
                />
              )}
            </Field>
            <SubmitButton pending={isSubmitting}>{labels.submit}</SubmitButton>
            <p className="text-center text-xs text-muted-foreground">{forms.consent}</p>
          </motion.form>
        )}
      </AnimatePresence>
    </FormShell>
  );
}
