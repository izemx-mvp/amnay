import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";

type RevealWordsProps = {
  text: string;
  /** Words (exact, punctuation included) rendered with the blue gradient + underline sweep. */
  highlight?: readonly string[];
  as?: "h1" | "h2" | "p";
  className?: string;
  /** Reveal on first paint with CSS (hero) instead of on scroll. */
  immediate?: boolean;
  delay?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;
const underline =
  "absolute inset-x-0 bottom-[0.02em] h-[0.07em] origin-left rounded-full bg-gradient-to-r from-primary to-primary-glow";

/** Headline revealed word by word: each word rises out of its own clipped line box. */
export function RevealWords(props: RevealWordsProps) {
  return props.immediate ? <CssReveal {...props} /> : <ScrollReveal {...props} />;
}

function CssReveal({ text, highlight = [], as = "h1", className, delay = 0 }: RevealWordsProps) {
  const Tag = as;
  const words = text.split(" ");
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => {
        const hl = highlight.includes(word);
        const wordDelay = delay * 1000 + i * 70;
        return (
          <Fragment key={i}>
            <span aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <span
                className={`animate-word-in inline-block ${hl ? "relative text-gradient-blue" : ""}`}
                style={{ animationDelay: `${wordDelay}ms` }}
              >
                {word}
                {hl && (
                  <span
                    className={`${underline} animate-sweep-in`}
                    style={{ animationDelay: `${wordDelay + 450}ms` }}
                  />
                )}
              </span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        );
      })}
    </Tag>
  );
}

function ScrollReveal({ text, highlight = [], as = "h2", className, delay = 0 }: RevealWordsProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");
  const trigger = reduce
    ? { initial: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-60px" } };

  return (
    <Tag
      className={className}
      {...trigger}
      variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => {
        const hl = highlight.includes(word);
        return (
          <Fragment key={i}>
            <span aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <motion.span
                className={hl ? "relative inline-block text-gradient-blue" : "inline-block"}
                variants={{
                  hidden: { y: "105%", opacity: 0 },
                  show: { y: "0%", opacity: 1, transition: { duration: 0.7, ease } },
                }}
              >
                {word}
                {hl && (
                  <motion.span
                    className={underline}
                    variants={{
                      hidden: { scaleX: 0 },
                      show: { scaleX: 1, transition: { duration: 0.9, ease, delay: 0.45 } },
                    }}
                  />
                )}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        );
      })}
    </Tag>
  );
}
