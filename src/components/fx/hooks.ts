import { useEffect, useState, type RefObject } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/** True only on desktop with a fine pointer and motion allowed: gates tilt,
 *  cursor spotlight and magnetic buttons. False during SSR and on mobile. */
export function useFinePointer() {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return fine && !reduce;
}

/** Whether a looping animation should run: element on screen and motion allowed. */
export function useLoop(ref: RefObject<Element | null>, margin = "0px") {
  const reduce = useReducedMotion();
  const inView = useInView(ref, { margin: margin as `${number}px` });
  return inView && !reduce;
}

/** Interval that only ticks while `active`. */
export function useTicker(active: boolean, ms: number, onTick: () => void) {
  useEffect(() => {
    if (!active) return;
    const t = setInterval(onTick, ms);
    return () => clearInterval(t);
    // onTick is expected to use functional state updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, ms]);
}
