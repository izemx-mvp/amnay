import type { ComponentProps, ImgHTMLAttributes } from "react";

type Theme = "dark" | "light";

/** Static brand files served from public/brand, with their intrinsic sizes
 *  so every <img> reserves its box before the file loads (no layout shift). */
export const BRAND = {
  logoWhite: { src: "/brand/amnay-logo-white.png", width: 1574, height: 393 },
  logoDark: { src: "/brand/amnay-logo-dark.png", width: 1663, height: 418 },
  emblem: { src: "/brand/amnay-emblem.png", width: 1669, height: 1697 },
} as const;

const LOGOS = {
  dark: BRAND.logoWhite, // white wordmark — for dark backgrounds
  light: BRAND.logoDark, // navy wordmark — for light backgrounds
} as const;

type LogoProps = ImgHTMLAttributes<HTMLImageElement> & {
  theme?: Theme;
  /** Above-the-fold logo (header): load eagerly with high fetch priority. */
  priority?: boolean;
};

/**
 * Official logo files, used exactly as provided.
 * theme="dark"  → white wordmark, for dark backgrounds (default on this site)
 * theme="light" → navy wordmark, for light backgrounds
 */
export function Logo({
  theme = "dark",
  className,
  alt = "Amnay by IZEMX",
  priority = false,
  ...rest
}: LogoProps) {
  const logo = LOGOS[theme];
  return (
    <img
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt={alt}
      className={className}
      draggable={false}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      {...rest}
    />
  );
}

/** Emblem only — tight spaces, decorative use. */
export function Emblem({ className, alt = "Emblème Amnay", ...rest }: ComponentProps<"img">) {
  return (
    <img
      src={BRAND.emblem.src}
      width={BRAND.emblem.width}
      height={BRAND.emblem.height}
      alt={alt}
      className={className}
      draggable={false}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
}
