import { motion, useReducedMotion } from "framer-motion";
import { Ticker, frNumber } from "@/components/fx/Ticker";
import { comparator, plans, pricing, problem } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

export function Problem() {
  const reduce = useReducedMotion();
  const pro = plans.find((p) => p.id === "pro");
  const r = problem.receipt;

  return (
    <section id={problem.id} className="relative py-28 lg:py-40">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <p className="section-label flex items-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary" aria-hidden />
          {problem.index} — {problem.label}
        </p>

        {/* Big statement */}
        <h2 className="mt-8 font-display text-[clamp(38px,6.4vw,92px)] leading-[1.02] font-bold tracking-[-0.035em]">
          {problem.statement.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className={i === 2 ? "block text-muted-foreground/60" : "block text-foreground"}
                initial={reduce ? false : { y: "100%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease, delay: i * 0.18 }}
              >
                {line.before && <>{line.before} </>}
                {line.n !== null && (
                  <Ticker value={line.n} duration={1.6} className="text-gradient-blue" />
                )}
                {line.after && <> {line.after}</>}
              </motion.span>
            </span>
          ))}
        </h2>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">{problem.title}.</p>

        {/* 4 pains: horizontal list, outlined numbers, thin dividers */}
        <ol className="mt-24 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {problem.cards.map((c, i) => (
            <motion.li
              key={c.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className="border-b border-border py-10 sm:pe-8 lg:border-b-0 lg:border-s lg:ps-6 lg:first:border-s-0 lg:first:ps-0"
            >
              <span className="text-outline block font-display text-[88px] leading-none font-bold tracking-tighter">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-xl font-semibold text-foreground">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </motion.li>
          ))}
        </ol>

        {/* Cost: 7/5 split, receipt on the right */}
        <div className="mt-28 grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="h2-display text-foreground">{r.title}</h3>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">{r.lead}</p>
          </div>

          <motion.div
            className="lg:col-span-5"
            initial={reduce ? false : { opacity: 0, y: -40, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
          >
            <div
              className="mx-auto max-w-sm bg-[oklch(0.96_0.008_250)] px-7 pt-8 pb-12 font-mono text-[13px] text-[oklch(0.25_0.03_258)] shadow-[0_40px_80px_-30px_oklch(0.681_0.147_238.6/0.55)]"
              style={{
                maskImage:
                  "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 18px 100%",
                WebkitMask:
                  "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 18px 100%",
              }}
            >
              <p className="text-center text-[11px] tracking-[0.2em]">{r.header}</p>
              <p className="mt-1 text-center text-[11px] opacity-60">{r.subheader}</p>
              <div className="my-5 border-t border-dashed border-current/40" />
              <ul className="space-y-4">
                {r.lines.map((l) => (
                  <li key={l.label}>
                    <div className="flex items-baseline gap-2">
                      <span>{l.label}</span>
                      <span className="flex-1 border-b border-dotted border-current/40" />
                      <span className="font-semibold whitespace-nowrap">{l.amount}</span>
                    </div>
                    <p className="text-end text-[11px] opacity-60">{l.unit}</p>
                  </li>
                ))}
              </ul>
              <div className="my-5 border-t border-dashed border-current/40" />
              <p className="text-[11px] tracking-wider">{r.totalLabel}</p>
              <p className="mt-1 text-2xl font-bold tracking-tight">
                {frNumber(comparator.charged.min * 12)}–{frNumber(comparator.charged.max * 12)} MAD
              </p>
              <div className="my-5 border-t border-dashed border-current/40" />
              {pro && (
                <div className="flex items-baseline justify-between gap-2 text-[oklch(0.5_0.15_240)]">
                  <span>{r.footer}</span>
                  <span className="font-bold">
                    {frNumber(pro.yearly)} {pricing.currencyLabel}
                  </span>
                </div>
              )}
              <div
                aria-hidden
                className="mt-6 h-10 bg-[repeating-linear-gradient(90deg,currentColor_0_2px,transparent_2px_4px,currentColor_4px_5px,transparent_5px_9px)] opacity-70"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
