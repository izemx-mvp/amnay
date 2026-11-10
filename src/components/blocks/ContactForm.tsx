import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { contactFormCopy as copy } from "@/content/blocks";
import { forms } from "@/content/common";
import { submitLead } from "@/lib/leads";
import { ChipGroup, Field, FormShell, SubmitButton, Success, phoneRegex } from "./FormKit";

const e = forms.errors;
const schema = z.object({
  name: z.string().trim().min(2, e.name),
  company: z.string().trim().min(2, e.company),
  role: z.string().trim().min(2, e.role),
  email: z.string().trim().email(e.email),
  phone: z.string().trim().regex(phoneRegex, e.phone),
  users: z.string().min(1, e.users),
  message: z.string().trim().max(2000).optional(),
});
type FormValues = z.infer<typeof schema>;

/** Enterprise contact form: lead goes through submitLead("contact"). */
export function ContactForm({ source }: { source: string }) {
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
    defaultValues: {
      name: "",
      company: "",
      role: "",
      email: "",
      phone: "",
      users: "",
      message: "",
    },
  });
  const users = watch("users");

  const onSubmit = async (values: FormValues) => {
    await submitLead("contact", {
      ...values,
      phone: `${forms.phonePrefix} ${values.phone}`,
      source,
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
            <div className="grid gap-5 sm:grid-cols-2">
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
            </div>
            <Field label={forms.role} error={errors.role?.message}>
              {(id, cls) => (
                <input
                  id={id}
                  className={cls}
                  placeholder=" "
                  autoComplete="organization-title"
                  {...register("role")}
                />
              )}
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
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
            </div>
            <input type="hidden" {...register("users")} />
            <ChipGroup
              legend={forms.users}
              options={forms.userRanges}
              value={users}
              onChange={(v) => setValue("users", v, { shouldValidate: true })}
              error={errors.users?.message}
            />
            <Field label={forms.message} error={errors.message?.message} multiline>
              {(id, cls) => (
                <textarea
                  id={id}
                  rows={4}
                  className={`${cls} h-auto min-h-28 resize-y pt-7`}
                  placeholder={copy.messagePlaceholder}
                  {...register("message")}
                />
              )}
            </Field>
            <SubmitButton pending={isSubmitting}>{copy.submit}</SubmitButton>
            <p className="text-center text-xs text-muted-foreground">{forms.consent}</p>
          </motion.form>
        )}
      </AnimatePresence>
    </FormShell>
  );
}
