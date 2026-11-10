import type { CSSProperties } from "react";
import type { ImageAsset } from "@/config/images";
import { cn } from "@/lib/utils";

type BaseProps = {
  image: ImageAsset;
  /** Overrides the French alt from config; pass "" for a decorative copy. */
  alt?: string;
  className?: string;
  /** Above-the-fold: eager + high fetch priority instead of lazy. */
  priority?: boolean;
  sizes?: string;
};

type MascotImageProps = BaseProps & {
  /** Radial mask so the square navy edges melt into the page (default on). */
  mask?: boolean;
  /** Gentle idle float (±6px, 4s). Disabled under prefers-reduced-motion. */
  float?: boolean;
  /** Stagger between several floating mascots, in seconds. */
  floatDelay?: number;
};

/**
 * Robot / agent illustration (square files on dark navy).
 * Width/height come from the asset so the box is reserved before load.
 */
export function MascotImage({
  image,
  alt,
  className,
  priority = false,
  sizes,
  mask = true,
  float = false,
  floatDelay = 0,
}: MascotImageProps) {
  return (
    <img
      src={image.src}
      width={image.width}
      height={image.height}
      alt={alt ?? image.alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "auto" : "async"}
      draggable={false}
      className={cn(
        "h-auto select-none",
        mask && "mask-radial-soft",
        float && "animate-float",
        className,
      )}
      style={
        float && floatDelay ? ({ animationDelay: `${floatDelay}s` } as CSSProperties) : undefined
      }
    />
  );
}

type SceneImageProps = BaseProps & {
  /** Soft fade on every edge, for scenes sitting directly on the page background. */
  fade?: boolean;
  /** Inner vignette darkening the corners. */
  vignette?: boolean;
  /** Classes for the <img> itself (object-position, aspect…). */
  imgClassName?: string;
};

/** Wide scene illustration (the user + his agent), rounded with optional vignette. */
export function SceneImage({
  image,
  alt,
  className,
  priority = false,
  sizes,
  fade = false,
  vignette = true,
  imgClassName,
}: SceneImageProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-3xl", fade && "mask-edge-soft", className)}
    >
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt ?? image.alt}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "auto" : "async"}
        draggable={false}
        className={cn("block h-auto w-full select-none", imgClassName)}
      />
      {vignette && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_at_center,transparent_55%,oklch(0.149_0.026_259.1/0.7)_100%)] shadow-[inset_0_0_0_1px_oklch(1_0_0/0.06)]"
        />
      )}
    </div>
  );
}

/** Empty state: a small floating mascot beside a line of copy. */
export function EmptyState({
  image,
  text,
  className,
}: {
  image: ImageAsset;
  text: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-5 sm:gap-6", className)}>
      <MascotImage image={image} float sizes="128px" className="w-24 shrink-0 sm:w-32" />
      <p className="text-lg text-muted-foreground">{text}</p>
    </div>
  );
}
