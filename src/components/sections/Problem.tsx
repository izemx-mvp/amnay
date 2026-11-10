import { motion, useReducedMotion } from "framer-motion";
import { Ticker } from "@/components/fx/Ticker";
import { SceneImage } from "@/components/shared/Mascot";
import { sceneImages } from "@/config/images";
import { problem } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

/** Home: big statement beside the "before" scene, the four pains, and the "receipt" of today's cost. */
export function Problem() {
  const reduce = useReducedMotion();
  const r = problem.receipt;

  return (
    <section className="relative py-28 lg:py-36">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <p className="section-label flex items-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary" aria-hidden />
          {problem.index} — {problem.label}
        </p>

        {/* "Before": the user buried in files (7/12) beside the big statement (5/12). */}
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:order-2 lg:col-span-5">
            <h2 className="font-display text-[clamp(38px,6.4vw,92px)] leading-[1.02] font-bold tracking-[-0.035em] lg:text-[clamp(44px,4.6vw,68px)]">
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
            <p className="mt-8 max-w-xl text-lg text-muted-foreground">{problem.lead}</p>
          </div>
          <motion.div
            className="lg:order-1 lg:col-span-7"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
          >
            <SceneImage image={sceneImages.probleme} fade sizes="(min-width: 1024px) 58vw, 100vw" />
          </motion.div>
        </div>

        {/* 4 pains (2×2, hairlines) beside the cost receipt */}
        <div className="mt-16 grid items-center gap-14 lg:grid-cols-12">
          <ol className="grid border-t border-border sm:grid-cols-2 lg:col-span-7">
            {problem.pains.map((c, i) => (
              <motion.li
                key={c.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="border-b border-border py-8 sm:pe-8 sm:even:border-s sm:even:ps-8 sm:even:pe-0"
              >
                <span className="text-outline block font-display text-[64px] leading-none font-bold tracking-tighter">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </motion.li>
            ))}
          </ol>

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
              <p className="mt-1 text-2xl font-bold tracking-tight">{r.total}</p>
              <div className="my-5 border-t border-dashed border-current/40" />
              <div className="flex items-baseline justify-between gap-2 text-[oklch(0.5_0.15_240)]">
                <span>{r.footer}</span>
                <span className="font-bold">{r.footerAmount}</span>
              </div>
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
