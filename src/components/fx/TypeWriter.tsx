import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypeWriterProps = {
  text: string;
  /** Types only while active (on screen / current step). */
  active: boolean;
  /** ms per character. */
  speed?: number;
  /** Restart after this pause once finished; omit to hold the full text. */
  loopAfter?: number;
  className?: string;
};

/** Text typed character by character with a blinking caret. */
export function TypeWriter({ text, active, speed = 28, loopAfter, className }: TypeWriterProps) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active || reduce) return;
    if (n >= text.length) {
      if (loopAfter === undefined) return;
      const t = setTimeout(() => setN(0), loopAfter);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setN((v) => v + 1), text[n] === " " ? speed * 0.5 : speed);
    return () => clearTimeout(t);
  }, [active, reduce, n, text, speed, loopAfter]);

  const shown = reduce ? text : text.slice(0, n);
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {shown}
        <span className="animate-caret ms-px inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-primary" />
      </span>
    </span>
  );
}
