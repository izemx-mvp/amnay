import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useFinePointer } from "./hooks";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  size?: number;
  /** Extra attributes for the surface (e.g. data-active). */
  active?: boolean;
};

/** Large surface with a soft light that follows the cursor (desktop only).
 *  The light is a blurred disc moved with transform, so it never repaints the surface. */
export function Spotlight({ children, className, size = 520, active }: SpotlightProps) {
  const fine = useFinePointer();
  const light = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = light.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    el.style.transform = `translate3d(${e.clientX - r.left - size / 2}px, ${e.clientY - r.top - size / 2}px, 0)`;
  };

  return (
    <div
      className={cn("group/spot relative overflow-hidden", className)}
      onPointerMove={fine ? onMove : undefined}
      data-active={active ? "true" : undefined}
    >
      {fine && (
        <div
          ref={light}
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-0 rounded-full opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
          style={{
            width: size,
            height: size,
            background: "radial-gradient(circle, oklch(0.681 0.147 238.6 / 0.16), transparent 65%)",
          }}
        />
      )}
      {children}
    </div>
  );
}
