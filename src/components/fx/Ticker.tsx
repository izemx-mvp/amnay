import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const formatters = new Map<number, Intl.NumberFormat>();
export function frNumber(n: number, decimals = 0) {
  let f = formatters.get(decimals);
  if (!f) {
    f = new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    formatters.set(decimals, f);
  }
  return f.format(n);
}

type TickerProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

/** Number ticker: counts up when first visible, then tweens to every new value.
 *  Writes to the DOM directly so a tween never re-renders React. */
export function Ticker({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.2,
  className,
}: TickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const current = useRef(0);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    const write = (n: number) => {
      current.current = n;
      el.textContent = `${prefix}${frNumber(n, decimals)}${suffix}`;
    };
    if (reduce) {
      write(value);
      return;
    }
    const controls = animate(current.current, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: write,
    });
    return () => controls.stop();
  }, [inView, reduce, value, prefix, suffix, decimals, duration]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {frNumber(0, decimals)}
      {suffix}
    </span>
  );
}
